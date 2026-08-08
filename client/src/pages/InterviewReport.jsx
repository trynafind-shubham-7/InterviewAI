import { useLocation, useNavigate } from "react"
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
    FiCpu 
} from "react-icons/fi";
import { jsPDF } from "jspdf";

import MainLayout from "../layouts/MainLayout";

function InterviewReport() {
    const location = useLocation();
    const navigate = useNavigate();

    const report = location.state?.report;
    const userName = location.state?.userName || localStorage.getItem("name") || "Candidate";

    if (!report) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex items-center justify-center p-4">
                    <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                            <FiFileText className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            No Interview Report Found
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Complete an interview session first to generate your performance report analytics.
                        </p>
                        <button
                            onClick={() => navigate("/interview")}
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

    const overallScore = Number(report.overallScore ?? report.score ?? 0);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("InterviewAI Performance Report", 14, 20);
        doc.setFontSize(12);
        doc.text(`Candidate: ${userName}`, 14, 30);
        doc.text(`Overall Score: ${overallScore}/10`, 14, 38);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 46);

        doc.setFontSize(14);
        doc.text("Summary:", 14, 58);
        doc.setFontSize(10);
        const splitSummary = doc.splitTextToSize(report.summary || "No summary available.", 180);
        doc.text(splitSummary, 14, 66);

        let yPos = 66 + splitSummary.length * 6 + 10;
        doc.setFontSize(14);
        doc.text("Strengths:", 14, yPos);
        doc.setFontSize(10);
        yPos += 8;
        (report.strengths || []).forEach((item) => {
            doc.text(`• ${item}`, 14, yPos);
            yPos += 6;
        });

        yPos += 6;
        doc.setFontSize(14);
        doc.text("Areas for Improvement:", 14, yPos);
        doc.setFontSize(10);
        yPos += 8;
        (report.weaknesses || []).forEach((item) => {
            doc.text(`• ${item}`, 14, yPos);
            yPos += 6;
        });

        doc.save(`InterviewAI_Report_${userName.replace(/\s+/g, "_")}.pdf`);
    };

    const getScoreBadge = () => {
        if (overallScore >= 8) return { label: "Exceptional Candidate Performance", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
        if (overallScore >= 6) return { label: "Good Performance - Ready with Minor Practice", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
        return { label: "Needs Practice & Preparation", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Banner Header */}
                <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-purple-800/40 text-white shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
                                <FiCpu className="w-3.5 h-3.5" />
                                Post-Interview Evaluation Sheet
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                Congratulations, {userName}!
                            </h1>
                            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                                Here is your comprehensive AI performance report and constructive feedback breakdown.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={downloadPDF}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/30 transition duration-200 cursor-pointer shrink-0"
                        >
                            <FiDownload className="w-4 h-4" />
                            Download PDF Report
                        </button>
                    </div>
                </div>

                {/* Score Gauge Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
                >
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Overall Evaluation Score
                        </span>
                        <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white mt-1">
                            {overallScore} <span className="text-2xl text-slate-400">/ 10</span>
                        </h2>
                        <div className="mt-3">
                            <span className={`inline-block text-xs font-bold px-3.5 py-1.5 rounded-full border ${getScoreBadge().color}`}>
                                {getScoreBadge().label}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                            <FiAward className="w-12 h-12" />
                        </div>
                    </div>
                </motion.div>

                {/* Summary Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FiFileText className="text-indigo-500" />
                        Executive AI Performance Summary
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        {report.summary || "No overall summary available."}
                    </p>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500" />
                            Demonstrated Strengths
                        </h3>
                        <div className="space-y-3">
                            {(report.strengths || []).map((item, idx) => (
                                <div key={idx} className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3">
                                    <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Areas for Improvement */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FiAlertTriangle className="text-rose-500" />
                            Key Areas for Improvement
                        </h3>
                        <div className="space-y-3">
                            {(report.weaknesses || []).map((item, idx) => (
                                <div key={idx} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3">
                                    <FiAlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recommendations Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FiZap className="text-amber-500" />
                        AI Growth & Practice Recommendations
                    </h3>
                    <div className="space-y-3">
                        {(report.improvements || []).map((item, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3">
                                <FiZap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/interview")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-colors cursor-pointer"
                    >
                        <FiRotateCcw className="w-4 h-4" />
                        Practice Another Session
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
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