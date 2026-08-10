import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiCpu, FiEye, FiEyeOff, FiAlertCircle, FiArrowRight } from "react-icons/fi";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/auth/login", { email, password });
            const data = response.data;
            const token = data.token || data.accessToken;

            if (!token) {
                throw new Error("Login response did not contain a token.");
            }

            localStorage.setItem("token", token);
            if (data.user?.name) localStorage.setItem("name", data.user.name);
            if (data.user?.email) localStorage.setItem("email", data.user.email);

            if (login) {
                login(token, data.user);
            }

            navigate("/dashboard");
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || err.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-md surface-card p-6 sm:p-8 relative"
            >
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center justify-center">
                        <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-sm">
                            <FiCpu className="w-6 h-6" />
                        </div>
                    </Link>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--text)]">Welcome back</h1>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">Sign in to access your interview workspace</p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 p-3.5 rounded-xl border border-[#fecaca] bg-[#fff1f2] text-[#b91c1c] dark:border-[#7f1d1d] dark:bg-[#2a0d12] dark:text-[#fca5a5]">
                        <FiAlertCircle className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
                                <FiMail className="w-4 h-4" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.com"
                                autoComplete="email"
                                className="input-shell pl-10 pr-3 py-3 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
                                <FiLock className="w-4 h-4" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="input-shell pl-10 pr-10 py-3 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--text-muted)]"
                            >
                                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="button-primary w-full py-3.5">
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Authenticating...
                            </span>
                        ) : (
                            <>
                                Sign In
                                <FiArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-bold text-[var(--primary)] hover:underline">
                        Create Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;