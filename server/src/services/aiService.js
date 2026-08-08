const Groq = require("groq-sdk");

const {
    createEvaluationPrompt
} = require("../prompts/evaluateAnswerPrompt");

const groq = new Groq({

    apiKey:
        process.env.GROQ_API_KEY

});

const MODEL =
    process.env.GROQ_MODEL ||
    "llama-3.3-70b-versatile";


const generateJSON = async (prompt) => {

    try {

        const response =
            await groq.chat.completions.create({

                model: MODEL,

                messages: [

                    {
                        role: "system",

                        content:
                            "You are a professional AI assistant. Follow instructions carefully. Return valid JSON only."
                    },

                    {
                        role: "user",

                        content: prompt
                    }

                ],

                temperature: 0.2,

                response_format: {
                    type: "json_object"
                }

            });

        const text =
            response
                ?.choices?.[0]
                ?.message?.content;

        if (!text) {

            throw new Error(
                "Groq returned an empty response."
            );

        }

        return JSON.parse(text);

    }

    catch (error) {

        console.error(
            "Groq Error:",
            error.message
        );

        if (
            error?.status === 429 ||
            error?.statusCode === 429
        ) {

            const aiError = new Error(
                "Groq API rate limit reached. Please try again in a moment."
            );

            aiError.statusCode = 429;

            throw aiError;

        }

        if (
            error?.status === 401 ||
            error?.statusCode === 401
        ) {

            const aiError = new Error(
                "Groq API authentication failed. Please check your API key."
            );

            aiError.statusCode = 500;

            throw aiError;

        }

        if (error instanceof SyntaxError) {

            const aiError = new Error(
                "Groq returned an invalid AI response."
            );

            aiError.statusCode = 502;

            throw aiError;

        }

        if (error.statusCode) {
            throw error;
        }

        const aiError = new Error(
            "Groq AI service is temporarily unavailable."
        );

        aiError.statusCode = 503;

        throw aiError;

    }

};


/*
============================================================
RESUME ANALYSIS
============================================================
*/

const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert ATS resume reviewer.

Analyze the following resume.

Return ONLY valid JSON with exactly this structure:

{
    "score": 0,
    "strengths": [],
    "missingSkills": [],
    "improvements": [],
    "summary": ""
}

Rules:

- score must be between 0 and 100
- strengths must be an array of strings
- missingSkills must be an array of strings
- improvements must be an array of strings
- summary must be professional and concise
- Do not invent information

Resume:

${resumeText}
`;

    return generateJSON(prompt);

};


/*
============================================================
INTERVIEW QUESTIONS
============================================================
*/

const generateInterviewQuestions = async (
    resumeText
) => {

    const prompt = `
You are an expert technical interviewer.

Generate interview questions based on this candidate's resume.

Return ONLY valid JSON:

{
    "easy": [],
    "medium": [],
    "hard": []
}

Requirements:

- easy: exactly 3 questions
- medium: exactly 3 questions
- hard: exactly 3 questions
- Questions should be based on the resume
- Include technical questions
- Include project questions
- Include behavioral questions
- Avoid duplicates
- Make them realistic interview questions

Resume:

${resumeText}
`;

    return generateJSON(prompt);

};


/*
============================================================
ANSWER EVALUATION
============================================================
*/

const evaluateAnswer = async (
    question,
    answer
) => {

    const prompt =
        createEvaluationPrompt(
            question,
            answer
        );

    return generateJSON(prompt);

};


/*
============================================================
OVERALL REPORT
============================================================
*/

const generateOverallFeedback = async (
    questions,
    answers
) => {

    const prompt = `
You are an experienced HR interviewer.

Analyze the candidate's complete interview.

Questions:

${questions
    .map(
        (question, index) =>
            `${index + 1}. ${question}`
    )
    .join("\n")}

Answers:

${answers
    .map(
        (answer, index) =>
            `${index + 1}. ${
                answer || "Not Answered"
            }`
    )
    .join("\n")}

Return ONLY valid JSON:

{
    "overallScore": 0,
    "strengths": [],
    "weaknesses": [],
    "improvements": [],
    "summary": ""
}

Rules:

- overallScore must be between 0 and 10
- strengths must be an array
- weaknesses must be an array
- improvements must be an array
- summary must be concise
- Evaluate only the provided answers
`;

    return generateJSON(prompt);

};


module.exports = {

    analyzeResume,

    generateInterviewQuestions,

    evaluateAnswer,

    generateOverallFeedback

};