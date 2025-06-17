import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesController {
  async index(request: Request, response: Response, next: NextFunction) {
    const delivery = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return response.json(delivery);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    const { user_id, description } = bodySchema.parse(request.body);
    const delivered = await prisma.delivery.create({
      data: { userId: user_id, description },
    });
    return response.status(201).json(delivered);
  }
}

export { DeliveriesController };
