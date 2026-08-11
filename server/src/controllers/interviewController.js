const aiService = require("../services/aiService");
const prisma = require("../lib/prisma");

const generateQuestions = async (req, res) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (!user.resumeText) {
            return res.status(400).json({
                success: false,
                message:
                    "Please upload your resume first."
            });
        }

        const recentSessions =
            await prisma.interviewSession.findMany({
                where: {
                    userId: req.user.userId
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 5,
                select: {
                    questions: true
                }
            });

        const previousQuestions =
            recentSessions.flatMap((session) => {

                if (!Array.isArray(session.questions)) {
                    return [];
                }

                return session.questions;
            });

        const interviewSeed =
            `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 12)}`;

        const questions =
            await aiService.generateInterviewQuestions(
                user.resumeText,
                previousQuestions,
                interviewSeed
            );

        return res.status(200).json({
            success: true,
            questions
        });

    } catch (error) {

        console.error(
            "Interview Error:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to generate interview questions."
        });
    }
};

module.exports = {
    generateQuestions
};