import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSuccess("");


        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {

            setError(
                "Please fill in all fields."
            );

            return;

        }


        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;

        }


        if (password.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;

        }


        try {

            setLoading(true);


            await api.post(

                "/auth/register",

                {
                    name,
                    email,
                    password
                }

            );


            setSuccess(
                "Account created successfully. Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/");

            }, 1200);

        }

        catch (err) {

            console.error(
                "Register Error:",
                err
            );

            setError(

                err.response?.data?.message ||

                "Registration failed. Please try again."

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
                            bg-purple-100
                            dark:bg-purple-900/40
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
                        Create Account
                    </h1>

                    <p
                        className="
                            mt-2
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Start improving your interview
                        skills with InterviewAI.
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


                {/* SUCCESS */}

                {success && (

                    <div
                        className="
                            mt-6
                            bg-green-50
                            dark:bg-green-900/20
                            border
                            border-green-200
                            dark:border-green-800
                            text-green-700
                            dark:text-green-300
                            rounded-xl
                            p-4
                            text-sm
                        "
                    >
                        ✅ {success}
                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >

                    {/* NAME */}

                    <div>

                        <label
                            htmlFor="name"
                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                                mb-2
                            "
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            placeholder="Your name"
                            autoComplete="name"
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


                    {/* EMAIL */}

                    <div>

                        <label
                            htmlFor="register-email"
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
                            id="register-email"
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
                            htmlFor="register-password"
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
                            id="register-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Minimum 6 characters"
                            autoComplete="new-password"
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


                    {/* CONFIRM PASSWORD */}

                    <div>

                        <label
                            htmlFor="confirm-password"
                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                                mb-2
                            "
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
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


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-purple-600
                            hover:bg-purple-700
                            disabled:bg-purple-400
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
                            ? "Creating Account..."
                            : "🚀 Create Account"}

                    </button>

                </form>


                {/* LOGIN */}

                <p
                    className="
                        mt-7
                        text-center
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                    "
                >
                    Already have an account?{" "}

                    <Link
                        to="/"
                        className="
                            font-bold
                            text-blue-600
                            dark:text-blue-400
                            hover:underline
                        "
                    >
                        Sign In
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;