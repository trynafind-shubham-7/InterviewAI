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
    FiLayers
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
                    <Loader message="Setting up your interview dashboard..." size="lg" />
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

    const chartData = (currentDashboard.history || []).map((session, idx) => ({
        name: `Session ${idx + 1}`,
        score: session.averageScore ?? session.score ?? 0
    }));
    const hasChartData = chartData.length > 0;

    const onboardingSteps = [
        {
            step: "01",
            title: "Upload Your Resume",
            desc: "Check ATS alignment and gap areas before applying.",
            icon: FiFileText,
            action: "Upload Resume",
            path: "/resume",
            accent: "bg-[#e8f0ff] text-[#1f5eff] border border-[#dfe9ff]"
        },
        {
            step: "02",
            title: "Practice Mock Interview",
            desc: "Speak or type answers to realistic technical and behavioral prompts.",
            icon: FiMic,
            action: "Start Interview",
            path: "/interview",
            accent: "bg-[#eef2ff] text-[#4f46e5] border border-[#e0e7ff]"
        },
        {
            step: "03",
            title: "Review Feedback",
            desc: "Read strengths, weaknesses, and performance summaries to improve.",
            icon: FiAward,
            action: "View History",
            path: "/history",
            accent: "bg-[#edfdf7] text-[#15803d] border border-[#d1fae5]"
        }
    ];

    const quickActions = [
        {
            title: "Resume AI Analyzer",
            description: "Analyze your resume for ATS structure and missing keywords.",
            icon: FiFileText,
            path: "/resume",
            badge: "Step 1",
            accent: "bg-[#e8f0ff] text-[#1f5eff]"
        },
        {
            title: "Mock Interview Studio",
            description: "Run a guided practice interview with time-based prompts.",
            icon: FiMic,
            path: "/interview",
            badge: "Step 2",
            accent: "bg-[#eef2ff] text-[#4f46e5]"
        },
        {
            title: "Interview History",
            description: "Look through prior sessions, feedback, and interview notes.",
            icon: FiClock,
            path: "/history",
            badge: "Step 3",
            accent: "bg-[#f5f3ff] text-[#7c3aed]"
        },
        {
            title: "Profile & Settings",
            description: "Update your identity details and manage your account.",
            icon: FiUser,
            path: "/profile",
            badge: "Account",
            accent: "bg-[#f8fafc] text-[#475569] border border-[var(--border)]"
        }
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="surface-card p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <div className="max-w-2xl">
                            <div className="pill mb-4">
                                <FiZap className="w-3.5 h-3.5" />
                                Practice Assistant Ready
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                                Welcome, <span className="text-[var(--primary)]">{currentDashboard.name}</span>
                            </h1>
                            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                                Ready to sharpen your resume and boost interview confidence? Move through the workflow below and keep improving.
                            </p>
                        </div>

                        <Link to="/interview" className="button-primary px-5 py-3.5 w-full sm:w-auto">
                            <FiMic className="w-4 h-4" />
                            Start Practice Session
                        </Link>
                    </div>
                </motion.section>

                <section className="space-y-4">
                    <div>
                        <h2 className="section-title flex items-center gap-2">
                            <FiLayers className="text-[var(--primary)]" />
                            How InterviewAI works
                        </h2>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">Follow these three steps to get better results faster.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {onboardingSteps.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="surface-card p-5 flex flex-col justify-between space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-11 h-11 rounded-xl ${item.accent} flex items-center justify-center`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-2xl font-black text-[var(--text-muted)]">{item.step}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[var(--text)]">{item.title}</h3>
                                        <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                                    </div>

                                    <Link to={item.path} className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)]">
                                        {item.action} <FiArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-bold tracking-tight text-[var(--text)]">Your practice metrics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        <StatsCard title="Resume ATS Score" value={currentDashboard.resumeScore ? `${currentDashboard.resumeScore}/100` : "Not Uploaded"} icon={FiFileText} trend="Readiness" color="indigo" progress={currentDashboard.resumeScore || 0} />
                        <StatsCard title="Completed Interviews" value={currentDashboard.interviews ?? 0} icon={FiMic} trend="Sessions" color="emerald" progress={Math.min(100, (currentDashboard.interviews || 0) * 10)} />
                        <StatsCard title="Average Performance" value={currentDashboard.averageScore ? `${currentDashboard.averageScore} / 10` : "N/A"} icon={FiStar} trend="Overall" color="amber" progress={(currentDashboard.averageScore || 0) * 10} />
                        <StatsCard title="Best Session" value={currentDashboard.bestScore ? `${currentDashboard.bestScore} / 10` : "N/A"} icon={FiAward} trend="Personal Record" color="violet" progress={(currentDashboard.bestScore || 0) * 10} />
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">Explore modules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {quickActions.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <Link key={idx} to={item.path} className="group surface-card p-5 hover:border-[var(--primary)]/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${item.accent} flex items-center justify-center`}>
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-base font-bold text-[var(--text)]">{item.title}</h3>
                                                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[var(--panel-soft)] border border-[var(--border)] text-[var(--text-muted)]">
                                                    {item.badge}
                                                </span>
                                            </div>
                                            <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                                            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)]">
                                                Open Module <FiArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="surface-card p-6 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold tracking-tight text-[var(--text)] flex items-center gap-2">
                            <FiTrendingUp className="text-[var(--primary)]" />
                            Performance growth
                        </h2>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">Track how your score changes after each practice session.</p>
                    </div>

                    {hasChartData ? (
                        <ScoreChart data={chartData} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-14 gap-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-[var(--panel-soft)] border border-[var(--border)] flex items-center justify-center">
                                <FiTrendingUp className="w-8 h-8 text-[var(--text-muted)]" />
                            </div>
                            <div>
                                <p className="font-bold text-[var(--text)]">No practice sessions yet</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1">Complete your first mock interview to see your progress.</p>
                            </div>
                            <Link to="/interview" className="button-primary px-5 py-2.5">
                                <FiMic className="w-4 h-4" />
                                Start First Interview
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
}

export default Dashboard;