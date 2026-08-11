function QuestionCard({ question }) {

    return (

        <div
            className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-xl
                p-8
                transition-all
                duration-300
            "
        >

            <div className="flex items-center gap-3 mb-6">

                <div
                    className="
                        w-14
                        h-14
                        rounded-full
                        bg-blue-600
                        flex
                        items-center
                        justify-center
                        text-3xl
                    "
                >
                    🤖
                </div>

                <div>

                    <h2 className="text-2xl font-bold">

                        AI Interviewer

                    </h2>

                    <p className="text-gray-500 dark:text-gray-300">

                        Please answer the following question.

                    </p>

                </div>

            </div>

            <div
                className="
                    bg-blue-50
                    dark:bg-gray-700
                    rounded-2xl
                    p-6
                "
            >

                <p
                    className="
                        text-xl
                        leading-9
                        font-medium
                    "
                >
                    {question}
                </p>

            </div>

        </div>

    );

}

export default QuestionCard;