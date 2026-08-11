require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function test() {

    try {

        console.log("Testing Groq API...");

        const response =
            await groq.chat.completions.create({

                model:
                    process.env.GROQ_MODEL ||
                    "llama-3.3-70b-versatile",

                messages: [

                    {
                        role: "user",

                        content: `
Return ONLY valid JSON.

{
    "message": "Groq is working",
    "status": "success"
}
`
                    }

                ],

                response_format: {
                    type: "json_object"
                },

                temperature: 0

            });

        console.log("\nGroq Response:");

        console.log(
            response.choices[0].message.content
        );

    }

    catch (error) {

        console.error("\nGroq Test Failed:");

        console.error(
            error.message
        );

    }

}

test();