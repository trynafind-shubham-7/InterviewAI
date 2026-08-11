import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiAward,
    FiCheckCircle,
    FiAlertTriangle,
    FiZap,
    FiRotateCcw,
    FiHome,
    FiDownload,
    FiFileText,
    FiCpu,
    FiMessageCircle,
    FiTarget,
    FiMic,
    FiBookOpen,
    FiXCircle,
    FiLoader
} from "react-icons/fi";
import { jsPDF } from "jspdf";

import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

function InterviewReport() {
    const location = useLocation();
    const navigate = useNavigate();

    const [report, setReport] = useState(
        location.state?.report || null
    );

    const [loading, setLoading] = useState(
        !location.state?.report
    );

    const [error, setError] = useState("");

    const userName =
        location.state?.userName ||
        localStorage.getItem("name") ||
        "Candidate";

    /*
     * =========================================================
     * LOAD REPORT FROM DATABASE
     * =========================================================
     *
     * The URL will look like:
     *
     * /report?session=12
     *
     * This allows the report to survive:
     *
     * - page refresh
     * - logout/login
     * - opening it from Session History
     */

    useEffect(() => {
        const loadSavedReport = async () => {
            const params = new URLSearchParams(
                location.search
            );

            const sessionId =
                params.get("session");

            // If report was already passed through navigation
            // and there is no session ID, keep the existing report.
            if (!sessionId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/report/${sessionId}`
                );

                if (
                    response.data?.success &&
                    response.data?.report
                ) {
                    setReport(
                        response.data.report
                    );
                } else {
                    throw new Error(
                        "Report data was not returned."
                    );
                }
            } catch (err) {
                console.error(
                    "Load Report Error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load the saved interview report."
                );
            } finally {
                setLoading(false);
            }
        };

        loadSavedReport();
    }, [location.search]);


    /*
     * =========================================================
     * LOADING STATE
     * =========================================================
     */

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex items-center justify-center p-4">

                    <div className="text-center">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">

                            <FiLoader className="w-8 h-8 animate-spin" />

                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                            Loading Interview Report
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Retrieving your saved AI evaluation...
                        </p>

                    </div>

                </div>
            </MainLayout>
        );
    }


    /*
     * =========================================================
     * ERROR / NO REPORT
     * =========================================================
     */

    if (!report) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex items-center justify-center p-4">

                    <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">

                        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">

                            <FiFileText className="w-8 h-8" />

                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            No Interview Report Found
                        </h2>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {error ||
                                "Complete an interview session first to generate your performance report."}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/interview")
                            }
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
                        >
                            <FiRotateCcw className="w-4 h-4" />
                            Start Mock Interview
                        </button>

                    </div>

                </div>
            </MainLayout>
        );
    }


    /*
     * =========================================================
     * NORMALIZE DATA
     * =========================================================
     */

    const overallScore = Number(
        report.overallScore ??
        report.score ??
        0
    );

    const questionEvaluations =
        Array.isArray(
            report.questionEvaluations
        )
            ? report.questionEvaluations
            : [];


    /*
     * =========================================================
     * PDF DOWNLOAD
     * =========================================================
     */

    const downloadPDF = () => {
        const doc = new jsPDF();

        let yPos = 20;

        const addText = (
            text,
            fontSize = 10,
            spacing = 6
        ) => {

            doc.setFontSize(
                fontSize
            );

            const lines =
                doc.splitTextToSize(
                    String(text || ""),
                    180
                );

            // Add a new page if needed
            if (
                yPos +
                    lines.length *
                        spacing >
                280
            ) {
                doc.addPage();
                yPos = 20;
            }

            doc.text(
                lines,
                14,
                yPos
            );

            yPos +=
                lines.length *
                    spacing +
                4;
        };


        doc.setFontSize(20);

        doc.text(
            "InterviewAI Performance Report",
            14,
            yPos
        );

        yPos += 10;

        addText(
            `Candidate: ${userName}`,
            12
        );

        addText(
            `Overall Score: ${overallScore}/10`,
            12
        );

        addText(
            `Date: ${new Date().toLocaleDateString()}`,
            10
        );


        addText(
            "Executive Summary",
            14
        );

        addText(
            report.summary ||
                "No summary available.",
            10
        );


        addText(
            "Strengths",
            14
        );

        (
            report.strengths ||
            []
        ).forEach(
            (item) => {
                addText(
                    `• ${item}`,
                    10
                );
            }
        );


        addText(
            "Areas for Improvement",
            14
        );

        (
            report.weaknesses ||
            []
        ).forEach(
            (item) => {
                addText(
                    `• ${item}`,
                    10
                );
            }
        );


        addText(
            "Recommendations",
            14
        );

        (
            report.improvements ||
            []
        ).forEach(
            (item) => {
                addText(
                    `• ${item}`,
                    10
                );
            }
        );


        if (
            questionEvaluations.length >
            0
        ) {

            addText(
                "Question-by-Question Evaluation",
                14
            );

            questionEvaluations.forEach(
                (
                    evaluation,
                    index
                ) => {

                    addText(
                        `Question ${index + 1}: ${
                            evaluation.question ||
                            ""
                        }`,
                        12
                    );

                    addText(
                        `Your Answer: ${
                            evaluation.answer ||
                            "Not answered"
                        }`,
                        10
                    );

                    addText(
                        `Score: ${
                            evaluation.score ??
                            0
                        }/10`,
                        10
                    );

                    addText(
                        `Technical Accuracy: ${
                            evaluation.technicalAccuracy ??
                            0
                        }/10`,
                        10
                    );

                    addText(
                        `Communication: ${
                            evaluation.communication ??
                            0
                        }/10`,
                        10
                    );

                    addText(
                        `Confidence: ${
                            evaluation.confidence ??
                            0
                        }/10`,
                        10
                    );

                    addText(
                        `Feedback: ${
                            evaluation.feedback ||
                            "No feedback available."
                        }`,
                        10
                    );

                    addText(
                        `Ideal Answer: ${
                            evaluation.idealAnswer ||
                            "No ideal answer available."
                        }`,
                        10
                    );
                }
            );
        }


        doc.save(
            `InterviewAI_Report_${userName.replace(
                /\s+/g,
                "_"
            )}.pdf`
        );
    };


    /*
     * =========================================================
     * SCORE BADGE
     * =========================================================
     */

    const getScoreBadge = () => {

        if (
            overallScore >= 8
        ) {

            return {
                label:
                    "Exceptional Candidate Performance",

                color:
                    "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
            };
        }


        if (
            overallScore >= 6
        ) {

            return {
                label:
                    "Good Performance - Minor Practice Needed",

                color:
                    "text-amber-500 bg-amber-500/10 border-amber-500/20"
            };
        }


        return {
            label:
                "Needs Practice & Preparation",

            color:
                "text-rose-500 bg-rose-500/10 border-rose-500/20"
        };
    };


    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <MainLayout>

            <div className="space-y-8">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="surface-card p-6 sm:p-8">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div>

                            <div className="pill mb-3">

                                <FiCpu className="w-3.5 h-3.5" />

                                Post-Interview Evaluation Sheet

                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">

                                Congratulations, {userName}!

                            </h1>

                            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">

                                Here is your comprehensive AI performance report and constructive feedback breakdown.

                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={
                                downloadPDF
                            }
                            className="button-primary px-6 py-3.5 shrink-0"
                        >

                            <FiDownload className="w-4 h-4" />

                            Download PDF Report

                        </button>

                    </div>

                </div>


                {/* =====================================================
                    OVERALL SCORE
                ====================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
                >

                    <div>

                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">

                            Overall Evaluation Score

                        </span>


                        <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white mt-1">

                            {overallScore}

                            <span className="text-2xl text-slate-400">
                                {" "}/ 10
                            </span>

                        </h2>


                        <div className="mt-3">

                            <span
                                className={`inline-block text-xs font-bold px-3.5 py-1.5 rounded-full border ${getScoreBadge().color}`}
                            >

                                {
                                    getScoreBadge()
                                        .label
                                }

                            </span>

                        </div>

                    </div>


                    <div className="flex items-center gap-3">

                        <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">

                            <FiAward className="w-12 h-12" />

                        </div>

                    </div>

                </motion.div>


                {/* =====================================================
                    SUMMARY
                ====================================================== */}

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">

                        <FiFileText className="text-indigo-500" />

                        Executive AI Performance Summary

                    </h2>


                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">

                        {
                            report.summary ||
                            "No overall summary available."
                        }

                    </p>

                </div>


                {/* =====================================================
                    STRENGTHS + WEAKNESSES
                ====================================================== */}

                <div className="grid md:grid-cols-2 gap-6">

                    {/* STRENGTHS */}

                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">

                            <FiCheckCircle className="text-emerald-500" />

                            Demonstrated Strengths

                        </h3>


                        <div className="space-y-3">

                            {
                                (
                                    report.strengths ||
                                    []
                                ).map(
                                    (
                                        item,
                                        idx
                                    ) => (

                                        <div
                                            key={idx}
                                            className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3"
                                        >

                                            <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />

                                            <span>
                                                {item}
                                            </span>

                                        </div>
                                    )
                                )
                            }

                        </div>

                    </div>


                    {/* WEAKNESSES */}

                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">

                            <FiAlertTriangle className="text-rose-500" />

                            Key Areas for Improvement

                        </h3>


                        <div className="space-y-3">

                            {
                                (
                                    report.weaknesses ||
                                    []
                                ).map(
                                    (
                                        item,
                                        idx
                                    ) => (

                                        <div
                                            key={idx}
                                            className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3"
                                        >

                                            <FiAlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />

                                            <span>
                                                {item}
                                            </span>

                                        </div>
                                    )
                                )
                            }

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    RECOMMENDATIONS
                ====================================================== */}

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">

                        <FiZap className="text-amber-500" />

                        AI Growth & Practice Recommendations

                    </h3>


                    <div className="space-y-3">

                        {
                            (
                                report.improvements ||
                                []
                            ).map(
                                (
                                    item,
                                    idx
                                ) => (

                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3"
                                    >

                                        <FiZap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />

                                        <span>
                                            {item}
                                        </span>

                                    </div>
                                )
                            )
                        }

                    </div>

                </div>


                {/* =====================================================
                    QUESTION BY QUESTION EVALUATION
                ====================================================== */}

                <div className="space-y-6">

                    <div>

                        <div className="pill mb-3">

                            <FiBookOpen />

                            Detailed Question Analysis

                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">

                            Your Answers vs Ideal Answers

                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">

                            Review every question, including questions you left unanswered.

                        </p>

                    </div>


                    {
                        questionEvaluations.length ===
                        0 ? (

                            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">

                                <FiBookOpen className="w-10 h-10 mx-auto text-slate-400" />

                                <p className="mt-3 text-sm text-slate-500">

                                    No question-by-question evaluations were saved for this interview.

                                </p>

                            </div>

                        ) : (

                            questionEvaluations.map(
                                (
                                    evaluation,
                                    index
                                ) => {

                                    const answered =
                                        Boolean(
                                            evaluation.answered ??
                                            (
                                                evaluation.answer &&
                                                String(
                                                    evaluation.answer
                                                ).trim()
                                            )
                                        );

                                    return (

                                        <motion.div
                                            key={
                                                evaluation.questionIndex ??
                                                index
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 12
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.04
                                            }}
                                            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                                        >

                                            {/* QUESTION HEADER */}

                                            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">

                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                                    <div className="flex items-start gap-4">

                                                        <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-extrabold shrink-0">

                                                            Q
                                                            {index + 1}

                                                        </div>


                                                        <div>

                                                            <p className="text-xs uppercase tracking-wider font-bold text-slate-400">

                                                                Interview Question

                                                            </p>

                                                            <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">

                                                                {
                                                                    evaluation.question ||
                                                                    "Question unavailable."
                                                                }

                                                            </h3>

                                                        </div>

                                                    </div>


                                                    <div className="flex items-center gap-2 shrink-0">

                                                        {
                                                            answered ? (

                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">

                                                                    <FiCheckCircle />

                                                                    Answered

                                                                </span>

                                                            ) : (

                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">

                                                                    <FiXCircle />

                                                                    Not Answered

                                                                </span>

                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            </div>


                                            {/* SCORE METRICS */}

                                            <div className="p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4">

                                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">

                                                        Score

                                                    </p>

                                                    <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">

                                                        {
                                                            evaluation.score ??
                                                            0
                                                        }

                                                        <span className="text-sm text-slate-400">
                                                            /10
                                                        </span>

                                                    </p>

                                                </div>


                                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">

                                                        Technical

                                                    </p>

                                                    <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">

                                                        {
                                                            evaluation.technicalAccuracy ??
                                                            0
                                                        }

                                                        <span className="text-sm text-slate-400">
                                                            /10
                                                        </span>

                                                    </p>

                                                </div>


                                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">

                                                        Communication

                                                    </p>

                                                    <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">

                                                        {
                                                            evaluation.communication ??
                                                            0
                                                        }

                                                        <span className="text-sm text-slate-400">
                                                            /10
                                                        </span>

                                                    </p>

                                                </div>


                                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50">

                                                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">

                                                        Confidence

                                                    </p>

                                                    <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">

                                                        {
                                                            evaluation.confidence ??
                                                            0
                                                        }

                                                        <span className="text-sm text-slate-400">
                                                            /10
                                                        </span>

                                                    </p>

                                                </div>

                                            </div>


                                            {/* ANSWER */}

                                            <div className="px-6 sm:px-8 pb-6">

                                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">

                                                    <div className="flex items-center gap-2">

                                                        <FiMessageCircle className="text-slate-500" />

                                                        <h4 className="font-bold text-slate-900 dark:text-white">

                                                            Your Answer

                                                        </h4>

                                                    </div>


                                                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap">

                                                        {
                                                            evaluation.answer &&
                                                            String(
                                                                evaluation.answer
                                                            ).trim()
                                                                ? evaluation.answer
                                                                : "You did not provide an answer to this question."
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* STRENGTHS + MISTAKES */}

                                            <div className="px-6 sm:px-8 pb-6 grid md:grid-cols-2 gap-5">

                                                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">

                                                    <h4 className="font-bold text-emerald-500 flex items-center gap-2">

                                                        <FiCheckCircle />

                                                        What You Did Well

                                                    </h4>


                                                    <div className="mt-3 space-y-2">

                                                        {
                                                            (
                                                                evaluation.strengths ||
                                                                []
                                                            ).length ===
                                                            0 ? (

                                                                <p className="text-sm text-slate-500 dark:text-slate-400">

                                                                    No specific strengths recorded.

                                                                </p>

                                                            ) : (

                                                                (
                                                                    evaluation.strengths ||
                                                                    []
                                                                ).map(
                                                                    (
                                                                        item,
                                                                        strengthIndex
                                                                    ) => (

                                                                        <div
                                                                            key={
                                                                                strengthIndex
                                                                            }
                                                                            className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                                                                        >

                                                                            <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />

                                                                            <span>
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>

                                                                        </div>
                                                                    )
                                                                )
                                                            )
                                                        }

                                                    </div>

                                                </div>


                                                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20">

                                                    <h4 className="font-bold text-rose-500 flex items-center gap-2">

                                                        <FiAlertTriangle />

                                                        Mistakes / Gaps

                                                    </h4>


                                                    <div className="mt-3 space-y-2">

                                                        {
                                                            (
                                                                evaluation.mistakes ||
                                                                []
                                                            ).length ===
                                                            0 ? (

                                                                <p className="text-sm text-slate-500 dark:text-slate-400">

                                                                    No major mistakes recorded.

                                                                </p>

                                                            ) : (

                                                                (
                                                                    evaluation.mistakes ||
                                                                    []
                                                                ).map(
                                                                    (
                                                                        item,
                                                                        mistakeIndex
                                                                    ) => (

                                                                        <div
                                                                            key={
                                                                                mistakeIndex
                                                                            }
                                                                            className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                                                                        >

                                                                            <FiAlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />

                                                                            <span>
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>

                                                                        </div>
                                                                    )
                                                                )
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            </div>


                                            {/* TECHNICAL FEEDBACK */}

                                            <div className="px-6 sm:px-8 pb-6">

                                                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">

                                                    <h4 className="font-bold text-amber-500 flex items-center gap-2">

                                                        <FiTarget />

                                                        AI Feedback

                                                    </h4>


                                                    <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">

                                                        {
                                                            evaluation.feedback ||
                                                            "No additional feedback was recorded."
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* IDEAL ANSWER */}

                                            <div className="px-6 sm:px-8 pb-8">

                                                <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center">

                                                            <FiBookOpen />

                                                        </div>


                                                        <div>

                                                            <p className="text-xs uppercase tracking-wider font-bold text-indigo-400">

                                                                Correct / Ideal Answer

                                                            </p>

                                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">

                                                                How you could answer this in an interview

                                                            </h4>

                                                        </div>

                                                    </div>


                                                    <div className="mt-5 p-5 rounded-xl bg-white/60 dark:bg-slate-950/40">

                                                        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">

                                                            {
                                                                evaluation.idealAnswer &&
                                                                String(
                                                                    evaluation.idealAnswer
                                                                ).trim()
                                                                    ? evaluation.idealAnswer
                                                                    : "An ideal answer was not saved for this question."
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </motion.div>
                                    );
                                }
                            )

                        )
                    }

                </div>


                {/* =====================================================
                    BOTTOM ACTIONS
                ====================================================== */}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/interview"
                            )
                        }
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-colors cursor-pointer"
                    >

                        <FiRotateCcw className="w-4 h-4" />

                        Practice Another Session

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/history"
                            )
                        }
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
                    >

                        <FiFileText className="w-4 h-4" />

                        Session History

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    >

                        <FiHome className="w-4 h-4" />

                        Back to Dashboard

                    </button>

                </div>

            </div>

        </MainLayout>
    );
}

export default InterviewReport;