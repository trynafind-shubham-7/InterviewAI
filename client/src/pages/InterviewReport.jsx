import { useLocation, useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function InterviewReport() {

    const location = useLocation();

    const navigate = useNavigate();

    const report =
        location.state?.report;

    const userName =
        location.state?.userName ||
        localStorage.getItem("name") ||
        "Candidate";


    if (!report) {

        return (

            <MainLayout>

                <div
                    className="
                        min-h-[70vh]
                        flex
                        items-center
                        justify-center
                    "
                >

                    <div
                        className="
                            max-w-lg
                            w-full
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-xl
                            p-8
                            text-center
                        "
                    >

                        <div className="text-6xl">
                            📊
                        </div>

                        <h1
                            className="
                                mt-5
                                text-2xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            No Interview Report Found
                        </h1>

                        <p
                            className="
                                mt-3
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Complete an interview first
                            to generate your report.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/interview")
                            }
                            className="
                                mt-6
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
                            🎤 Start Interview
                        </button>

                    </div>

                </div>

            </MainLayout>

        );

    }


    const overallScore =
        Number(
            report.overallScore ??
            report.score ??
            0
        );


    const getScoreColor = () => {

        if (overallScore >= 8) {

            return "text-green-600 dark:text-green-400";

        }

        if (overallScore >= 6) {

            return "text-yellow-600 dark:text-yellow-400";

        }

        return "text-red-600 dark:text-red-400";

    };


    return (

        <MainLayout>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    bg-gradient-to-r
                    from-purple-600
                    via-indigo-600
                    to-blue-600
                    text-white
                    rounded-3xl
                    p-6
                    sm:p-8
                    lg:p-10
                    shadow-2xl
                    mb-8
                "
            >

                <p
                    className="
                        text-purple-100
                        text-sm
                        font-medium
                    "
                >
                    InterviewAI
                </p>

                <h1
                    className="
                        mt-1
                        text-3xl
                        sm:text-4xl
                        font-extrabold
                    "
                >
                    🎉 Interview Complete!
                </h1>

                <p
                    className="
                        mt-3
                        text-purple-100
                        text-sm
                        sm:text-base
                    "
                >
                    Great work, {userName}. Here's your
                    personalized AI interview report.
                </p>

            </div>


            {/* ==================================================
                OVERALL SCORE
            ================================================== */}

            <div
                className="
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-3xl
                    shadow-sm
                    p-6
                    sm:p-8
                    text-center
                "
            >

                <p
                    className="
                        text-sm
                        font-semibold
                        text-gray-500
                        dark:text-gray-400
                    "
                >
                    Overall Interview Score
                </p>

                <div
                    className={`
                        mt-3
                        text-6xl
                        sm:text-7xl
                        font-extrabold
                        ${getScoreColor()}
                    `}
                >
                    {overallScore}/10
                </div>

                <p
                    className="
                        mt-3
                        text-gray-500
                        dark:text-gray-400
                    "
                >
                    Based on your interview performance
                </p>

            </div>


            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div
                className="
                    mt-6
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-3xl
                    shadow-sm
                    p-6
                    sm:p-8
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                        dark:text-white
                    "
                >
                    📝 Overall Summary
                </h2>

                <p
                    className="
                        mt-4
                        text-gray-700
                        dark:text-gray-300
                        leading-8
                    "
                >
                    {report.summary ||
                        "No overall summary available."}
                </p>

            </div>


            {/* ==================================================
                STRENGTHS & WEAKNESSES
            ================================================== */}

            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-6
                    mt-6
                "
            >

                {/* STRENGTHS */}

                <div
                    className="
                        bg-white
                        dark:bg-gray-800
                        border
                        border-gray-200
                        dark:border-gray-700
                        rounded-3xl
                        shadow-sm
                        p-6
                        sm:p-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        💪 Strengths
                    </h2>

                    <div
                        className="
                            mt-5
                            space-y-3
                        "
                    >

                        {(
                            report.strengths ||
                            []
                        ).length > 0 ? (

                            report.strengths.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                            bg-green-50
                                            dark:bg-green-900/20
                                            border
                                            border-green-100
                                            dark:border-green-900
                                            rounded-xl
                                            p-4
                                        "
                                    >

                                        <span>
                                            ✅
                                        </span>

                                        <p
                                            className="
                                                text-gray-700
                                                dark:text-gray-300
                                                leading-6
                                            "
                                        >
                                            {item}
                                        </p>

                                    </div>

                                )
                            )

                        ) : (

                            <p
                                className="
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                No strengths provided.
                            </p>

                        )}

                    </div>

                </div>


                {/* WEAKNESSES */}

                <div
                    className="
                        bg-white
                        dark:bg-gray-800
                        border
                        border-gray-200
                        dark:border-gray-700
                        rounded-3xl
                        shadow-sm
                        p-6
                        sm:p-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        ⚠️ Areas to Improve
                    </h2>

                    <div
                        className="
                            mt-5
                            space-y-3
                        "
                    >

                        {(
                            report.weaknesses ||
                            []
                        ).length > 0 ? (

                            report.weaknesses.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                            bg-red-50
                                            dark:bg-red-900/20
                                            border
                                            border-red-100
                                            dark:border-red-900
                                            rounded-xl
                                            p-4
                                        "
                                    >

                                        <span>
                                            ⚠️
                                        </span>

                                        <p
                                            className="
                                                text-gray-700
                                                dark:text-gray-300
                                                leading-6
                                            "
                                        >
                                            {item}
                                        </p>

                                    </div>

                                )
                            )

                        ) : (

                            <p
                                className="
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                No weaknesses provided.
                            </p>

                        )}

                    </div>

                </div>

            </div>


            {/* ==================================================
                IMPROVEMENTS
            ================================================== */}

            <div
                className="
                    mt-6
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-3xl
                    shadow-sm
                    p-6
                    sm:p-8
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                        dark:text-white
                    "
                >
                    💡 Recommended Improvements
                </h2>

                <div
                    className="
                        mt-5
                        space-y-3
                    "
                >

                    {(
                        report.improvements ||
                        []
                    ).length > 0 ? (

                        report.improvements.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        bg-blue-50
                                        dark:bg-blue-900/20
                                        border
                                        border-blue-100
                                        dark:border-blue-900
                                        rounded-xl
                                        p-4
                                    "
                                >

                                    <span>
                                        💡
                                    </span>

                                    <p
                                        className="
                                            text-gray-700
                                            dark:text-gray-300
                                            leading-6
                                        "
                                    >
                                        {item}
                                    </p>

                                </div>

                            )
                        )

                    ) : (

                        <p
                            className="
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            No additional recommendations.
                        </p>

                    )}

                </div>

            </div>


            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div
                className="
                    mt-8
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    gap-3
                "
            >

                <button
                    onClick={() =>
                        navigate("/interview")
                    }
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-7
                        py-3
                        rounded-xl
                        font-bold
                        transition
                    "
                >
                    🎤 Take Another Interview
                </button>

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    className="
                        bg-gray-600
                        hover:bg-gray-700
                        text-white
                        px-7
                        py-3
                        rounded-xl
                        font-bold
                        transition
                    "
                >
                    🏠 Dashboard
                </button>

            </div>

        </MainLayout>

    );

}

export default InterviewReport;