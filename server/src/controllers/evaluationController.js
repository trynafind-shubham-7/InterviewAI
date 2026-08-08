const aiService = require("../services/aiService");
const prisma = require("../lib/prisma");

const evaluate = async (req, res) => {

    try {

        const {
            question,
            answer
        } = req.body;

        if (!question || !answer) {

            return res.status(400).json({

                success: false,

                message:
                    "Question and answer are required."

            });

        }

        const evaluation =
            await aiService.evaluateAnswer(
                question,
                answer
            );

        await prisma.interviewHistory.create({

            data: {

                question,

                answer,

                score:
                    Number(evaluation.score) || 0,

                feedback:
                    evaluation.feedback || "",

                userId:
                    req.user.userId

            }

        });

        return res.status(200).json({

            success: true,

            evaluation

        });

    }

    catch (error) {

        console.error(
            "Evaluation Error:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "Failed to evaluate answer."

        });

    }

};

module.exports = {
    evaluate
};