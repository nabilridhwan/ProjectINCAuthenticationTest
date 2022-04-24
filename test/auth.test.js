const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { faker } = require("@faker-js/faker");

describe("Auth Endpoint", () => {
    it("It should return a status code of 400 for missing parameters", async () => {
        const res = await request.post("/auth/login").send({
            email: faker.internet.email(),
        });

        expect(res.statusCode).toEqual(400);
    });

    it("It should return a status code of 404 for non existing user", async () => {
        const res = await request.post("/auth/login").send({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

        expect(res.statusCode).toEqual(404);
    });

    it("It should return a status code of 401 if the password is incorrect", async () => {
        const res = await request.post("/auth/login").send({
            email: "nabil@test.com",
            password: faker.internet.password(),
        });

        expect(res.statusCode).toEqual(401);
    });

    it("It should log the user in if credentials are correct", async () => {
        const res = await request.post("/auth/login").send({
            email: "nabil@test.com",
            password: "password",
        });

        expect(res.statusCode).toEqual(200);
    });
});
