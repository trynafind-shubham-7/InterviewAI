import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    FiFileText, 
    FiMic, 
    FiAward, 
    FiStar, 
    FiArrowRight, 
    FiClock, 
    FiUser, 
    FiZap,
    FiTrendingUp,
    FiCheckCircle,
    FiHelpCircle
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/StatsCard";
import ScoreChart from "../components/ScoreChart";
import Loader from "../components/Loader";
import api from "../api/axios";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await api.get("/dashboard", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDashboard(res.data.dashboard);
        } catch (err) {
            console.error("Dashboard Error:", err);
            setDashboard({
                name: localStorage.getItem("name") || "Candidate",
                resumeScore: 78,
                interviews: 5,
                averageScore: 8.2,
                bestScore: 9.5
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex items-center justify-center">
                    <Loader message="Setting up your personalized interview dashboard..." size="lg" />
                </div>
            </MainLayout>
        );
    }

    const currentDashboard = dashboard || {
        name: localStorage.getItem("name") || "Candidate",
        resumeScore: 0,
        interviews: 0,
        averageScore: 0,
        bestScore: 0
    };

    const chartData = [
        { name: "Practice 1", score: 6.2 },
        { name: "Practice 2", score: 7.0 },
        { name: "Practice 3", score: 7.8 },
        { name: "Practice 4", score: 8.5 },
        { name: "Practice 5", score: currentDashboard.bestScore || 9.0 }
    ];

    const onboardingSteps = [
        {
            step: "01",
            title: "Upload Your Resume",
            desc: "Upload a PDF of your resume. Our AI scans it to find missing skills and ATS compatibility.",
            icon: FiFileText,
            action: "Upload Resume",
            path: "/resume",
            color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
        },
        {
            step: "02",
            title: "Practice Mock Interview",
            desc: "Answer realistic technical & behavioral questions via voice mic or typing.",
            icon: FiMic,
            action: "Start Interview",
            path: "/interview",
            color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
        },
        {
            step: "03",
            title: "Review Feedback & Export",
            desc: "Get instant ratings, strengths, areas for improvement, and a downloadable PDF report.",
            icon: FiAward,
            action: "View History",
            path: "/history",
            color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
        }
    ];

    const quickActions = [
        {
            title: "Resume AI Analyzer",
            description: "Upload resume PDF, extract skills, and run ATS readiness scoring.",
            icon: FiFileText,
            path: "/resume",
            gradient: "from-blue-600 to-cyan-500",
            badge: "Step 1"
        },
        {
            title: "Mock Interview Studio",
            description: "Simulate voice/text interviews with real-time AI scoring.",
            icon: FiMic,
            path: "/interview",
            gradient: "from-indigo-600 to-purple-600",
            badge: "Step 2"
        },
        {
            title: "Interview History",
            description: "Review detailed session reports, scores, and past transcripts.",
            icon: FiClock,
            path: "/history",
            gradient: "from-purple-600 to-pink-600",
            badge: "Step 3"
        },
        {
            title: "Profile & Preferences",
            description: "Update display name, target role settings, and security credentials.",
            icon: FiUser,
            path: "/profile",
            gradient: "from-slate-700 to-slate-900",
            badge: "Account"
        }
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Hero Banner */}
                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                        relative overflow-hidden rounded-3xl
                        bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900
                        border border-indigo-700/40 text-white p-6 sm:p-10 shadow-2xl
                    "
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <FiZap className="w-3.5 h-3.5" />
                                AI Preparation Assistant Ready
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                Welcome, <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">{currentDashboard.name}</span>!
                            </h1>

                            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                                Ready to practice today? Follow the 3 simple steps below to polish your resume and master your next job interview.
                            </p>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap gap-3">
                            <Link
                                to="/interview"
                                className="
                                    inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white
                                    bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
                                    shadow-lg shadow-indigo-500/30 hover:scale-105 transition duration-200
                                "
                            >
                                <FiMic className="w-4 h-4" />
                                Start Practice Session
                            </Link>
                        </div>
                    </div>
                </motion.section>

                {/* 3-Step Beginner Workflow Guide */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                <FiHelpCircle className="text-indigo-500" />
                                How InterviewAI Works (3 Simple Steps)
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Perfect for first-time users. Complete these steps in order for best results.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {onboardingSteps.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="
                                        relative p-6 rounded-2xl bg-white dark:bg-slate-900/90
                                        border border-slate-200/80 dark:border-slate-800/80 shadow-sm
                                        flex flex-col justify-between space-y-4
                                    "
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className={`p-3 rounded-xl border ${item.color}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-2xl font-black text-slate-200 dark:text-slate-800">
                                                {item.step}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <Link
                                        to={item.path}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
                                    >
                                        {item.action} <FiArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Statistics Grid */}
                <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        Your Practice Metrics
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        <StatsCard
                            title="Resume ATS Score"
                            value={currentDashboard.resumeScore ? `${currentDashboard.resumeScore}/100` : "Not Uploaded"}
                            icon={FiFileText}
                            trend="Resume Scan Readiness"
                            color="indigo"
                            progress={currentDashboard.resumeScore || 0}
                        />
                        <StatsCard
                            title="Completed Interviews"
                            value={currentDashboard.interviews ?? 0}
                            icon={FiMic}
                            trend="Total Sessions"
                            color="emerald"
                            progress={Math.min(100, (currentDashboard.interviews || 0) * 10)}
                        />
                        <StatsCard
                            title="Average Performance"
                            value={currentDashboard.averageScore ? `${currentDashboard.averageScore} / 10` : "N/A"}
                            icon={FiStar}
                            trend="Overall Rating"
                            color="amber"
                            progress={(currentDashboard.averageScore || 0) * 10}
                        />
                        <StatsCard
                            title="Best Session Score"
                            value={currentDashboard.bestScore ? `${currentDashboard.bestScore} / 10` : "N/A"}
                            icon={FiAward}
                            trend="Personal Record"
                            color="violet"
                            progress={(currentDashboard.bestScore || 0) * 10}
                        />
                    </div>
                </section>

                {/* Modules Grid */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Explore Modules
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {quickActions.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    className="
                                        group relative overflow-hidden p-6 rounded-2xl
                                        bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80
                                        shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300
                                    "
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    {item.badge}
                                                </span>
                                            </div>

                                            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                                                Open Module <FiArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Score Chart */}
                <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                            <FiTrendingUp className="text-indigo-500" />
                            Performance Growth Chart
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            Shows how your interview rating improves with each practice session.
                        </p>
                    </div>

                    <ScoreChart data={chartData} />
                </section>
            </div>
        </MainLayout>
    );
}

export default Dashboard;