function EvaluationCard({ evaluation }) {

    if (!evaluation) return null;

    const score = Number(evaluation.score);

    let scoreColor = "text-red-500";

    if (score >= 8) {

        scoreColor = "text-green-600";

    } else if (score >= 5) {

        scoreColor = "text-yellow-500";

    }

    return (

        <div
            className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-xl
                p-8
                mt-8
                transition-all
                duration-300
            "
        >

            <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold">

                    ⭐ AI Evaluation

                </h2>

                <span
                    className={`
                        text-6xl
                        font-extrabold
                        ${scoreColor}
                    `}
                >

                    {score}/10

                </span>

            </div>

            <div
                className="
                    mt-8
                    bg-gray-100
                    dark:bg-gray-700
                    rounded-2xl
                    p-6
                "
            >

                <h3 className="text-xl font-bold mb-4">

                    💬 Feedback

                </h3>

                <p
                    className="
                        leading-8
                        text-gray-700
                        dark:text-gray-200
                    "
                >

                    {evaluation.feedback}

                </p>

            </div>

        </div>

    );

}

export default EvaluationCard;