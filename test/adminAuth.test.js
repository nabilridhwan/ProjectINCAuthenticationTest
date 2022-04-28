const supertest = require("supertest");

// Use agent to persist cookies
const { faker } = require("@faker-js/faker");
const app = require("../app");
const User = require("../model/user");

const request = supertest.agent(app);
const { VerifiedAccount, AdminAccount } = require("../utils/testAccounts");

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
                email: VerifiedAccount.email,
                password: VerifiedAccount.password,
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

    it("It should return a 200 if the user is successfully registered", async () => {
        // Login as admin
        let loginReq = await request
            .post("/auth/login")
            .send({
                email: AdminAccount.email,
                password: AdminAccount.password,
            })
            .expect(200);

        let email = faker.internet.email();

        // Create a user
        await request
            .post("/admin/auth/register")
            .send({
                name: faker.name.firstName(),
                email: email,
                username: faker.internet.userName(),
                password: faker.internet.password(),
                age: faker.datatype.number({ min: 18, max: 65 }),
            })
            .expect(200);

        // Delete the user
        await User.deleteUserByEmail(email);
    });
});
