const aiService = require("../services/aiService");

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

        const report =
            await aiService.generateOverallFeedback(
                questions,
                answers
            );

        return res.status(200).json({

            success: true,

            report

        });

    }

    catch (error) {

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

module.exports = {
    generateReport
};