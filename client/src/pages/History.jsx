import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

function History() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetchHistory();

    }, []);


    const fetchHistory = async () => {

        try {

            setLoading(true);

            setError("");

            const token =
                localStorage.getItem("token");

            const res = await api.get(

                "/history",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setHistory(
                res.data.history || []
            );

        }

        catch (err) {

            console.error(
                "History Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load interview history."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const getScoreColor = (score) => {

        if (score >= 8) {

            return "text-green-600 dark:text-green-400";

        }

        if (score >= 6) {

            return "text-yellow-600 dark:text-yellow-400";

        }

        return "text-red-600 dark:text-red-400";

    };


    const formatDate = (date) => {

        if (!date) {
            return "Unknown date";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    return (

        <MainLayout>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600
                    text-white
                    rounded-3xl
                    p-6
                    sm:p-8
                    lg:p-10
                    shadow-2xl
                    mb-8
                "
            >

                <h1
                    className="
                        text-3xl
                        sm:text-4xl
                        font-extrabold
                    "
                >
                    📜 Interview History
                </h1>

                <p
                    className="
                        mt-3
                        text-blue-100
                        text-sm
                        sm:text-base
                    "
                >
                    Review your previous interview
                    answers, scores and feedback.
                </p>

            </div>


            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (

                <div
                    className="
                        bg-white
                        dark:bg-gray-800
                        border
                        border-gray-200
                        dark:border-gray-700
                        rounded-3xl
                        shadow-sm
                        p-10
                        text-center
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            border-4
                            border-blue-200
                            border-t-blue-600
                            rounded-full
                            animate-spin
                            mx-auto
                        "
                    />

                    <p
                        className="
                            mt-5
                            font-semibold
                            text-gray-700
                            dark:text-gray-200
                        "
                    >
                        Loading interview history...
                    </p>

                </div>

            )}


            {/* ==================================================
                ERROR
            ================================================== */}

            {!loading && error && (

                <div
                    className="
                        bg-red-50
                        dark:bg-red-900/20
                        border
                        border-red-200
                        dark:border-red-800
                        text-red-700
                        dark:text-red-300
                        rounded-2xl
                        p-6
                    "
                >

                    <h2 className="font-bold text-lg">
                        Unable to load history
                    </h2>

                    <p className="mt-2">
                        {error}
                    </p>

                    <button
                        onClick={fetchHistory}
                        className="
                            mt-4
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-5
                            py-2
                            rounded-xl
                            font-semibold
                            transition
                        "
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* ==================================================
                EMPTY STATE
            ================================================== */}

            {!loading &&
                !error &&
                history.length === 0 && (

                    <div
                        className="
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-sm
                            p-10
                            text-center
                        "
                    >

                        <div className="text-6xl">
                            📊
                        </div>

                        <h2
                            className="
                                mt-5
                                text-2xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            No Interviews Yet
                        </h2>

                        <p
                            className="
                                mt-3
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Complete your first AI
                            interview and your results
                            will appear here.
                        </p>

                    </div>

                )}


            {/* ==================================================
                HISTORY LIST
            ================================================== */}

            {!loading &&
                !error &&
                history.length > 0 && (

                    <div className="space-y-5">

                        {history.map(
                            (item, index) => (

                                <div
                                    key={
                                        item.id ||
                                        index
                                    }
                                    className="
                                        bg-white
                                        dark:bg-gray-800
                                        border
                                        border-gray-200
                                        dark:border-gray-700
                                        rounded-3xl
                                        shadow-sm
                                        hover:shadow-lg
                                        transition-all
                                        duration-300
                                        p-5
                                        sm:p-7
                                    "
                                >

                                    {/* TOP */}

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-4
                                        "
                                    >

                                        <div>

                                            <p
                                                className="
                                                    text-sm
                                                    text-gray-500
                                                    dark:text-gray-400
                                                "
                                            >
                                                Interview #{index + 1}
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    text-gray-400
                                                    dark:text-gray-500
                                                "
                                            >
                                                {formatDate(
                                                    item.createdAt
                                                )}
                                            </p>

                                        </div>


                                        <div className="flex items-center gap-3">

                                            <span
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-gray-500
                                                    dark:text-gray-400
                                                "
                                            >
                                                Score
                                            </span>

                                            <span
                                                className={`
                                                    text-3xl
                                                    font-extrabold
                                                    ${getScoreColor(
                                                        Number(
                                                            item.score
                                                        )
                                                    )}
                                                `}
                                            >
                                                {item.score}/10
                                            </span>

                                        </div>

                                    </div>


                                    {/* QUESTION */}

                                    <div className="mt-6">

                                        <p
                                            className="
                                                text-sm
                                                font-semibold
                                                text-gray-500
                                                dark:text-gray-400
                                            "
                                        >
                                            Question
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                text-gray-900
                                                dark:text-white
                                                font-medium
                                                leading-7
                                            "
                                        >
                                            {item.question}
                                        </p>

                                    </div>


                                    {/* ANSWER */}

                                    <div className="mt-5">

                                        <p
                                            className="
                                                text-sm
                                                font-semibold
                                                text-gray-500
                                                dark:text-gray-400
                                            "
                                        >
                                            Your Answer
                                        </p>

                                        <div
                                            className="
                                                mt-2
                                                bg-gray-50
                                                dark:bg-gray-900
                                                border
                                                border-gray-200
                                                dark:border-gray-700
                                                rounded-2xl
                                                p-4
                                            "
                                        >

                                            <p
                                                className="
                                                    text-gray-700
                                                    dark:text-gray-300
                                                    leading-7
                                                    whitespace-pre-wrap
                                                "
                                            >
                                                {item.answer ||
                                                    "No answer provided."}
                                            </p>

                                        </div>

                                    </div>


                                    {/* FEEDBACK */}

                                    <div className="mt-5">

                                        <p
                                            className="
                                                text-sm
                                                font-semibold
                                                text-gray-500
                                                dark:text-gray-400
                                            "
                                        >
                                            AI Feedback
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                text-gray-700
                                                dark:text-gray-300
                                                leading-7
                                            "
                                        >
                                            {item.feedback ||
                                                "No feedback available."}
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

        </MainLayout>

    );

}

export default History;