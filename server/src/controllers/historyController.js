const prisma = require("../lib/prisma");

const getHistory = async (req, res) => {

    try {

        const interviews = await prisma.interviewHistory.findMany({
            where: {
                userId: req.user.userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.json({
            success: true,
            interviews
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getHistory
};