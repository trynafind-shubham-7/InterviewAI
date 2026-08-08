const resumeService = require("../services/resumeService");
const aiService = require("../services/aiService");
const prisma = require("../lib/prisma");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No PDF uploaded."
            });

        }

        const resumeText =
            await resumeService.extractResumeText(
                req.file.path
            );

        if (!resumeText || !resumeText.trim()) {

            return res.status(400).json({
                success: false,
                message:
                    "Could not extract text from this PDF."
            });

        }

        const resume = await prisma.resume.create({

            data: {

                originalName: req.file.originalname,

                fileName: req.file.filename,

                filePath: req.file.path,

                fileSize: req.file.size,

                userId: req.user.userId

            }

        });

        await prisma.user.update({

            where: {
                id: req.user.userId
            },

            data: {
                resumeText
            }

        });

        const analysis =
            await aiService.analyzeResume(
                resumeText
            );

        await prisma.resumeAnalysis.create({

            data: {

                score:
                    Number(analysis.score) || 0,

                summary:
                    analysis.summary || "",

                strengths:
                    analysis.strengths || [],

                missingSkills:
                    analysis.missingSkills || [],

                improvements:
                    analysis.improvements || [],

                resumeId:
                    resume.id

            }

        });

        return res.status(200).json({

            success: true,

            message:
                "Resume uploaded and analyzed successfully.",

            analysis

        });

    }

    catch (error) {

        console.error(
            "Resume Error:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "Resume analysis failed."

        });

    }

};

module.exports = {
    uploadResume
};