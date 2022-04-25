const { PrismaClient } = require("@prisma/client");
const { AdminAccount, VerifiedAccount } = require("./testAccounts");
const prisma = new PrismaClient();

(async () => {
    try {
        // Delete everything
        await prisma.user.deleteMany({});
        await prisma.privilege.deleteMany({});

        // Create privileges
        await prisma.privilege.createMany({
            data: [
                {
                    privilegeid: 1,
                    description: "Unverified",
                },

                {
                    privilegeid: 2,
                    description: "Verified",
                },

                {
                    privilegeid: 3,
                    description: "Admin",
                },
            ],
        });

        // Create users
        await prisma.user.createMany({
            data: [
                {
                    username: "admin",
                    email: AdminAccount.email,
                    password: AdminAccount.password,
                    privilegeid: 3,
                },
                {
                    username: "testuser",
                    email: VerifiedAccount.email,
                    password: VerifiedAccount.password,
                    privilegeid: 2,
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }
})();
