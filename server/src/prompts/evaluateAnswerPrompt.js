const createEvaluationPrompt = (
    question,
    answer
) => {

    const hasAnswer =
        Boolean(
            answer &&
            String(answer).trim()
        );

    return `
You are a senior technical interviewer.

Evaluate this interview question.

Question:
${question}

Candidate Answer:
${hasAnswer ? answer : "NOT ANSWERED"}

Return ONLY valid JSON:

{
    "score": 0,
    "technicalAccuracy": 0,
    "communication": 0,
    "confidence": 0,
    "strengths": [],
    "mistakes": [],
    "feedback": "",
    "idealAnswer": ""
}

Rules:

- score is between 0 and 10
- technicalAccuracy is between 0 and 10
- communication is between 0 and 10
- confidence is between 0 and 10
- strengths must be an array
- mistakes must be an array
- feedback must be useful and specific
- idealAnswer MUST always be provided

${
    hasAnswer
        ? `
Evaluate the candidate's actual answer honestly.

Do not give credit for information that was not stated.
`
        : `
The candidate did not answer.

Therefore:
- score = 0
- technicalAccuracy = 0
- communication = 0
- confidence = 0
- explain that the candidate did not answer
- still provide a complete correct/ideal answer
`
}
`;

};

module.exports = {
    createEvaluationPrompt
};