import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiMail,
    FiLock,
    FiCpu,
    FiEye,
    FiEyeOff,
    FiAlertCircle,
    FiArrowRight
} from "react-icons/fi";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate =
        useNavigate();

    const { login } =
        useAuth();

    const [email, setEmail] =
        useState(
            localStorage.getItem(
                "rememberedEmail"
            ) || ""
        );

    const [password, setPassword] =
        useState("");

    const [rememberEmail, setRememberEmail] =
        useState(
            Boolean(
                localStorage.getItem(
                    "rememberedEmail"
                )
            )
        );

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleSubmit =
        async (event) => {

        event.preventDefault();

        setError("");

        if (
            !email.trim() ||
            !password.trim()
        ) {

            setError(
                "Please enter your email and password."
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email:
                            email.trim()
                                .toLowerCase(),

                        password
                    }
                );

            const data =
                response.data;

            const token =
                data.token ||
                data.accessToken;

            if (!token) {
                throw new Error(
                    "Login response did not contain a token."
                );
            }

            if (rememberEmail) {

                localStorage.setItem(
                    "rememberedEmail",
                    email.trim().toLowerCase()
                );

            } else {

                localStorage.removeItem(
                    "rememberedEmail"
                );
            }

            login(
                token,
                data.user
            );

            navigate(
                "/dashboard"
            );

        } catch (err) {

            console.error(
                "Login Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 sm:p-6">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="w-full max-w-md surface-card p-6 sm:p-8"
            >

                <div className="text-center">

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center"
                    >

                        <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center">

                            <FiCpu />

                        </div>

                    </Link>

                    <h1 className="mt-5 text-3xl font-extrabold text-[var(--text)]">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                        Sign in to access your interview workspace
                    </p>

                </div>


                {error && (

                    <div className="mt-6 flex items-center gap-3 p-3.5 rounded-xl border border-red-200 bg-red-50 text-red-700">

                        <FiAlertCircle />

                        <span className="text-sm font-medium">
                            {error}
                        </span>

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label
                            htmlFor="email"
                            className="block text-xs font-bold text-[var(--text-muted)] mb-2"
                        >
                            Email Address
                        </label>

                        <div className="relative">

                            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                autoComplete="username"
                                placeholder="name@domain.com"
                                className="input-shell pl-10 pr-3 py-3 text-sm"
                            />

                        </div>

                    </div>


                    <div>

                        <label
                            htmlFor="password"
                            className="block text-xs font-bold text-[var(--text-muted)] mb-2"
                        >
                            Password
                        </label>

                        <div className="relative">

                            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="input-shell pl-10 pr-10 py-3 text-sm"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            >

                                {showPassword ? (
                                    <FiEyeOff />
                                ) : (
                                    <FiEye />
                                )}

                            </button>

                        </div>

                    </div>


                    <label className="flex items-center gap-2 text-sm text-[var(--text-muted)] cursor-pointer">

                        <input
                            type="checkbox"
                            checked={rememberEmail}
                            onChange={(e) =>
                                setRememberEmail(
                                    e.target.checked
                                )
                            }
                        />

                        Remember my email

                    </label>


                    <button
                        type="submit"
                        disabled={loading}
                        className="button-primary w-full py-3.5"
                    >

                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            <>
                                Sign In
                                <FiArrowRight />
                            </>
                        )}

                    </button>

                </form>


                <p className="mt-8 text-center text-xs text-[var(--text-muted)]">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-bold text-[var(--primary)]"
                    >
                        Create Account
                    </Link>

                </p>

            </motion.div>

        </div>
    );
}

export default Login;