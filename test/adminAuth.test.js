const app = require("../app");
const supertest = require("supertest");

// Use agent to persist cookies
const request = supertest.agent(app);
const { faker } = require("@faker-js/faker");

describe("Admin Auth Endpoint", () => {
    it("It should return a 401 if user is not logged in", async () => {
        await request
            .post("/admin/auth/register")
            .send({
                email: faker.internet.email(),
            })
            .expect(401);
    });

    it("It should return a 403 error if the user is logged in, but its not an admin", async () => {
        // Login first
        await request
            .post("/auth/login")
            .send({
                email: "test_user@test.com",
                password: "password",
            })
            .expect(200);

        // Actual test
        await request
            .post("/admin/auth/register")
            .send({
                name: faker.name.firstName(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
                age: faker.datatype.number({ min: 18, max: 65 }),
            })
            .expect(403);
    });
});
