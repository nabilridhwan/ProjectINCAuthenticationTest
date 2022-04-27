const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Verification = {
    insertVerification: async (userid, guid) => {
        // Date which is one hour from now
        const date = new Date();
        date.setHours(date.getHours() + 1);

        return await prisma.verification.create({
            data: {
                userid: userid,
                guid: guid,
                expires_in: date,
            },
        });
    },

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

    deleteVerification: async (verification_id) => {
        return await prisma.verification.delete({
            where: {
                verification_id: verification_id,
            },
        });
    },
};

module.exports = Verification;
