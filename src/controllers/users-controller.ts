import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const userWithEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithEmail) {
      throw new AppError("Email já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    //removendo a senha de dentro do Usuario para retorno no insomnia
    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}

export { UsersController };
