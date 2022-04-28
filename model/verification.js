const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Verification = {
    // Add new verification
    insertVerification: async (userid, guid) => {
        // Date which is one hour from now
        const date = new Date();
        date.setHours(date.getHours() + 1);

        const create = await prisma.verification.create({
            data: {
                userid,
                guid,
                expires_in: date,
            },
        });

        return create;
    },

    // Find verification by guid
    findUserByGuid: async (guid) => {
        const data = await prisma.verification.findFirst({
            where: {
                guid: {
                    equals: guid,
                },
            },

            select: {
                verification_id: true,
                userid: true,
                expires_in: true,
            },
        });

        return data;
    },

    // Delete verification
    deleteVerification: async (verification_id) => {
        await prisma.verification.delete({
            where: {
                verification_id,
            },
        });

        return true;
    },
};

module.exports = Verification;
