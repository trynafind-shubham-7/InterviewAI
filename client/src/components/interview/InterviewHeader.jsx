function InterviewHeader({
    currentQuestion,
    totalQuestions
}) {

    const hasQuestions = totalQuestions > 0;

    const progress = hasQuestions
        ? ((currentQuestion + 1) / totalQuestions) * 100
        : 0;

    return (

        <div
            className="
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                text-white
                p-8
                shadow-2xl
                mb-8
            "
        >

            <h1 className="text-4xl font-extrabold">

                🎤 AI Mock Interview

            </h1>

            <p className="mt-3 opacity-90">

                Practice interviews powered by AI

            </p>

            {hasQuestions ? (

                <div className="mt-6">

                    <div className="flex justify-between mb-2">

                        <span>

                            Question {currentQuestion + 1}

                        </span>

                        <span>

                            {totalQuestions}

                        </span>

                    </div>

                    <div className="w-full h-3 bg-white/30 rounded-full">

                        <div

                            className="
                                h-3
                                rounded-full
                                bg-white
                                transition-all
                                duration-500
                            "

                            style={{
                                width: `${progress}%`
                            }}

                        />

                    </div>

                </div>

            ) : (

                <div className="mt-6">

                    <p className="text-lg opacity-90">

                        Upload your resume to begin your
                        personalized AI interview.

                    </p>

                </div>

            )}

        </div>

    );

}

export default InterviewHeader;