const createInterviewPrompt = (resumeText) => {

return `
You are a Senior Software Engineer at Google.

You are interviewing a candidate.

Read the resume carefully.

Generate interview questions ONLY from the resume.

Rules:

1. Ask about projects mentioned.
2. Ask about technologies mentioned.
3. Ask about implementation details.
4. Ask follow-up questions.
5. Do NOT ask unrelated questions.

Return ONLY JSON.

{
  "easy":[],
  "medium":[],
  "hard":[]
}

Resume:

${resumeText}
`;

};

module.exports = {
    createInterviewPrompt
};