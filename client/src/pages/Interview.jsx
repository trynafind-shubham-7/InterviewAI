import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { 
    FiMic, 
    FiSquare, 
    FiTrash2, 
    FiStar, 
    FiArrowLeft, 
    FiArrowRight, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiCpu, 
    FiVolume2,
    FiAward
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import api from "../api/axios";

function Interview() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [evaluating, setEvaluating] = useState(false);
    const [finishing, setFinishing] = useState(false);
    const [error, setError] = useState("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return (
            <MainLayout>
                <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-center space-y-4">
                    <FiAlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
                    <h2 className="text-2xl font-bold">Browser Speech Recognition Unavailable</h2>
                    <p className="text-sm max-w-md mx-auto text-slate-300">
                        Your browser doesn't natively support speech recognition. You can still participate by typing your answers directly into the text workspace.
                    </p>
                </div>
            </MainLayout>
        );
    }

    const generateQuestions = async () => {
        try {
            setLoading(true);
            setError("");
            setEvaluation(null);

            const token = localStorage.getItem("token");
            const res = await api.post("/interview/generate", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const generated = res.data.questions;
            const all = [
                ...(generated.easy || []),
                ...(generated.medium || []),
                ...(generated.hard || [])
            ];

            if (all.length === 0) {
                throw new Error("No interview questions were generated.");
            }

            setQuestions(generated);
            setAllQuestions(all);
            setCurrentQuestion(0);
            setAnswers([]);
            setAnswer("");
            resetTranscript();
        } catch (err) {
            console.error("Interview Generation Error:", err);
            setError(err.response?.data?.message || err.message || "Failed to generate interview questions.");
        } finally {
            setLoading(false);
        }
    };

    const evaluateAnswer = async () => {
        if (!answer.trim()) {
            setError("Please provide an answer before evaluating.");
            return;
        }

        try {
            setEvaluating(true);
            setError("");

            const token = localStorage.getItem("token");
            const res = await api.post(
                "/evaluation",
                { question: allQuestions[currentQuestion], answer },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setEvaluation(res.data.evaluation);
        } catch (err) {
            console.error("Evaluation Error:", err);
            setError(err.response?.data?.message || "Answer evaluation failed.");
        } finally {
            setEvaluating(false);
        }
    };

    const saveCurrentAnswer = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = answer;
        return updatedAnswers;
    };

    const goToPrevious = () => {
        const updatedAnswers = saveCurrentAnswer();
        const previous = currentQuestion - 1;
        setAnswers(updatedAnswers);
        setCurrentQuestion(previous);
        setAnswer(updatedAnswers[previous] || "");
        setEvaluation(null);
        setError("");
        resetTranscript();
    };

    const goToNext = () => {
        const updatedAnswers = saveCurrentAnswer();
        const next = currentQuestion + 1;
        setAnswers(updatedAnswers);
        setCurrentQuestion(next);
        setAnswer(updatedAnswers[next] || "");
        setEvaluation(null);
        setError("");
        resetTranscript();
    };

    const finishInterview = async () => {
        const updatedAnswers = saveCurrentAnswer();

        try {
            setFinishing(true);
            setError("");

            const token = localStorage.getItem("token");
            const reportRes = await api.post(
                "/report",
                { questions: allQuestions, answers: updatedAnswers },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            navigate("/report", {
                state: {
                    report: reportRes.data.report,
                    userName: localStorage.getItem("name") || "Candidate"
                }
            });
        } catch (err) {
            console.error("Report Error:", err);
            setError(err.response?.data?.message || "Failed to generate interview report.");
        } finally {
            setFinishing(false);
        }
    };

    const progress = allQuestions.length > 0 ? ((currentQuestion + 1) / allQuestions.length) * 100 : 0;

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Banner Header */}
                <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 text-white shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
                            <FiMic className="w-3.5 h-3.5" />
                            Live AI Studio Stage
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Interactive Mock Interview Studio
                        </h1>
                        <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                            Practice dynamic AI questions, speak or type your answers, and receive instant Groq LLM feedback.
                        </p>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold flex items-center gap-3">
                        <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Initial Launch Stage */}
                {!questions && (
                    <div className="p-8 sm:p-14 text-center rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25">
                            <FiCpu className="w-10 h-10 animate-pulse" />
                        </div>

                        <div className="max-w-xl mx-auto space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Ready to Practice Your Interview?
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                                Our AI engine will inspect your profile and resume background to construct realistic technical & behavioral questions.
                            </p>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={generateQuestions}
                                disabled={loading}
                                className="
                                    inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-bold text-base text-white
                                    bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95
                                    disabled:opacity-50 shadow-xl shadow-purple-500/30 hover:scale-105 transition-all duration-200 cursor-pointer
                                "
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Generating Questions...
                                    </span>
                                ) : (
                                    <>
                                        <FiMic className="w-5 h-5" />
                                        Start Practice Interview Session
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Active Interview Stage */}
                {questions && allQuestions.length > 0 && (
                    <div className="space-y-6">
                        {/* Progress Bar Header */}
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Question {currentQuestion + 1} of {allQuestions.length}
                                </span>
                                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {Math.round(progress)}% Completed
                                </span>
                            </div>
                            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <motion.div
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                    Prompt #{currentQuestion + 1}
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                                {allQuestions[currentQuestion]}
                            </h2>
                        </div>

                        {/* Answer Studio Box */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <FiVolume2 className="text-indigo-500" />
                                    Your Answer Transcript
                                </label>

                                {listening && (
                                    <span className="flex items-center gap-2 text-xs font-bold text-rose-500 animate-pulse">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                        Recording Audio...
                                    </span>
                                )}
                            </div>

                            <textarea
                                rows={6}
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Speak into your microphone or type your response here..."
                                className="
                                    w-full p-4 rounded-2xl text-sm font-medium
                                    bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                                    transition-all duration-200 resize-y
                                "
                            />

                            {/* Voice Control Toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetTranscript();
                                            SpeechRecognition.startListening({ continuous: true, language: "en-US" });
                                        }}
                                        className="
                                            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white
                                            bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-colors cursor-pointer
                                        "
                                    >
                                        <FiMic className="w-4 h-4" />
                                        Start Mic
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            SpeechRecognition.stopListening();
                                            if (transcript) setAnswer(transcript);
                                        }}
                                        className="
                                            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white
                                            bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-colors cursor-pointer
                                        "
                                    >
                                        <FiSquare className="w-4 h-4" />
                                        Stop Mic
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            SpeechRecognition.stopListening();
                                            resetTranscript();
                                            setAnswer("");
                                        }}
                                        className="
                                            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300
                                            bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer
                                        "
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                        Clear Answer
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={evaluateAnswer}
                                    disabled={evaluating || !answer.trim()}
                                    className="
                                        inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white
                                        bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95
                                        disabled:opacity-50 shadow-md shadow-emerald-600/20 transition-all duration-200 cursor-pointer
                                    "
                                >
                                    {evaluating ? "Evaluating..." : "Evaluate Response"}
                                </button>
                            </div>
                        </div>

                        {/* Evaluation Feedback Card */}
                        <AnimatePresence>
                            {evaluation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <FiStar className="text-amber-400" />
                                            AI Rating & Feedback
                                        </h3>
                                        <span className="text-2xl font-extrabold text-emerald-500">
                                            {evaluation.score} <span className="text-sm text-slate-400">/ 10</span>
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {evaluation.feedback || "Answer evaluated successfully."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4 pt-4">
                            <button
                                type="button"
                                disabled={currentQuestion === 0}
                                onClick={goToPrevious}
                                className="
                                    inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-300
                                    bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer
                                "
                            >
                                <FiArrowLeft className="w-4 h-4" />
                                Previous Question
                            </button>

                            {currentQuestion < allQuestions.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={goToNext}
                                    className="
                                        inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white
                                        bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-colors cursor-pointer
                                    "
                                >
                                    Next Question
                                    <FiArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={finishInterview}
                                    disabled={finishing}
                                    className="
                                        inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white
                                        bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95
                                        disabled:opacity-50 shadow-lg shadow-purple-500/25 transition-all duration-200 cursor-pointer
                                    "
                                >
                                    {finishing ? "Generating Report..." : "Finish Interview & Get Report"}
                                    <FiAward className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Interview;