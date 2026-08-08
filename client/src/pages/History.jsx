import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiClock, 
    FiSearch, 
    FiCalendar, 
    FiAward, 
    FiMessageSquare, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiRotateCcw,
    FiFileText
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import api from "../api/axios";

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");
            const res = await api.get("/history", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setHistory(res.data.history || []);
        } catch (err) {
            console.error("History Error:", err);
            setError(err.response?.data?.message || "Failed to load interview history.");
        } finally {
            setLoading(false);
        }
    };

    const getScoreBadge = (score) => {
        const numScore = Number(score) || 0;
        if (numScore >= 8) return { label: "High Score", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
        if (numScore >= 6) return { label: "Moderate", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
        return { label: "Needs Practice", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Recent Session";
        return new Date(dateStr).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const filteredHistory = history.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            (item.question && item.question.toLowerCase().includes(query)) ||
            (item.answer && item.answer.toLowerCase().includes(query)) ||
            (item.feedback && item.feedback.toLowerCase().includes(query))
        );
    });

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Header Banner */}
                <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800/40 text-white shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                            <FiClock className="w-3.5 h-3.5" />
                            Session History & Logs
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Interview Logs
                        </h1>
                        <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                            Review your past questions, transcript answers, and AI-assigned ratings to measure your progress.
                        </p>
                    </div>
                </div>

                {/* Filter / Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <FiSearch className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions or keywords..."
                            className="
                                w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium
                                bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                                text-slate-900 dark:text-white placeholder-slate-400
                                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                                transition-all duration-200
                            "
                        />
                    </div>

                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Showing {filteredHistory.length} of {history.length} Session Records
                    </div>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <Loader message="Fetching session history..." size="lg" />
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-3">
                        <div className="flex items-center gap-3 text-sm font-bold">
                            <FiAlertCircle className="w-5 h-5 text-rose-400" />
                            {error}
                        </div>
                        <button
                            type="button"
                            onClick={fetchHistory}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors"
                        >
                            <FiRotateCcw className="w-4 h-4" />
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredHistory.length === 0 && (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                            <FiFileText className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            No Interview Logs Found
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                            {searchQuery ? "No records match your search filter." : "Complete your first AI mock interview session to view history here."}
                        </p>
                    </div>
                )}

                {/* History List Cards */}
                {!loading && !error && filteredHistory.length > 0 && (
                    <div className="space-y-5">
                        {filteredHistory.map((item, idx) => (
                            <motion.div
                                key={item.id || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="
                                    p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90
                                    border border-slate-200/80 dark:border-slate-800/80
                                    shadow-sm hover:shadow-lg transition-all duration-300 space-y-5
                                "
                            >
                                {/* Card Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-sm">
                                            #{idx + 1}
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Mock Session Log
                                            </span>
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                                                <FiCalendar className="w-3.5 h-3.5" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreBadge(item.score).color}`}>
                                            {getScoreBadge(item.score).label}
                                        </span>
                                        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                            {item.score} <span className="text-xs text-slate-400 font-medium">/ 10</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="space-y-1.5">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Interview Question
                                    </h4>
                                    <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                                        {item.question}
                                    </p>
                                </div>

                                {/* Answer */}
                                <div className="space-y-1.5">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                        <FiMessageSquare /> Your Transcript Answer
                                    </h4>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {item.answer || "No text transcript recorded."}
                                    </div>
                                </div>

                                {/* AI Feedback */}
                                {item.feedback && (
                                    <div className="space-y-1.5">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                            <FiAward className="text-amber-400" /> AI Feedback Breakdown
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {item.feedback}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default History;