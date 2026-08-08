import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiFileText, 
    FiUploadCloud, 
    FiCheckCircle, 
    FiAlertTriangle, 
    FiZap, 
    FiCheck, 
    FiAlertCircle, 
    FiCpu,
    FiHelpCircle,
    FiInfo
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import api from "../api/axios";

function Resume() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (selectedFile) => {
        if (!selectedFile) return;
        if (selectedFile.type !== "application/pdf") {
            setError("Only PDF files are supported.");
            return;
        }
        setFile(selectedFile);
        setAnalysis(null);
        setError("");
        setSuccess("");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const uploadResume = async () => {
        if (!file) {
            setError("Please select a PDF resume first.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("resume", file);

            const response = await api.post("/resume/upload", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAnalysis(response.data.analysis);
            setSuccess("Resume successfully analyzed by AI!");
        } catch (err) {
            console.error("Resume Upload Error:", err);
            setError(err.response?.data?.message || "Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getScoreBadge = (score) => {
        const numScore = Number(score) || 0;
        if (numScore >= 80) return { label: "High ATS Match", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
        if (numScore >= 60) return { label: "Good - Needs Minor Keywords", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
        return { label: "Needs Key Skills Added", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Header Banner */}
                <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-indigo-800/40 text-white shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                            <FiCpu className="w-3.5 h-3.5" />
                            AI Resume Intelligence
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            ATS Resume Analyzer
                        </h1>
                        <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                            Upload your resume to check your score, find missing job keywords, and ensure companies don't auto-reject your application.
                        </p>
                    </div>
                </div>

                {/* Beginner Explanatory Banner */}
                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-slate-800 dark:text-slate-200 flex items-start gap-4">
                    <FiInfo className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                            What is an ATS Resume Score?
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            <strong>ATS (Applicant Tracking System)</strong> is automated software recruiters use to filter resumes. Our AI reads your PDF, grades keyword strength, and highlights missing skills so you can optimize your resume before submitting applications.
                        </p>
                    </div>
                </div>

                {/* Upload Zone Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`
                            relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200
                            ${isDragging 
                                ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]" 
                                : "border-slate-300 dark:border-slate-700/80 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 bg-slate-50/50 dark:bg-slate-950/40"
                            }
                        `}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
                            <FiUploadCloud className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Drag & Drop Your Resume PDF Here
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            (PDF files only — max 10 MB)
                        </p>

                        <label className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-colors">
                            <FiFileText className="w-4 h-4 text-indigo-400" />
                            Select PDF File
                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) => handleFileChange(e.target.files?.[0])}
                                className="hidden"
                            />
                        </label>

                        {file && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-semibold"
                            >
                                <FiFileText className="w-4 h-4" />
                                {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </motion.div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={uploadResume}
                            disabled={loading || !file}
                            className="
                                w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white
                                bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95
                                disabled:opacity-50 shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer
                            "
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Scanning Resume...
                                </span>
                            ) : (
                                <>
                                    <FiCpu className="w-4 h-4" />
                                    Analyze Resume Now
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                {error && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold flex items-center gap-3">
                        <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center gap-3">
                        <FiCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        {success}
                    </div>
                )}

                {/* Loading Indicator */}
                {loading && (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <Loader message="Extracting text & running ATS keyword evaluation..." size="lg" />
                    </div>
                )}

                {/* Analysis Results Display */}
                <AnimatePresence>
                    {analysis && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Score Card */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Overall ATS Score
                                    </span>
                                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                                        {analysis.score} <span className="text-xl text-slate-400">/ 100</span>
                                    </h2>
                                    <div className="mt-3">
                                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${getScoreBadge(analysis.score).color}`}>
                                            {getScoreBadge(analysis.score).label}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-32 h-32 relative flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-800" fill="transparent" />
                                        <circle
                                            cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10"
                                            strokeDasharray={339}
                                            strokeDashoffset={339 - (339 * (analysis.score || 0)) / 100}
                                            strokeLinecap="round"
                                            className="text-indigo-600 transition-all duration-1000 ease-out"
                                            fill="transparent"
                                        />
                                    </svg>
                                    <span className="absolute font-extrabold text-2xl text-slate-900 dark:text-white">
                                        {analysis.score}%
                                    </span>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                    <FiFileText className="text-indigo-500" />
                                    AI Overview Summary
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    {analysis.summary || "No summary details available."}
                                </p>
                            </div>

                            {/* Grid 2 Columns: Strengths & Missing Skills */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Strengths */}
                                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                        <FiCheckCircle className="text-emerald-500" />
                                        Resume Strengths
                                    </h3>
                                    <div className="space-y-3">
                                        {(analysis.strengths || []).map((item, idx) => (
                                            <div key={idx} className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3">
                                                <FiCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Missing Skills */}
                                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                        <FiAlertTriangle className="text-amber-500" />
                                        Missing Keywords to Add
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(analysis.missingSkills || []).map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold text-xs">
                                                + {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Improvements */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                    <FiZap className="text-indigo-500" />
                                    Suggested Resume Improvements
                                </h3>
                                <div className="space-y-3">
                                    {(analysis.improvements || []).map((item, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-slate-800 dark:text-slate-200 text-sm font-medium flex items-start gap-3">
                                            <FiZap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MainLayout>
    );
}

export default Resume;