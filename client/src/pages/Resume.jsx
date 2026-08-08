import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

function Resume() {

    const [file, setFile] = useState(null);

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const handleFileChange = (event) => {

        const selectedFile =
            event.target.files?.[0];

        setFile(selectedFile || null);

        setAnalysis(null);

        setError("");

        setSuccess("");

    };


    const uploadResume = async () => {

        if (!file) {

            setError(
                "Please select a PDF resume first."
            );

            return;

        }


        if (
            file.type !==
            "application/pdf"
        ) {

            setError(
                "Please upload a PDF file."
            );

            return;

        }


        try {

            setLoading(true);

            setError("");

            setSuccess("");

            const token =
                localStorage.getItem("token");

            const formData =
                new FormData();

            formData.append(
                "resume",
                file
            );


            const response =
                await api.post(

                    "/resume/upload",

                    formData,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            setAnalysis(
                response.data.analysis
            );


            setSuccess(
                "Resume analyzed successfully."
            );

        }

        catch (err) {

            console.error(
                "Resume Upload Error:",
                err
            );


            setError(

                err.response?.data?.message ||

                "Failed to analyze resume."

            );

        }

        finally {

            setLoading(false);

        }

    };


    const getScoreColor = (score) => {

        if (score >= 80) {

            return "text-green-600 dark:text-green-400";

        }

        if (score >= 60) {

            return "text-yellow-600 dark:text-yellow-400";

        }

        return "text-red-600 dark:text-red-400";

    };


    return (

        <MainLayout>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600
                    text-white
                    rounded-3xl
                    p-6
                    sm:p-8
                    lg:p-10
                    shadow-2xl
                    mb-8
                "
            >

                <h1
                    className="
                        text-3xl
                        sm:text-4xl
                        font-extrabold
                    "
                >
                    📄 Resume Analyzer
                </h1>

                <p
                    className="
                        mt-3
                        text-blue-100
                        text-sm
                        sm:text-base
                        max-w-2xl
                    "
                >
                    Upload your resume and let AI
                    analyze your strengths, missing
                    skills and areas for improvement.
                </p>

            </div>


            {/* ==================================================
                UPLOAD CARD
            ================================================== */}

            <div
                className="
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-3xl
                    shadow-sm
                    p-6
                    sm:p-8
                "
            >

                <div
                    className="
                        border-2
                        border-dashed
                        border-gray-300
                        dark:border-gray-600
                        rounded-2xl
                        p-6
                        sm:p-10
                        text-center
                        hover:border-blue-500
                        dark:hover:border-blue-400
                        transition
                    "
                >

                    <div className="text-5xl">
                        📄
                    </div>

                    <h2
                        className="
                            mt-4
                            text-2xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        Upload Your Resume
                    </h2>

                    <p
                        className="
                            mt-2
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        PDF files only
                    </p>


                    <label
                        className="
                            inline-flex
                            items-center
                            justify-center
                            mt-6
                            px-6
                            py-3
                            bg-gray-100
                            dark:bg-gray-700
                            hover:bg-gray-200
                            dark:hover:bg-gray-600
                            text-gray-800
                            dark:text-gray-100
                            rounded-xl
                            font-semibold
                            cursor-pointer
                            transition
                        "
                    >

                        Choose PDF

                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={
                                handleFileChange
                            }
                            className="hidden"
                        />

                    </label>


                    {file && (

                        <div
                            className="
                                mt-5
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                bg-blue-50
                                dark:bg-blue-900/30
                                text-blue-700
                                dark:text-blue-300
                                rounded-xl
                                text-sm
                                font-medium
                            "
                        >

                            📎 {file.name}

                        </div>

                    )}


                    <div>

                        <button
                            onClick={
                                uploadResume
                            }
                            disabled={
                                loading ||
                                !file
                            }
                            className="
                                mt-6
                                w-full
                                sm:w-auto
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:bg-blue-300
                                dark:disabled:bg-blue-900
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                font-semibold
                                shadow-md
                                hover:shadow-lg
                                transition
                            "
                        >

                            {loading
                                ? "🤖 Analyzing..."
                                : "✨ Analyze Resume"}

                        </button>

                    </div>

                </div>

            </div>


            {/* ==================================================
                SUCCESS
            ================================================== */}

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
                        rounded-2xl
                        p-4
                        font-medium
                    "
                >

                    ✅ {success}

                </div>

            )}


            {/* ==================================================
                ERROR
            ================================================== */}

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
                        rounded-2xl
                        p-4
                        font-medium
                    "
                >

                    ⚠️ {error}

                </div>

            )}


            {/* ==================================================
                ANALYSIS
            ================================================== */}

            {analysis && (

                <div className="mt-8 space-y-6">

                    {/* SCORE */}

                    <div
                        className="
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-sm
                            p-6
                            sm:p-8
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-5
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-gray-500
                                        dark:text-gray-400
                                    "
                                >
                                    ATS Resume Score
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-4xl
                                        font-extrabold
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    {analysis.score}/100
                                </h2>

                            </div>


                            <div
                                className={`
                                    text-5xl
                                    sm:text-6xl
                                    font-extrabold
                                    ${getScoreColor(
                                        Number(
                                            analysis.score
                                        )
                                    )}
                                `}
                            >

                                {analysis.score}

                            </div>

                        </div>

                    </div>


                    {/* SUMMARY */}

                    <div
                        className="
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-sm
                            p-6
                            sm:p-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            📝 AI Summary
                        </h2>

                        <p
                            className="
                                mt-4
                                text-gray-700
                                dark:text-gray-300
                                leading-7
                            "
                        >
                            {analysis.summary ||
                                "No summary available."}
                        </p>

                    </div>


                    {/* STRENGTHS */}

                    <div
                        className="
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-sm
                            p-6
                            sm:p-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            💪 Strengths
                        </h2>

                        <div className="mt-5 space-y-3">

                            {(analysis.strengths ||
                                []).map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                            bg-green-50
                                            dark:bg-green-900/20
                                            border
                                            border-green-100
                                            dark:border-green-900
                                            rounded-xl
                                            p-4
                                        "
                                    >

                                        <span>
                                            ✅
                                        </span>

                                        <p
                                            className="
                                                text-gray-700
                                                dark:text-gray-300
                                            "
                                        >
                                            {item}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* MISSING SKILLS */}

                    <div
                        className="
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-sm
                            p-6
                            sm:p-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            🎯 Missing Skills
                        </h2>

                        <div
                            className="
                                mt-5
                                flex
                                flex-wrap
                                gap-3
                            "
                        >

                            {(analysis.missingSkills ||
                                []).map(
                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="
                                            px-4
                                            py-2
                                            rounded-full
                                            bg-yellow-50
                                            dark:bg-yellow-900/20
                                            border
                                            border-yellow-200
                                            dark:border-yellow-800
                                            text-yellow-700
                                            dark:text-yellow-300
                                            font-medium
                                            text-sm
                                        "
                                    >
                                        {skill}
                                    </span>

                                )
                            )}

                        </div>

                    </div>


                    {/* IMPROVEMENTS */}

                    <div
                        className="
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-sm
                            p-6
                            sm:p-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            💡 Improvements
                        </h2>

                        <div className="mt-5 space-y-3">

                            {(analysis.improvements ||
                                []).map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                            bg-blue-50
                                            dark:bg-blue-900/20
                                            border
                                            border-blue-100
                                            dark:border-blue-900
                                            rounded-xl
                                            p-4
                                        "
                                    >

                                        <span>
                                            💡
                                        </span>

                                        <p
                                            className="
                                                text-gray-700
                                                dark:text-gray-300
                                            "
                                        >
                                            {item}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>

            )}

        </MainLayout>

    );

}

export default Resume;