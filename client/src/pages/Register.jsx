import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiCpu, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiArrowRight } from "react-icons/fi";

import api from "../api/axios";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/register", { name, email, password });

            setSuccess("Account created successfully! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            console.error("Register Error:", err);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
            {/* Background Ambient Blobs */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl pointer-events-none animate-float" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-10 relative z-10"
            >
                {/* Header Brand */}
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center justify-center gap-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                            <FiCpu className="w-7 h-7" />
                        </div>
                    </Link>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
                        Create Account
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Join InterviewAI to level up your career readiness
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium"
                    >
                        <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Success Banner */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium"
                    >
                        <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>{success}</span>
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                <FiUser className="w-5 h-5" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Alex Morgan"
                                autoComplete="name"
                                className="
                                    w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium
                                    bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500
                                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    transition-all duration-200
                                "
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@domain.com"
                                autoComplete="email"
                                className="
                                    w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium
                                    bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500
                                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    transition-all duration-200
                                "
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                <FiLock className="w-5 h-5" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 6 characters"
                                autoComplete="new-password"
                                className="
                                    w-full pl-11 pr-11 py-3 rounded-xl text-sm font-medium
                                    bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500
                                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    transition-all duration-200
                                "
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                            >
                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                <FiLock className="w-5 h-5" />
                            </div>
                            <input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter password"
                                autoComplete="new-password"
                                className="
                                    w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium
                                    bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500
                                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    transition-all duration-200
                                "
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl font-bold text-sm text-white
                            bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95
                            disabled:opacity-50 shadow-lg shadow-purple-500/25 transition-all duration-200 cursor-pointer
                        "
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Creating Account...
                            </span>
                        ) : (
                            <>
                                Create Account
                                <FiArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Switch */}
                <p className="mt-6 text-center text-xs font-medium text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold text-purple-400 hover:text-purple-300 hover:underline">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Register;