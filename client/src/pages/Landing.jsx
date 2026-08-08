import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    FiCpu, 
    FiFileText, 
    FiMic, 
    FiAward, 
    FiTrendingUp, 
    FiZap, 
    FiCheckCircle, 
    FiArrowRight, 
    FiShield,
    FiHelpCircle
} from "react-icons/fi";

function Landing() {
    const steps = [
        {
            number: "01",
            title: "Upload PDF Resume",
            desc: "Extract text, scan keywords, and calculate your ATS compatibility score instantly.",
            icon: FiFileText,
            color: "from-blue-500 to-cyan-500"
        },
        {
            number: "02",
            title: "AI Question Generator",
            desc: "Receive customized technical and behavioral questions generated directly from your background.",
            icon: FiCpu,
            color: "from-indigo-500 to-purple-500"
        },
        {
            number: "03",
            title: "Voice Practice & Feedback",
            desc: "Speak your answers out loud, receive immediate scoring, and export a PDF performance sheet.",
            icon: FiMic,
            color: "from-purple-500 to-pink-500"
        }
    ];

    const features = [
        {
            icon: FiFileText,
            color: "from-blue-500 to-cyan-400",
            title: "ATS Resume Analyzer",
            desc: "Extract text, spot missing skills, and optimize your resume for top ATS software using AI."
        },
        {
            icon: FiMic,
            color: "from-indigo-500 to-purple-500",
            title: "Interactive Mock Studio",
            desc: "Simulate real-world technical and behavioral interviews with real-time speech recognition."
        },
        {
            icon: FiAward,
            color: "from-purple-500 to-pink-500",
            title: "Instant AI Feedback",
            desc: "Get granular scoring, confidence ratings, and constructive improvement recommendations."
        },
        {
            icon: FiTrendingUp,
            color: "from-pink-500 to-rose-500",
            title: "Performance Analytics",
            desc: "Track score progression, downloadable PDF reports, and historical practice metrics over time."
        }
    ];

    const stats = [
        { number: "1,200+", label: "Resumes Analyzed" },
        { number: "3,500+", label: "Mock Interviews" },
        { number: "500+", label: "Active Candidates" },
        { number: "98%", label: "Placement Success Rate" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
            {/* Ambient Animated Gradient Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-float" />
            <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "3s" }} />

            {/* Navigation Bar */}
            <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                        <FiCpu className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-300 bg-clip-text text-transparent">
                        Interview<span className="text-indigo-400">AI</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition"
                    >
                        Get Started Free
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-20 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8">
                        <FiZap className="w-4 h-4 text-indigo-400" />
                        Next-Gen AI Interview Platform
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
                        Ace Your Job Interview with{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                            Artificial Intelligence
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        The easiest way for job seekers to test their resume ATS scores, practice voice mock interviews, and receive personalized AI ratings.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-xl shadow-indigo-500/25 hover:scale-105 transition"
                        >
                            Start Practice Free
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition"
                        >
                            <FiShield className="w-5 h-5 text-indigo-400" />
                            Sign In to Account
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* How it Works in 3 Simple Steps */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        How It Works in 3 Easy Steps
                    </h2>
                    <p className="mt-3 text-slate-400 text-sm">
                        Designed to make career preparation effortless and intuitive for everyone.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-3xl font-black text-slate-800">
                                        {item.number}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Statistics Banner */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                {stat.number}
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                        Platform Highlights
                    </h2>
                    <p className="mt-4 text-slate-400 text-base">
                        Engineered to build maximum confidence before real interview panels.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -6 }}
                                className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between group"
                            >
                                <div>
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {feat.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {feat.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-10 border-t border-slate-800/80 text-center text-slate-500 text-sm">
                <div className="flex items-center justify-center gap-2 font-bold text-lg text-white mb-2">
                    <FiCpu className="text-indigo-400" /> InterviewAI
                </div>
                <p>© 2026 InterviewAI Platform. Professional AI Interview Preparation.</p>
            </footer>
        </div>
    );
}

export default Landing;