const aiService = require("../services/aiService");
const prisma = require("../lib/prisma");

const generateReport = async (req, res) => {

    try {

        const {
            questions,
            answers
        } = req.body;

        if (
            !Array.isArray(questions) ||
            !Array.isArray(answers)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Questions and answers are required."
            });
        }

        if (questions.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No interview questions found."
            });
        }

        const normalizedAnswers =
            questions.map(
                (_, index) =>
                    answers[index] || ""
            );

        const report =
            await aiService.generateOverallFeedback(
                questions,
                normalizedAnswers
            );

        const user =
            await prisma.user.findUnique({
                where: {
                    id: req.user.userId
                },
                select: {
                    id: true,
                    resumes: {
                        where: {
                            isActive: true
                        },
                        orderBy: {
                            uploadedAt: "desc"
                        },
                        take: 1,
                        select: {
                            id: true
                        }
                    }
                }
            });

        const session =
            await prisma.interviewSession.create({
                data: {
                    userId: req.user.userId,

                    resumeId:
                        user?.resumes?.[0]?.id || null,

                    questions,

                    answers: normalizedAnswers,

                    evaluations:
                        report.questionEvaluations || [],

                    report,

                    overallScore:
                        Number(
                            report.overallScore
                        ) || 0
                }
            });

        return res.status(200).json({
            success: true,
            report,
            sessionId: session.id
        });

    } catch (error) {

        console.error(
            "Report Error:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to generate interview report."
        });
    }
};

const getReport = async (req, res) => {

    try {

        const sessionId =
            Number(req.params.id);

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Invalid session ID."
            });
        }

        const session =
            await prisma.interviewSession.findFirst({
                where: {
                    id: sessionId,
                    userId: req.user.userId
                }
            });

        if (!session) {
            return res.status(404).json({
                success: false,
                message:
                    "Interview session not found."
            });
        }

        return res.status(200).json({
            success: true,
            session,
            report: session.report
        });

    } catch (error) {

        console.error(
            "Get Report Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to load interview report."
        });
    }
};

module.exports = {
    generateReport,
    getReport
};