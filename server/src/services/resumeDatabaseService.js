const prisma = require("../lib/prisma");

const createResume = async (data) => {

    return await prisma.resume.create({
        data
    });

};

const saveAnalysis = async (data) => {

    return await prisma.resumeAnalysis.create({
        data
    });

};

module.exports = {
    createResume,
    saveAnalysis
};