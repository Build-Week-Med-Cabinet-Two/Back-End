const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");
const user = {
    "username": "user",
    "password": "password",
    "email": "user@email.com"
  }
describe("server.js is working", () => {
    test("should be the testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
    test("Environment setup, checking root", async () => {
      const response = await request(server).get("/");
      expect(process.env.DB_ENV).toBe("testing");
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual({ api: "up and ATOM" });
    });
  });

  describe("Checking Auth API Endpoints", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("POST /register adds user", async () => {
      const response = await request(server)
        .post("/auth/register")
        .send(user);
      expect(response.statusCode).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body.data.username).toBe("user");
    });
  });

  describe("Testing Login", () => {
    it("POST /login logs user in", async () => {
      const response = await request(server).post("/auth/login").send(user);
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body.message).toBe("Welcome to med-cabinet user");
    });
  });