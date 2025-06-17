import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "test user",
      email: "exemple@email.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("test user");

    user_id = response.body.id;
  });

  it("should throw an error if user same email already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "duplicate user",
      email: "exemple@email.com",
      password: "123456",
    });

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Email já cadastrado.")
  })

  it("should throw a validation error if email is invalid", async () =>{
    const response = await request(app).post("/users").send({
      name: "test user",
      email: "exemple.email.com",
      password: "123456",
    });

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("validation error")
  })
});
