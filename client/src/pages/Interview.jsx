import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";

import {
    FiMic,
    FiSquare,
    FiTrash2,
    FiArrowLeft,
    FiArrowRight,
    FiCheckCircle,
    FiAlertCircle,
    FiCpu,
    FiAward,
    FiHelpCircle
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

function Interview() {

    const navigate = useNavigate();

    const [questions, setQuestions] =
        useState(null);

    const [allQuestions, setAllQuestions] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState([]);

    const [answer, setAnswer] =
        useState("");

    const [evaluation, setEvaluation] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [evaluating, setEvaluating] =
        useState(false);

    const [finishing, setFinishing] =
        useState(false);

    const [error, setError] =
        useState("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    /*
     * =========================================================
     * SPEECH TRANSCRIPT -> ANSWER
     * =========================================================
     *
     * Whenever speech recognition produces a transcript,
     * automatically put it inside the answer textarea.
     *
     * This fixes the problem where:
     *
     * Live Transcript:
     * "I don't know the answer"
     *
     * but:
     *
     * Your Answer:
     * ""
     *
     * Now both will contain the spoken answer.
     */

    useEffect(() => {

        if (!transcript) {
            return;
        }

        setAnswer(transcript);

    }, [transcript]);


    /*
     * =========================================================
     * SPEECH SUPPORT CHECK
     * =========================================================
     */

    if (!browserSupportsSpeechRecognition) {

        return (
            <MainLayout>

                <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-center">

                    <FiAlertCircle className="w-12 h-12 mx-auto mb-4" />

                    <h2 className="text-2xl font-bold">
                        Speech Recognition Unavailable
                    </h2>

                    <p className="mt-2 text-sm">
                        You can still type your answers.
                    </p>

                </div>

            </MainLayout>
        );
    }


    /*
     * =========================================================
     * GENERATE QUESTIONS
     * =========================================================
     */

    const generateQuestions =
        async () => {

        try {

            setLoading(true);
            setError("");
            setEvaluation(null);

            const res =
                await api.post(
                    "/interview/generate",
                    {}
                );

            const generated =
                res.data.questions;

            const all = [
                ...(generated.easy || []),
                ...(generated.medium || []),
                ...(generated.hard || [])
            ];

            if (all.length === 0) {

                throw new Error(
                    "No interview questions were generated."
                );
            }

            setQuestions(generated);

            setAllQuestions(all);

            setCurrentQuestion(0);

            setAnswers(
                new Array(all.length).fill("")
            );

            setAnswer("");

            resetTranscript();

        } catch (err) {

            console.error(
                "Interview Generation Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to generate interview questions."
            );

        } finally {

            setLoading(false);
        }
    };


    /*
     * =========================================================
     * EVALUATE ANSWER
     * =========================================================
     *
     * We use answer first.
     *
     * transcript is used as a safety fallback in case
     * speech recognition has produced text but React has
     * not yet updated the answer state.
     */

    const evaluateAnswer =
        async () => {

        try {

            setEvaluating(true);
            setError("");

            const currentAnswer =
                (
                    answer ||
                    transcript ||
                    ""
                ).trim();


            const res =
                await api.post(
                    "/evaluation",
                    {
                        question:
                            allQuestions[
                                currentQuestion
                            ],

                        answer:
                            currentAnswer
                    }
                );


            setEvaluation(
                res.data.evaluation
            );


        } catch (err) {

            console.error(
                "Evaluation Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Answer evaluation failed."
            );

        } finally {

            setEvaluating(false);
        }
    };


    /*
     * =========================================================
     * SAVE CURRENT ANSWER
     * =========================================================
     */

    const saveCurrentAnswer = () => {

        const updated =
            [...answers];


        /*
         * Use the textarea answer first.
         *
         * If for some reason it is empty but the speech
         * transcript exists, save the transcript.
         */

        const finalAnswer =
            (
                answer ||
                transcript ||
                ""
            ).trim();


        updated[
            currentQuestion
        ] = finalAnswer;


        return updated;
    };


    /*
     * =========================================================
     * PREVIOUS QUESTION
     * =========================================================
     */

    const goToPrevious =
        () => {

        const updated =
            saveCurrentAnswer();

        const previous =
            currentQuestion - 1;


        setAnswers(updated);

        setCurrentQuestion(
            previous
        );


        setAnswer(
            updated[previous] || ""
        );


        setEvaluation(null);

        setError("");

        resetTranscript();
    };


    /*
     * =========================================================
     * NEXT QUESTION
     * =========================================================
     */

    const goToNext =
        () => {

        const updated =
            saveCurrentAnswer();

        const next =
            currentQuestion + 1;


        setAnswers(updated);

        setCurrentQuestion(
            next
        );


        setAnswer(
            updated[next] || ""
        );


        setEvaluation(null);

        setError("");

        resetTranscript();
    };


    /*
     * =========================================================
     * FINISH INTERVIEW
     * =========================================================
     */

    const finishInterview =
        async () => {

        const updatedAnswers =
            saveCurrentAnswer();


        try {

            setFinishing(true);
            setError("");


            const res =
                await api.post(
                    "/report",
                    {
                        questions:
                            allQuestions,

                        answers:
                            updatedAnswers
                    }
                );


            navigate(
                `/report?session=${res.data.sessionId}`,
                {
                    state: {

                        report:
                            res.data.report,

                        userName:
                            localStorage.getItem(
                                "name"
                            ) ||
                            "Candidate"

                    }
                }
            );


        } catch (err) {

            console.error(
                "Report Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to generate interview report."
            );

        } finally {

            setFinishing(false);
        }
    };


    /*
     * =========================================================
     * CURRENT QUESTION
     * =========================================================
     */

    const currentQuestionText =
        allQuestions[
            currentQuestion
        ] || "";


    /*
     * =========================================================
     * PROGRESS
     * =========================================================
     */

    const progress =
        allQuestions.length > 0
            ? (
                (currentQuestion + 1) /
                allQuestions.length
            ) * 100
            : 0;


    /*
     * =========================================================
     * CLEAR ANSWER
     * =========================================================
     */

    const clearAnswer = () => {

        setAnswer("");

        resetTranscript();

        setEvaluation(null);

        setError("");
    };


    /*
     * =========================================================
     * START / STOP MICROPHONE
     * =========================================================
     */

    const toggleMicrophone =
        () => {

        if (!listening) {

            /*
             * Start a fresh recording.
             *
             * Existing answer is preserved.
             */

            resetTranscript();


            SpeechRecognition.startListening(
                {
                    continuous: true
                }
            );

        } else {

            SpeechRecognition.stopListening();

        }
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
                    START SCREEN
                ====================================================== */}

                {!questions && (

                    <div className="surface-card p-8 sm:p-14 text-center space-y-6">

                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto">

                            <FiCpu className="w-10 h-10" />

                        </div>


                        <div className="max-w-xl mx-auto">

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">

                                Ready to Practice Your Interview?

                            </h2>


                            <p className="mt-2 text-[var(--text-muted)]">

                                Your saved resume will automatically be used. Every new session is designed to ask fresh questions.

                            </p>

                        </div>


                        <div className="max-w-md mx-auto p-4 rounded-2xl bg-[var(--panel-soft)] border border-[var(--border)] text-left text-xs text-[var(--text-muted)]">

                            <div className="font-bold text-[var(--text)] flex items-center gap-2">

                                <FiHelpCircle className="text-indigo-500" />

                                Interview Flow

                            </div>


                            <ol className="list-decimal list-inside mt-2 space-y-1">

                                <li>
                                    Your saved resume is loaded automatically.
                                </li>

                                <li>
                                    AI generates a fresh set of questions.
                                </li>

                                <li>
                                    You can type or speak your answer.
                                </li>

                                <li>
                                    Every question gets an ideal answer in the final report.
                                </li>

                            </ol>

                        </div>


                        <button
                            type="button"
                            onClick={
                                generateQuestions
                            }
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
                        >

                            {loading ? (

                                <>

                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                    Generating Fresh Questions...

                                </>

                            ) : (

                                <>

                                    <FiCpu />

                                    Start New Interview

                                </>

                            )}

                        </button>

                    </div>

                )}


                {/* =====================================================
                    ERROR
                ====================================================== */}

                {error && (

                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold flex items-center gap-3">

                        <FiAlertCircle />

                        {error}

                    </div>

                )}


                {questions && (

                    <>


                        {/* =================================================
                            HEADER
                        ================================================== */}

                        <div className="surface-card p-6 sm:p-8">

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                <div>

                                    <div className="pill mb-3">

                                        <FiMic />

                                        Live AI Interview

                                    </div>


                                    <h1 className="text-3xl font-extrabold text-[var(--text)]">

                                        Question{" "}
                                        {currentQuestion + 1}
                                        {" "}
                                        of{" "}
                                        {allQuestions.length}

                                    </h1>

                                </div>


                                <div className="text-right">

                                    <div className="text-xs font-bold text-[var(--text-muted)]">

                                        Progress

                                    </div>


                                    <div className="text-2xl font-extrabold text-indigo-500">

                                        {Math.round(
                                            progress
                                        )}%

                                    </div>

                                </div>

                            </div>


                            <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">

                                <motion.div
                                    animate={{
                                        width: `${progress}%`
                                    }}
                                    className="h-full bg-indigo-600 rounded-full"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            QUESTION
                        ================================================== */}

                        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

                            <div className="flex items-start gap-4">

                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">

                                    <FiHelpCircle className="w-6 h-6" />

                                </div>


                                <div>

                                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">

                                        Interview Question

                                    </p>


                                    <h2 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">

                                        {currentQuestionText}

                                    </h2>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            ANSWER
                        ================================================== */}

                        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">

                            <div className="flex items-center justify-between">

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">

                                    Your Answer

                                </h3>


                                <div className="text-xs text-slate-400">

                                    Optional — unanswered questions still receive an ideal answer.

                                </div>

                            </div>


                            <textarea
                                value={
                                    answer
                                }
                                onChange={(e) =>
                                    setAnswer(
                                        e.target.value
                                    )
                                }
                                placeholder="Type your answer here..."
                                rows={8}
                                className="input-shell w-full p-4 resize-none"
                            />


                            <div className="flex flex-wrap gap-3">


                                {/* MIC */}

                                <button
                                    type="button"
                                    onClick={
                                        toggleMicrophone
                                    }
                                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold ${
                                        listening
                                            ? "bg-rose-600 hover:bg-rose-500"
                                            : "bg-indigo-600 hover:bg-indigo-500"
                                    }`}
                                >

                                    {listening ? (

                                        <>

                                            <FiSquare />

                                            Stop Recording

                                        </>

                                    ) : (

                                        <>

                                            <FiMic />

                                            Start Mic

                                        </>

                                    )}

                                </button>


                                {/* CLEAR */}

                                <button
                                    type="button"
                                    onClick={
                                        clearAnswer
                                    }
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold"
                                >

                                    <FiTrash2 />

                                    Clear

                                </button>


                                {/* EVALUATE */}

                                <button
                                    type="button"
                                    onClick={
                                        evaluateAnswer
                                    }
                                    disabled={
                                        evaluating
                                    }
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-50"
                                >

                                    {evaluating ? (

                                        <>

                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                            Evaluating...

                                        </>

                                    ) : (

                                        <>

                                            <FiCheckCircle />

                                            Evaluate Answer

                                        </>

                                    )}

                                </button>

                            </div>


                            {/* =================================================
                                LIVE TRANSCRIPT
                            ================================================== */}

                            {transcript && (

                                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-slate-700 dark:text-slate-300">

                                    <div className="font-bold mb-2 flex items-center gap-2">

                                        <FiMic className="text-indigo-500" />

                                        Live Transcript

                                    </div>


                                    <p className="whitespace-pre-wrap">

                                        {transcript}

                                    </p>

                                </div>

                            )}


                        </div>


                        {/* =================================================
                            EVALUATION
                        ================================================== */}

                        <AnimatePresence>

                            {evaluation && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 10
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6"
                                >


                                    <div className="flex items-center gap-3">

                                        <FiAward className="text-indigo-500 w-6 h-6" />

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">

                                            AI Evaluation

                                        </h3>

                                    </div>


                                    <div className="grid sm:grid-cols-4 gap-4">

                                        {[
                                            [
                                                "Score",
                                                evaluation.score
                                            ],
                                            [
                                                "Technical",
                                                evaluation.technicalAccuracy
                                            ],
                                            [
                                                "Communication",
                                                evaluation.communication
                                            ],
                                            [
                                                "Confidence",
                                                evaluation.confidence
                                            ]
                                        ].map(
                                            (
                                                [label, value]
                                            ) => (

                                                <div
                                                    key={
                                                        label
                                                    }
                                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50"
                                                >

                                                    <p className="text-xs text-slate-400 font-bold uppercase">

                                                        {label}

                                                    </p>


                                                    <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">

                                                        {value}

                                                        /10

                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </div>


                                    {/* STRENGTHS */}

                                    <div>

                                        <h4 className="font-bold text-emerald-500">

                                            What You Did Well

                                        </h4>


                                        <ul className="mt-2 space-y-2">

                                            {(
                                                evaluation.strengths ||
                                                []
                                            ).map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <li
                                                        key={
                                                            index
                                                        }
                                                        className="text-sm text-slate-600 dark:text-slate-300"
                                                    >

                                                        • {item}

                                                    </li>

                                                )
                                            )}

                                        </ul>

                                    </div>


                                    {/* MISTAKES */}

                                    <div>

                                        <h4 className="font-bold text-rose-500">

                                            Mistakes

                                        </h4>


                                        <ul className="mt-2 space-y-2">

                                            {(
                                                evaluation.mistakes ||
                                                []
                                            ).map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <li
                                                        key={
                                                            index
                                                        }
                                                        className="text-sm text-slate-600 dark:text-slate-300"
                                                    >

                                                        • {item}

                                                    </li>

                                                )
                                            )}

                                        </ul>

                                    </div>


                                    {/* IDEAL ANSWER */}

                                    <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">

                                        <h4 className="font-bold text-indigo-500">

                                            Correct / Ideal Answer

                                        </h4>


                                        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">

                                            {evaluation.idealAnswer ||
                                                "No ideal answer generated."}

                                        </p>

                                    </div>


                                    {/* FEEDBACK */}

                                    <div>

                                        <h4 className="font-bold text-amber-500">

                                            Feedback

                                        </h4>


                                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">

                                            {evaluation.feedback ||
                                                "No additional feedback."}

                                        </p>

                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>


                        {/* =================================================
                            NAVIGATION
                        ================================================== */}

                        <div className="flex flex-col sm:flex-row justify-between gap-4">


                            {/* PREVIOUS */}

                            <button
                                type="button"
                                disabled={
                                    currentQuestion ===
                                    0
                                }
                                onClick={
                                    goToPrevious
                                }
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold disabled:opacity-40"
                            >

                                <FiArrowLeft />

                                Previous

                            </button>


                            {/* NEXT */}

                            {currentQuestion <
                            allQuestions.length -
                                1 ? (

                                <button
                                    type="button"
                                    onClick={
                                        goToNext
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
                                >

                                    Next Question

                                    <FiArrowRight />

                                </button>

                            ) : (

                                <button
                                    type="button"
                                    onClick={
                                        finishInterview
                                    }
                                    disabled={
                                        finishing
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-50"
                                >

                                    {finishing ? (

                                        <>

                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                            Generating Complete Report...

                                        </>

                                    ) : (

                                        <>

                                            <FiCheckCircle />

                                            Finish Interview & Get Report

                                        </>

                                    )}

                                </button>

                            )}

                        </div>

                    </>
                )}

            </div>

        </MainLayout>
    );
}

export default Interview;