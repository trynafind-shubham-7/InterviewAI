const resumeService =
    require("../services/resumeService");

const aiService =
    require("../services/aiService");

const prisma =
    require("../lib/prisma");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message:
                    "No PDF uploaded."
            });
        }

        const resumeText =
            await resumeService.extractResumeText(
                req.file.path
            );

        if (
            !resumeText ||
            !resumeText.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Could not extract text from this PDF."
            });
        }

        const analysis =
            await aiService.analyzeResume(
                resumeText
            );

        await prisma.resume.updateMany({
            where: {
                userId: req.user.userId
            },
            data: {
                isActive: false
            }
        });

        const resume =
            await prisma.resume.create({
                data: {
                    originalName:
                        req.file.originalname,

                    fileName:
                        req.file.filename,

                    filePath:
                        req.file.path,

                    fileSize:
                        req.file.size,

                    isActive: true,

                    userId:
                        req.user.userId
                }
            });

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

        await prisma.user.update({
            where: {
                id: req.user.userId
            },
            data: {
                resumeText
            }
        });

        return res.status(200).json({
            success: true,
            message:
                "Resume uploaded and saved successfully.",

            resume: {
                id: resume.id,
                originalName:
                    resume.originalName,
                fileSize:
                    resume.fileSize,
                uploadedAt:
                    resume.uploadedAt,
                isActive:
                    resume.isActive
            },

            analysis
        });

    } catch (error) {

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


const getCurrentResume = async (
    req,
    res
) => {

    try {

        const resume =
            await prisma.resume.findFirst({
                where: {
                    userId:
                        req.user.userId,

                    isActive: true
                },

                include: {
                    analysis: true
                },

                orderBy: {
                    uploadedAt: "desc"
                }
            });

        return res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {

        console.error(
            "Current Resume Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to load saved resume."
        });
    }
};

module.exports = {
    uploadResume,
    getCurrentResume
};