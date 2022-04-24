const { pool } = require("../utils/db");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {})();

const TABLE_NAME = "public.user";
const ACCESS_LEVEL_TABLE_NAME = "public.access_level";

const User = {
    insertUser: async (username, email, password, privillegeid) => {
        const data = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password,
                privillegeid: privillegeid,
            },

            select: {
                userid: true,
                email: true,
            },
        });

        return data;
    },

    findUserByUserID: async (userID) => {
        const data = await prisma.user.findFirst({
            where: {
                userid: {
                    equals: userID,
                },
            },

            select: {
                userid: true,
                email: true,
                privillegeid: true,
                privillege: {
                    select: {
                        description: true,
                    },
                },
            },
        });

        return data;
    },

    findUserByEmail: async (email) => {
        const data = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                },
            },

            select: {
                userid: true,
                username: true,
                email: true,
                password: true,
                privillegeid: true,
                privillege: {
                    select: {
                        description: true,
                    },
                },
            },
        });

        return data;
    },

    // TODO: Fix update of user
    updateUserByEmail: async (inEmail, updatedFields) => {
        // Get user by email
        const getUser = await User.findUserByEmail(inEmail);

        if (!getUser) {
            return false;
        }

        const { email, password, privillegeid = 1, username } = getUser;

        // Update user
        const data = await prisma.user.update({
            where: {
                email: inEmail,
            },

            data: {
                email,
                password,
                privillegeid,
                username,
                ...updatedFields,
            },

            select: {
                userid: true,
                email: true,
                username: true,
                privillegeid: true,
            },
        });

        return data;
    },

    deleteUserByEmail: async (inEmail) => {
        const data = await prisma.user.delete({
            where: {
                email: inEmail,
            },
        });

        return data;
    },
};

module.exports = User;
