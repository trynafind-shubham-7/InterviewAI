const prisma =
    require("../lib/prisma");

const getHistory = async (req, res) => {

    try {

        const sessions =
            await prisma.interviewSession.findMany({
                where: {
                    userId: req.user.userId
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

        return res.status(200).json({
            success: true,
            sessions
        });

    } catch (error) {

        console.error(
            "History Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to load interview history."
        });
    }
};

module.exports = {
    getHistory
};