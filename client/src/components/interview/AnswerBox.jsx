function AnswerBox({

    answer,

    setAnswer,

    transcript,

    listening

}) {

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

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                    Your Answer

                </h2>

                <div
                    className={`
                        px-4
                        py-2
                        rounded-full
                        text-white
                        font-semibold

                        ${listening

                            ? "bg-green-600"

                            : "bg-gray-500"

                        }
                    `}
                >

                    {

                        listening

                            ? "🎙 Listening"

                            : "🎤 Microphone Off"

                    }

                </div>

            </div>

            <textarea

                rows={8}

                value={answer || transcript}

                onChange={(e) => setAnswer(e.target.value)}

                placeholder="Type your answer here or use the microphone..."

                className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    dark:bg-gray-900
                    p-5
                    text-lg
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    resize-none
                    transition-all
                "

            />

            <p className="mt-4 text-gray-500 dark:text-gray-400">

                💡 Try answering using the STAR method (Situation, Task, Action, Result).

            </p>

        </div>

    );

}

export default AnswerBox;