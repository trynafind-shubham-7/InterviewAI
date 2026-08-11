const Groq = require("groq-sdk");

const {
    createEvaluationPrompt
} = require("../prompts/evaluateAnswerPrompt");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const MODEL =
    process.env.GROQ_MODEL ||
    "llama-3.3-70b-versatile";

const generateJSON = async (prompt, options = {}) => {
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

                temperature:
                    options.temperature ?? 0.7,

                response_format: {
                    type: "json_object"
                }
            });

        const text =
            response?.choices?.[0]?.message?.content;

        if (!text) {
            throw new Error(
                "Groq returned an empty response."
            );
        }

        return JSON.parse(text);

    } catch (error) {

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

        const aiError = new Error(
            "Groq AI service is temporarily unavailable."
        );

        aiError.statusCode = 503;

        throw aiError;
    }
};


/* =========================================================
   RESUME ANALYSIS
========================================================= */

const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert ATS resume reviewer.

Analyze the following resume.

Return ONLY valid JSON:

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

    return generateJSON(prompt, {
        temperature: 0.3
    });
};


/* =========================================================
   INTERVIEW QUESTIONS
========================================================= */

const generateInterviewQuestions = async (
    resumeText,
    previousQuestions = [],
    interviewSeed = ""
) => {

    const previous =
        previousQuestions.length > 0
            ? previousQuestions
                .map(
                    (question, index) =>
                        `${index + 1}. ${question}`
                )
                .join("\n")
            : "No previous interview questions.";

    const prompt = `
You are an expert senior technical interviewer.

You are conducting a NEW interview for a candidate.

The candidate's resume is below.

Every interview must feel fresh.

Generate a NEW set of questions specifically based on this candidate's resume.

IMPORTANT:

- Do NOT repeat any question from previous interviews.
- Do NOT merely reword previous questions.
- Ask about different projects, technologies, implementation decisions,
  architecture, debugging, trade-offs and real-world scenarios.
- Questions must be appropriate for the technologies actually present
  in the resume.
- Questions must not be generic when the resume gives you something
  specific to ask about.
- Include project-specific questions.
- Include technical questions.
- Include practical implementation questions.
- Include at least one behavioral or communication question.
- Vary the wording and difficulty between interviews.
- If the candidate has multiple projects, rotate which projects are explored.
- If the candidate has multiple technologies, rotate the technologies.
- Never invent a technology that does not appear in the resume.
- The interview seed below is only used to create additional variation.

Interview Seed:
${interviewSeed}

Previous Interview Questions:
${previous}

Return ONLY valid JSON:

{
    "easy": [
        "question 1",
        "question 2",
        "question 3"
    ],
    "medium": [
        "question 1",
        "question 2",
        "question 3"
    ],
    "hard": [
        "question 1",
        "question 2",
        "question 3"
    ]
}

Resume:

${resumeText}
`;

    return generateJSON(prompt, {
        temperature: 0.85
    });
};


/* =========================================================
   ANSWER EVALUATION
========================================================= */

const evaluateAnswer = async (
    question,
    answer
) => {

    const prompt =
        createEvaluationPrompt(
            question,
            answer
        );

    return generateJSON(prompt, {
        temperature: 0.45
    });
};


/* =========================================================
   COMPLETE INTERVIEW REPORT
========================================================= */

const generateOverallFeedback = async (
    questions,
    answers
) => {

    const questionAnswerBlock =
        questions
            .map((question, index) => {

                const candidateAnswer =
                    answers[index] &&
                    String(answers[index]).trim()
                        ? answers[index]
                        : "NOT ANSWERED";

                return `
QUESTION ${index + 1}:
${question}

CANDIDATE ANSWER:
${candidateAnswer}
`;
            })
            .join("\n-------------------------\n");

    const prompt = `
You are a senior technical interviewer and interview coach.

Analyze the candidate's COMPLETE mock interview.

You MUST evaluate EVERY question.

IMPORTANT:

- If the candidate answered a question, evaluate their answer.
- If the candidate did NOT answer a question, still evaluate the question.
- For an unanswered question:
  - score must be 0
  - technicalAccuracy should be 0
  - communication should be 0
  - confidence should be 0
  - clearly state that the question was not answered
  - provide mistakes as appropriate
  - ALWAYS provide a detailed correct/ideal answer
  - provide advice on how the candidate should approach it
- Every question MUST have an idealAnswer.
- Never leave idealAnswer empty.
- Do not invent candidate experience.
- Evaluate technical correctness based on the question.
- The ideal answer should be technically accurate and interview-ready.
- Keep ideal answers concise enough to be useful in an interview.

Interview:

${questionAnswerBlock}

Return ONLY valid JSON with EXACTLY this structure:

{
    "overallScore": 0,
    "strengths": [],
    "weaknesses": [],
    "improvements": [],
    "summary": "",
    "questionEvaluations": [
        {
            "questionIndex": 0,
            "question": "",
            "answer": "",
            "answered": false,
            "score": 0,
            "technicalAccuracy": 0,
            "communication": 0,
            "confidence": 0,
            "strengths": [],
            "mistakes": [],
            "feedback": "",
            "idealAnswer": ""
        }
    ]
}

Rules:

- overallScore must be between 0 and 10
- score must be between 0 and 10
- technicalAccuracy must be between 0 and 10
- communication must be between 0 and 10
- confidence must be between 0 and 10
- questionEvaluations MUST contain exactly ${questions.length} objects
- questionIndex starts at 0
- answered is true only when a real candidate answer exists
- Every idealAnswer must contain useful content
`;

    return generateJSON(prompt, {
        temperature: 0.55
    });
};


module.exports = {
    analyzeResume,
    generateInterviewQuestions,
    evaluateAnswer,
    generateOverallFeedback
};