const prisma = require("../lib/prisma");

const getProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await prisma.user.findUnique({

            where: {
                id: userId
            },

            select: {

                id: true,
                name: true,
                email: true,
                createdAt: true,
                resumeText: true

            }

        });

        return res.json({

            success: true,

            user

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getProfile

};