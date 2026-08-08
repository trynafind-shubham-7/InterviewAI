const createEvaluationPrompt = (question, answer) => {

return `
You are a Senior Software Engineer interviewing a candidate.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON.

{
  "score":0,
  "technicalAccuracy":0,
  "communication":0,
  "confidence":0,
  "strengths":[],
  "mistakes":[],
  "idealAnswer":""
}
`;

};

module.exports = {
    createEvaluationPrompt
};