const aiService =
    require("../services/aiService");

const evaluate = async (req, res) => {

    try {

        const {
            question,
            answer
        } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message:
                    "Question is required."
            });
        }

        const evaluation =
            await aiService.evaluateAnswer(
                question,
                answer || ""
            );

        return res.status(200).json({
            success: true,
            evaluation
        });

    } catch (error) {

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