import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("sessionsController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should authenticate a and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "auth test user",
      email: "authexemple@email.com",
      password: "123456",
    });

    user_id = userResponse.body.id;

    const sessionsResponse = await request(app).post("/sessions").send({
      email: "authexemple@email.com",
      password: "123456",
    });

    expect(sessionsResponse.status).toBe(200);
    expect(sessionsResponse.body.token).toEqual(expect.any(String));
  });
});
