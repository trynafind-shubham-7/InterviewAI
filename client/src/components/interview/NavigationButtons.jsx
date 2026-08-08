function NavigationButtons({

    currentQuestion,

    totalQuestions,

    onPrevious,

    onNext,

    onEvaluate,

    onFinish

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
            "
        >

            <div className="flex flex-wrap gap-4 justify-between">

                <button

                    disabled={currentQuestion === 0}

                    onClick={onPrevious}

                    className="
                        bg-gray-500
                        hover:bg-gray-600
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                    "

                >

                    ⬅ Previous

                </button>

                <button

                    onClick={onEvaluate}

                    className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                    "

                >

                    ⭐ Evaluate

                </button>

                {

                    currentQuestion !== totalQuestions - 1 ? (

                        <button

                            onClick={onNext}

                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                            "

                        >

                            Next ➡

                        </button>

                    ) : (

                        <button

                            onClick={onFinish}

                            className="
                                bg-purple-600
                                hover:bg-purple-700
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                font-bold
                                transition
                            "

                        >

                            🎉 Finish Interview

                        </button>

                    )

                }

            </div>

        </div>

    );

}

export default NavigationButtons;