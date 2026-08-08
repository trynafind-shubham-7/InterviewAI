import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {

            setError(
                "Please enter your email and password."
            );

            return;

        }

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            const data = response.data;

            const token =
                data.token ||
                data.accessToken;

            if (!token) {

                throw new Error(
                    "Login response did not contain a token."
                );

            }

            localStorage.setItem(
                "token",
                token
            );

            if (data.user?.name) {

                localStorage.setItem(
                    "name",
                    data.user.name
                );

            }

            if (data.user?.email) {

                localStorage.setItem(
                    "email",
                    data.user.email
                );

            }

            if (login) {

                login(
                    token,
                    data.user
                );

            }

            navigate("/dashboard");

        }

        catch (err) {

            console.error(
                "Login Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Invalid email or password."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-blue-600
                via-indigo-600
                to-purple-700
                flex
                items-center
                justify-center
                p-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    dark:bg-gray-800
                    rounded-3xl
                    shadow-2xl
                    p-6
                    sm:p-8
                "
            >

                {/* LOGO */}

                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-100
                            dark:bg-blue-900/40
                            flex
                            items-center
                            justify-center
                            text-4xl
                        "
                    >
                        🤖
                    </div>

                    <h1
                        className="
                            mt-5
                            text-3xl
                            font-extrabold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        InterviewAI
                    </h1>

                    <p
                        className="
                            mt-2
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Sign in to continue your
                        interview preparation.
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div
                        className="
                            mt-6
                            bg-red-50
                            dark:bg-red-900/20
                            border
                            border-red-200
                            dark:border-red-800
                            text-red-700
                            dark:text-red-300
                            rounded-xl
                            p-4
                            text-sm
                        "
                    >
                        ⚠️ {error}
                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >

                    {/* EMAIL */}

                    <div>

                        <label
                            htmlFor="email"
                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                                mb-2
                            "
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                dark:border-gray-600
                                bg-white
                                dark:bg-gray-900
                                text-gray-900
                                dark:text-white
                                placeholder-gray-400
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-blue-500
                            "
                        />

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <label
                            htmlFor="password"
                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                                mb-2
                            "
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                dark:border-gray-600
                                bg-white
                                dark:bg-gray-900
                                text-gray-900
                                dark:text-white
                                placeholder-gray-400
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-blue-500
                            "
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-blue-400
                            text-white
                            py-3
                            rounded-xl
                            font-bold
                            shadow-lg
                            hover:shadow-xl
                            transition
                        "
                    >

                        {loading
                            ? "Signing in..."
                            : "🔐 Sign In"}

                    </button>

                </form>


                {/* REGISTER */}

                <p
                    className="
                        mt-7
                        text-center
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                    "
                >
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                            font-bold
                            text-blue-600
                            dark:text-blue-400
                            hover:underline
                        "
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;