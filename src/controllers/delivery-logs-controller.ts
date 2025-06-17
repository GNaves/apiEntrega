import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class DeliveryLogsController {
  async show(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        logs: true,
        user: { select: { name: true, id: true, email: true } },
      },
    });

    if (
      request.user?.role === "customer" &&
      request.user.id !== delivery?.userId
    ) {
      throw new AppError("the user can only view their deliveries", 401);
    }

    return response.json(delivery);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    if (!delivery) {
      throw new AppError("Delivery not found!", 404);
    }

    if (delivery.status === "processing") {
      throw new AppError("change status to shipped!");
    }

    if (delivery.status === "delivered") {
      throw new AppError("this order has already been delivered");
    }

    const deliveryLog = await prisma.deliveryLog.create({
      data: { deliveryId: delivery_id, description },
    });

    return response.status(201).json(deliveryLog);
  }
}

export { DeliveryLogsController };
