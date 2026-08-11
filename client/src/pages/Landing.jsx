import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiCpu,
    FiFileText,
    FiMic,
    FiAward,
    FiTrendingUp,
    FiZap,
    FiArrowRight,
    FiShield,
    FiCheckCircle
} from "react-icons/fi";

function Landing() {
    const steps = [
        {
            number: "01",
            title: "Upload Resume",
            desc: "Instantly review your PDF and surface ATS issues before you apply.",
            icon: FiFileText,
            accent: "bg-[#e8f0ff] text-[#1f5eff]"
        },
        {
            number: "02",
            title: "Practice Interview",
            desc: "Generate task-based AI questions and answer with voice or text.",
            icon: FiMic,
            accent: "bg-[#eef2ff] text-[#4f46e5]"
        },
        {
            number: "03",
            title: "Get Feedback",
            desc: "Receive clear scoring, insights, and a polished summary to improve.",
            icon: FiAward,
            accent: "bg-[#edfdf7] text-[#15803d]"
        }
    ];

    const features = [
        {
            icon: FiFileText,
            title: "ATS Review",
            desc: "Scan documents and find the exact gaps employers search for.",
            accent: "bg-[#e8f0ff] text-[#1f5eff]"
        },
        {
            icon: FiMic,
            title: "Mock Interviews",
            desc: "Run real conversations with structured prompts and live audio input.",
            accent: "bg-[#eef2ff] text-[#4f46e5]"
        },
        {
            icon: FiAward,
            title: "AI Scorecards",
            desc: "Understand where you perform well and where to sharpen your answers.",
            accent: "bg-[#edfdf7] text-[#15803d]"
        },
        {
            icon: FiTrendingUp,
            title: "Progress Tracking",
            desc: "Review your growth over multiple practice sessions and reports.",
            accent: "bg-[#fff7ed] text-[#f59e0b]"
        }
    ];

    const stats = [
        { number: "1200+", label: "Resumes Reviewed" },
        { number: "3500+", label: "Interviews Practiced" },
        { number: "500+", label: "Active Candidates" },
        { number: "98%", label: "Improvement Focus" }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[var(--border)]">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-sm">
                        <FiCpu className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-[var(--text)]">
                        Interview<span className="text-[var(--primary)]">AI</span>
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="button-secondary px-4 py-2.5 text-sm">
                        Sign In
                    </Link>
                    <Link to="/register" className="button-primary px-4 py-2.5 text-sm">
                        Get Started
                    </Link>
                </div>
            </header>

            <main>
                <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-left">
                        <div className="pill mb-7">
                            <FiZap className="w-3.5 h-3.5" />
                            Smart Interview Preparation
                        </div>

                        <h1 className="page-title max-w-4xl">
                            Prepare for interviews with a smarter, calmer workflow.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base text-[var(--text-muted)] leading-relaxed">
                            Analyze your resume, practice with AI-generated questions, and improve your confidence with practical, actionable feedback.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
                            <Link to="/register" className="button-primary w-full sm:w-auto px-6 py-3.5">
                                Start Free Practice
                                <FiArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/login" className="button-secondary w-full sm:w-auto px-6 py-3.5">
                                <FiShield className="w-4 h-4 text-[var(--primary)]" />
                                Sign In
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <section className="max-w-6xl mx-auto px-6 py-6">
                    <div className="grid md:grid-cols-3 gap-5">
                        {steps.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="surface-card p-6 text-left">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 rounded-xl ${item.accent} flex items-center justify-center`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-2xl font-black text-[var(--text-muted)]">{item.number}</span>
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold text-[var(--text)]">{item.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 surface-card p-5">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center rounded-xl bg-[var(--panel-soft)] border border-[var(--border)] p-4">
                                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">{stat.number}</div>
                                <div className="mt-1 text-[11px] sm:text-xs font-medium text-[var(--text-muted)]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 py-10 pb-16">
                    <div className="mb-8 text-left">
                        <h2 className="section-title">Built for focused job-prep</h2>
                        <p className="mt-2 text-[var(--text-muted)]">Everything you need in one simple workflow.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div key={idx} whileHover={{ y: -2 }} className="surface-card p-5 text-left">
                                    <div className={`w-12 h-12 rounded-xl ${feat.accent} flex items-center justify-center mb-4`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--text)]">{feat.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{feat.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>

            <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--text-muted)]">
                <div className="flex items-center justify-center gap-2 font-bold text-base text-[var(--text)] mb-2">
                    <FiCpu className="text-[var(--primary)]" /> InterviewAI
                </div>
                © 2026 InterviewAI Platform
            </footer>
        </div>
    );
}

export default Landing;