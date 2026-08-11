import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
    FiClock,
    FiSearch,
    FiCalendar,
    FiAward,
    FiFileText,
    FiAlertCircle,
    FiRotateCcw,
    FiEye
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import api from "../api/axios";

function History() {

    const [history, setHistory] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchQuery, setSearchQuery] =
        useState("");


    useEffect(() => {
        fetchHistory();
    }, []);


    const fetchHistory =
        async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get(
                    "/history"
                );

            setHistory(
                response.data.sessions ||
                []
            );

        } catch (err) {

            console.error(
                "History Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load interview history."
            );

        } finally {

            setLoading(false);
        }
    };


    const getScoreBadge =
        (score) => {

        const value =
            Number(score) || 0;

        if (value >= 8) {

            return {
                label: "Excellent",
                color:
                    "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
            };
        }

        if (value >= 6) {

            return {
                label: "Good",
                color:
                    "text-amber-500 bg-amber-500/10 border-amber-500/20"
            };
        }

        return {
            label: "Needs Practice",
            color:
                "text-rose-500 bg-rose-500/10 border-rose-500/20"
        };
    };


    const formatDate =
        (date) => {

        return new Date(
            date
        ).toLocaleString(
            "en-US",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        );
    };


    const filteredHistory =
        history.filter(
            (session) => {

            const query =
                searchQuery
                    .toLowerCase()
                    .trim();

            if (!query) {
                return true;
            }

            const questions =
                Array.isArray(
                    session.questions
                )
                    ? session.questions
                    : [];

            return questions.some(
                (question) =>
                    String(question)
                        .toLowerCase()
                        .includes(query)
            );
        });


    return (
        <MainLayout>

            <div className="space-y-8">

                <div className="surface-card p-6 sm:p-8">

                    <div className="pill mb-3">

                        <FiClock />

                        Persistent Session History

                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
                        Interview History
                    </h1>

                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                        Every completed interview is permanently associated with your account and can be reopened later.
                    </p>

                </div>


                <div className="flex flex-col sm:flex-row justify-between gap-4">

                    <div className="relative w-full sm:w-80">

                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />

                        <input
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(
                                    e.target.value
                                )
                            }
                            placeholder="Search previous questions..."
                            className="input-shell pl-10 pr-4 py-3 text-sm w-full"
                        />

                    </div>

                    <div className="text-xs font-bold text-[var(--text-muted)]">

                        Showing{" "}
                        {filteredHistory.length}
                        {" "}
                        of{" "}
                        {history.length}
                        {" "}
                        interviews

                    </div>

                </div>


                {loading && (

                    <div className="p-12 text-center">

                        <Loader
                            message="Loading your interview history..."
                            size="lg"
                        />

                    </div>

                )}


                {!loading && error && (

                    <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20">

                        <div className="flex items-center gap-3 font-bold text-rose-400">

                            <FiAlertCircle />

                            {error}

                        </div>

                        <button
                            onClick={fetchHistory}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-bold"
                        >

                            <FiRotateCcw />

                            Try Again

                        </button>

                    </div>

                )}


                {!loading &&
                    !error &&
                    filteredHistory.length === 0 && (

                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

                        <FiFileText className="w-10 h-10 mx-auto text-slate-400" />

                        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                            No Completed Interviews
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Complete an interview to create your first persistent session.
                        </p>

                    </div>
                )}


                {!loading &&
                    !error &&
                    filteredHistory.length > 0 && (

                    <div className="space-y-5">

                        {filteredHistory.map(
                            (session, index) => {

                            const questions =
                                Array.isArray(
                                    session.questions
                                )
                                    ? session.questions
                                    : [];

                            const answers =
                                Array.isArray(
                                    session.answers
                                )
                                    ? session.answers
                                    : [];

                            const evaluations =
                                Array.isArray(
                                    session.evaluations
                                )
                                    ? session.evaluations
                                    : [];

                            const badge =
                                getScoreBadge(
                                    session.overallScore
                                );

                            return (

                                <motion.div
                                    key={
                                        session.id
                                    }
                                    initial={{
                                        opacity: 0,
                                        y: 10
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                                >

                                    <div className="flex flex-col sm:flex-row justify-between gap-5">

                                        <div>

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                                                    #{index + 1}
                                                </div>

                                                <div>

                                                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                                                        Interview Session
                                                    </p>

                                                    <p className="flex items-center gap-2 text-xs text-slate-500 mt-1">

                                                        <FiCalendar />

                                                        {formatDate(
                                                            session.createdAt
                                                        )}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`px-3 py-1.5 rounded-full border text-xs font-bold ${badge.color}`}
                                            >
                                                {badge.label}
                                            </span>

                                            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">

                                                {Number(
                                                    session.overallScore
                                                ).toFixed(1)}

                                                <span className="text-sm text-slate-400">
                                                    {" "}/ 10
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="mt-6 grid sm:grid-cols-3 gap-4">

                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                            <p className="text-xs uppercase font-bold text-slate-400">
                                                Questions
                                            </p>

                                            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                                                {questions.length}
                                            </p>

                                        </div>


                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                            <p className="text-xs uppercase font-bold text-slate-400">
                                                Answered
                                            </p>

                                            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">

                                                {
                                                    answers.filter(
                                                        (answer) =>
                                                            String(
                                                                answer || ""
                                                            ).trim()
                                                    ).length
                                                }

                                            </p>

                                        </div>


                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                            <p className="text-xs uppercase font-bold text-slate-400">
                                                AI Evaluations
                                            </p>

                                            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                                                {evaluations.length}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-6">

                                        <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                                            Questions Covered
                                        </p>

                                        <div className="mt-3 space-y-2">

                                            {questions.slice(
                                                0,
                                                3
                                            ).map(
                                                (
                                                    question,
                                                    qIndex
                                                ) => (

                                                <div
                                                    key={
                                                        qIndex
                                                    }
                                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 text-sm text-slate-700 dark:text-slate-300"
                                                >

                                                    <span className="font-bold">
                                                        Q{qIndex + 1}.
                                                    </span>{" "}

                                                    {question}

                                                </div>

                                            )
                                            )}

                                            {questions.length >
                                                3 && (

                                                <p className="text-xs text-slate-400">
                                                    +{" "}
                                                    {questions.length - 3}
                                                    {" "}
                                                    more questions
                                                </p>

                                            )}

                                        </div>

                                    </div>


                                    <div className="mt-6 flex justify-end">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                window.location.href =
                                                    `/report?session=${session.id}`
                                            }
                                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm"
                                        >

                                            <FiEye />

                                            View Full Report

                                        </button>

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>
                )}

            </div>

        </MainLayout>
    );
}

export default History;