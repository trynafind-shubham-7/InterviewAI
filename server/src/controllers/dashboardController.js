const prisma = require("../lib/prisma");

const getDashboard = async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const interviews = await prisma.interviewHistory.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        const latestResume = await prisma.resume.findFirst({
            where: {
                userId
            },
            include: {
                analysis: true
            },
            orderBy: {
                uploadedAt: "desc"
            }
        });

        const totalInterviews = interviews.length;

        const bestScore =
            totalInterviews > 0
                ? Math.max(...interviews.map(i => i.score))
                : 0;

        const averageScore =
            totalInterviews > 0
                ? (
                    interviews.reduce(
                        (sum, i) => sum + i.score,
                        0
                    ) / totalInterviews
                ).toFixed(1)
                : 0;

        const resumeScore =
            latestResume?.analysis?.score || 0;

        const history = interviews.map((item, index) => ({
            name: `${index + 1}`,
            score: item.score
        }));

        return res.json({

            success: true,

            dashboard: {

                name: user.name,

                resumeUploaded: !!user.resumeText,

                resumeScore,

                interviews: totalInterviews,

                averageScore,

                bestScore,

                history

            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};