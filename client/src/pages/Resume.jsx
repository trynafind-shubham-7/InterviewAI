import { useEffect, useState } from "react";
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
    FiInfo,
    FiRefreshCw
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import api from "../api/axios";

function Resume() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] =
        useState(null);

    const [savedResume, setSavedResume] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [loadingResume, setLoadingResume] =
        useState(true);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [isDragging, setIsDragging] =
        useState(false);

    useEffect(() => {
        loadSavedResume();
    }, []);

    const loadSavedResume = async () => {

        try {

            setLoadingResume(true);
            setError("");

            const response =
                await api.get("/resume/current");

            setSavedResume(
                response.data.resume || null
            );

            if (
                response.data.resume?.analysis
            ) {
                setAnalysis(
                    response.data.resume.analysis
                );
            }

        } catch (err) {

            console.error(
                "Load Resume Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load your saved resume."
            );

        } finally {

            setLoadingResume(false);
        }
    };


    const handleFileChange =
        (selectedFile) => {

        if (!selectedFile) {
            return;
        }

        if (
            selectedFile.type !==
            "application/pdf"
        ) {

            setError(
                "Only PDF files are supported."
            );

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

        if (
            e.dataTransfer.files &&
            e.dataTransfer.files[0]
        ) {
            handleFileChange(
                e.dataTransfer.files[0]
            );
        }
    };


    const uploadResume = async () => {

        if (!file) {

            setError(
                "Please select a PDF resume first."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");
            setSuccess("");

            const formData =
                new FormData();

            formData.append(
                "resume",
                file
            );

            const response =
                await api.post(
                    "/resume/upload",
                    formData
                );

            setSavedResume(
                response.data.resume
            );

            setAnalysis(
                response.data.analysis
            );

            setFile(null);

            setSuccess(
                "Your resume has been saved and is now your active resume."
            );

        } catch (err) {

            console.error(
                "Resume Upload Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to analyze resume."
            );

        } finally {

            setLoading(false);
        }
    };


    const getScoreBadge = (score) => {

        const numScore =
            Number(score) || 0;

        if (numScore >= 80) {

            return {
                label: "High ATS Match",
                color:
                    "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
            };
        }

        if (numScore >= 60) {

            return {
                label:
                    "Good - Needs Minor Keywords",
                color:
                    "text-amber-500 bg-amber-500/10 border-amber-500/20"
            };
        }

        return {
            label:
                "Needs Key Skills Added",
            color:
                "text-rose-500 bg-rose-500/10 border-rose-500/20"
        };
    };


    if (loadingResume) {

        return (
            <MainLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Loader
                        message="Loading your saved resume..."
                        size="lg"
                    />
                </div>
            </MainLayout>
        );
    }


    return (
        <MainLayout>

            <div className="space-y-8">

                <div className="surface-card p-6 sm:p-8">

                    <div className="max-w-2xl">

                        <div className="pill mb-3">
                            <FiCpu className="w-3.5 h-3.5" />
                            AI Resume Intelligence
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
                            ATS Resume Analyzer
                        </h1>

                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
                            Your active resume is automatically saved to your account and will be used for future interviews.
                        </p>

                    </div>

                </div>


                {/* SAVED RESUME */}

                {savedResume && (

                    <div className="p-6 sm:p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                            <div className="flex items-start gap-4">

                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                                    <FiCheckCircle className="w-6 h-6" />
                                </div>

                                <div>

                                    <div className="flex items-center gap-2">

                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                            Saved Resume
                                        </h2>

                                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-emerald-500 text-white">
                                            Active
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        {savedResume.originalName}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        Uploaded{" "}
                                        {new Date(
                                            savedResume.uploadedAt
                                        ).toLocaleString()}
                                    </p>

                                    <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
                                        This resume will automatically be used when generating your next interview.
                                    </p>

                                </div>

                            </div>

                            <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-sm font-bold cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">

                                <FiRefreshCw className="w-4 h-4" />

                                Replace Resume

                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={(e) =>
                                        handleFileChange(
                                            e.target.files?.[0]
                                        )
                                    }
                                    className="hidden"
                                />

                            </label>

                        </div>

                    </div>
                )}


                <div className="surface-panel p-5 flex items-start gap-4">

                    <FiInfo className="w-6 h-6 text-[var(--primary)] shrink-0 mt-0.5" />

                    <div className="text-xs sm:text-sm leading-relaxed space-y-1">

                        <h4 className="font-bold text-[var(--text)]">
                            Your resume is persistent
                        </h4>

                        <p className="text-[var(--text-muted)]">
                            You only need to upload your resume once. You can replace it whenever your resume changes.
                        </p>

                    </div>

                </div>


                {/* UPLOAD */}

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">

                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() =>
                            setIsDragging(false)
                        }
                        onDrop={handleDrop}
                        className={`
                            relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200
                            ${
                                isDragging
                                    ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
                                    : "border-slate-300 dark:border-slate-700/80 hover:border-indigo-500/60 bg-slate-50/50 dark:bg-slate-950/40"
                            }
                        `}
                    >

                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
                            <FiUploadCloud className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {savedResume
                                ? "Replace Your Resume"
                                : "Upload Your Resume"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            PDF files only — max 10 MB
                        </p>

                        <label className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-sm cursor-pointer">

                            <FiFileText className="w-4 h-4 text-indigo-400" />

                            Select PDF File

                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) =>
                                    handleFileChange(
                                        e.target.files?.[0]
                                    )
                                }
                                className="hidden"
                            />

                        </label>


                        {file && (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.9
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1
                                }}
                                className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-semibold"
                            >

                                <FiFileText className="w-4 h-4" />

                                {file.name}

                                {" "}

                                (
                                {(file.size / 1024).toFixed(1)}
                                {" "}KB)

                            </motion.div>

                        )}

                    </div>


                    <div className="mt-6 flex justify-end">

                        <button
                            type="button"
                            onClick={uploadResume}
                            disabled={
                                loading ||
                                !file
                            }
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 disabled:opacity-50"
                        >

                            {loading ? (

                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                    Saving Resume...

                                </>

                            ) : (

                                <>
                                    <FiCpu className="w-4 h-4" />

                                    {savedResume
                                        ? "Save New Resume"
                                        : "Analyze & Save Resume"}

                                </>

                            )}

                        </button>

                    </div>

                </div>


                {error && (

                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold flex items-center gap-3">

                        <FiAlertCircle />

                        {error}

                    </div>

                )}


                {success && (

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center gap-3">

                        <FiCheck />

                        {success}

                    </div>

                )}


                {/* ANALYSIS */}

                <AnimatePresence>

                    {analysis && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            className="space-y-6"
                        >

                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                                            ATS Score
                                        </p>

                                        <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white mt-1">
                                            {analysis.score}
                                            <span className="text-xl text-slate-400">
                                                {" "}/ 100
                                            </span>
                                        </h2>

                                    </div>

                                    <span
                                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                                            getScoreBadge(
                                                analysis.score
                                            ).color
                                        }`}
                                    >
                                        {
                                            getScoreBadge(
                                                analysis.score
                                            ).label
                                        }
                                    </span>

                                </div>

                            </div>


                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

                                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <FiCheckCircle className="text-emerald-500" />
                                        Strengths
                                    </h3>

                                    <div className="space-y-3">

                                        {(analysis.strengths || []).map(
                                            (item, index) => (

                                                <div
                                                    key={index}
                                                    className="p-3 rounded-xl bg-emerald-500/10 text-sm text-slate-700 dark:text-slate-300"
                                                >
                                                    {item}
                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>


                                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

                                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <FiAlertTriangle className="text-rose-500" />
                                        Missing Skills
                                    </h3>

                                    <div className="space-y-3">

                                        {(analysis.missingSkills || []).map(
                                            (item, index) => (

                                                <div
                                                    key={index}
                                                    className="p-3 rounded-xl bg-rose-500/10 text-sm text-slate-700 dark:text-slate-300"
                                                >
                                                    {item}
                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            </div>


                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

                                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <FiZap className="text-amber-500" />
                                    Improvement Suggestions
                                </h3>

                                <div className="space-y-3">

                                    {(analysis.improvements || []).map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="p-3 rounded-xl bg-indigo-500/10 text-sm text-slate-700 dark:text-slate-300"
                                            >
                                                {item}
                                            </div>

                                        )
                                    )}

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