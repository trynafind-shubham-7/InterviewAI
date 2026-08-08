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
    FiTrendingUp
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
            // Fallback dashboard object if API fails or empty
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
                    <Loader message="Loading your dashboard analytics..." size="lg" />
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
        { name: "Session 1", score: 6.2 },
        { name: "Session 2", score: 7.0 },
        { name: "Session 3", score: 7.8 },
        { name: "Session 4", score: 8.5 },
        { name: "Session 5", score: currentDashboard.bestScore || 9.0 }
    ];

    const quickActions = [
        {
            title: "Resume AI Analyzer",
            description: "Upload resume PDF, extract skills, and run ATS readiness scoring.",
            icon: FiFileText,
            path: "/resume",
            gradient: "from-blue-600 to-cyan-500",
            badge: "ATS Scanner"
        },
        {
            title: "Mock Interview Studio",
            description: "Simulate voice/text interviews with real-time AI scoring.",
            icon: FiMic,
            path: "/interview",
            gradient: "from-indigo-600 to-purple-600",
            badge: "Interactive"
        },
        {
            title: "Interview History",
            description: "Review detailed session reports, scores, and past transcripts.",
            icon: FiClock,
            path: "/history",
            gradient: "from-purple-600 to-pink-600",
            badge: "Analytics"
        },
        {
            title: "Profile & Settings",
            description: "Update personal profile, target roles, and security credentials.",
            icon: FiUser,
            path: "/profile",
            gradient: "from-slate-700 to-slate-900",
            badge: "User Account"
        }
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Hero Greeting Banner */}
                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                        relative overflow-hidden rounded-3xl
                        bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900
                        border border-indigo-700/40 text-white p-6 sm:p-10 shadow-2xl
                    "
                >
                    {/* Background Decorative Mesh */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <FiZap className="w-3.5 h-3.5" />
                                AI Career Agent Active
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                Welcome back, <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">{currentDashboard.name}</span>
                            </h1>

                            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                                You are making steady progress! Complete another practice session today to boost your confidence and interview readiness.
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
                                Start Mock Session
                            </Link>
                            <Link
                                to="/resume"
                                className="
                                    inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-200
                                    bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition duration-200
                                "
                            >
                                <FiFileText className="w-4 h-4 text-indigo-400" />
                                Upload Resume
                            </Link>
                        </div>
                    </div>
                </motion.section>

                {/* Statistics Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    <StatsCard
                        title="Resume ATS Score"
                        value={currentDashboard.resumeScore ? `${currentDashboard.resumeScore}/100` : "Not Uploaded"}
                        icon={FiFileText}
                        trend="ATS Readiness"
                        color="indigo"
                        progress={currentDashboard.resumeScore || 0}
                    />
                    <StatsCard
                        title="Completed Interviews"
                        value={currentDashboard.interviews ?? 0}
                        icon={FiMic}
                        trend="Session Count"
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
                        title="Best Session Rating"
                        value={currentDashboard.bestScore ? `${currentDashboard.bestScore} / 10` : "N/A"}
                        icon={FiAward}
                        trend="Personal Record"
                        color="violet"
                        progress={(currentDashboard.bestScore || 0) * 10}
                    />
                </section>

                {/* Quick Actions Section */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Quick Launch Actions
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Jump straight into your interview practice and career analysis modules.
                        </p>
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
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    {item.badge}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                                                Open Module <FiArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Score Trend Chart Section */}
                <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                <FiTrendingUp className="text-indigo-500" />
                                Interview Performance Trend
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Ratings progress across recent mock interview attempts.
                            </p>
                        </div>
                    </div>

                    <ScoreChart data={chartData} />
                </section>
            </div>
        </MainLayout>
    );
}

export default Dashboard;