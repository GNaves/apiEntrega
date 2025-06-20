import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesStatusController {
  async update(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    const deliveredUpdate = await prisma.delivery.update({
      data: { status: status },
      where: { id },
    });

    await prisma.deliveryLog.create({
      data: { deliveryId: id, description: status },
    });

    return response.json(deliveredUpdate);
  }
}

export { DeliveriesStatusController };
