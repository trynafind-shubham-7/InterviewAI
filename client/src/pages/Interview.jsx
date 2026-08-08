import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";

function Interview() {

    const navigate = useNavigate();

    const [questions, setQuestions] =
        useState(null);

    const [allQuestions, setAllQuestions] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState([]);

    const [answer, setAnswer] =
        useState("");

    const [evaluation, setEvaluation] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [evaluating, setEvaluating] =
        useState(false);

    const [finishing, setFinishing] =
        useState(false);

    const [error, setError] =
        useState("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {

        return (

            <MainLayout>

                <div
                    className="
                        bg-red-50
                        dark:bg-red-900/20
                        border
                        border-red-200
                        dark:border-red-800
                        rounded-2xl
                        p-6
                    "
                >

                    <h1
                        className="
                            text-2xl
                            font-bold
                            text-red-700
                            dark:text-red-300
                        "
                    >
                        Speech Recognition is not
                        supported in this browser.
                    </h1>

                    <p
                        className="
                            mt-2
                            text-red-600
                            dark:text-red-400
                        "
                    >
                        You can still type your answers
                        manually if your browser allows
                        the interview page to load.
                    </p>

                </div>

            </MainLayout>

        );

    }


    const generateQuestions = async () => {

        try {

            setLoading(true);

            setError("");

            setEvaluation(null);

            const token =
                localStorage.getItem("token");

            const res = await api.post(

                "/interview/generate",

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            const generated =
                res.data.questions;


            const all = [

                ...(generated.easy || []),

                ...(generated.medium || []),

                ...(generated.hard || [])

            ];


            if (all.length === 0) {

                throw new Error(
                    "No interview questions were generated."
                );

            }


            setQuestions(generated);

            setAllQuestions(all);

            setCurrentQuestion(0);

            setAnswers([]);

            setAnswer("");

            resetTranscript();

        }

        catch (err) {

            console.error(
                "Interview Generation Error:",
                err
            );

            setError(

                err.response?.data?.message ||

                err.message ||

                "Failed to generate interview questions."

            );

        }

        finally {

            setLoading(false);

        }

    };


    const evaluateAnswer = async () => {

        if (!answer.trim()) {

            setError(
                "Please enter an answer before evaluating."
            );

            return;

        }


        try {

            setEvaluating(true);

            setError("");

            const token =
                localStorage.getItem("token");


            const res = await api.post(

                "/evaluation",

                {
                    question:
                        allQuestions[
                            currentQuestion
                        ],

                    answer
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            setEvaluation(
                res.data.evaluation
            );

        }

        catch (err) {

            console.error(
                "Evaluation Error:",
                err
            );

            setError(

                err.response?.data?.message ||

                "Evaluation failed."

            );

        }

        finally {

            setEvaluating(false);

        }

    };


    const saveCurrentAnswer = () => {

        const updatedAnswers =
            [...answers];

        updatedAnswers[
            currentQuestion
        ] = answer;

        return updatedAnswers;

    };


    const goToPrevious = () => {

        const updatedAnswers =
            saveCurrentAnswer();

        const previous =
            currentQuestion - 1;

        setAnswers(updatedAnswers);

        setCurrentQuestion(previous);

        setAnswer(
            updatedAnswers[previous] || ""
        );

        setEvaluation(null);

        setError("");

        resetTranscript();

    };


    const goToNext = () => {

        const updatedAnswers =
            saveCurrentAnswer();

        const next =
            currentQuestion + 1;

        setAnswers(updatedAnswers);

        setCurrentQuestion(next);

        setAnswer(
            updatedAnswers[next] || ""
        );

        setEvaluation(null);

        setError("");

        resetTranscript();

    };


    const finishInterview = async () => {

        const updatedAnswers =
            saveCurrentAnswer();


        try {

            setFinishing(true);

            setError("");

            const token =
                localStorage.getItem("token");


            const reportRes =
                await api.post(

                    "/report",

                    {
                        questions:
                            allQuestions,

                        answers:
                            updatedAnswers
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );


            navigate(
                "/report",
                {
                    state: {

                        report:
                            reportRes.data.report,

                        userName:
                            localStorage.getItem(
                                "name"
                            ) ||
                            "Candidate"

                    }
                }
            );

        }

        catch (err) {

            console.error(
                "Report Error:",
                err
            );

            setError(

                err.response?.data?.message ||

                "Failed to generate interview report."

            );

        }

        finally {

            setFinishing(false);

        }

    };


    const progress =
        allQuestions.length > 0

            ? (
                ((currentQuestion + 1) /
                    allQuestions.length) *
                100
            )

            : 0;


    return (

        <MainLayout>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    bg-gradient-to-r
                    from-purple-600
                    via-indigo-600
                    to-blue-600
                    text-white
                    rounded-3xl
                    p-6
                    sm:p-8
                    lg:p-10
                    shadow-2xl
                    mb-8
                "
            >

                <p
                    className="
                        text-purple-100
                        text-sm
                        font-medium
                    "
                >
                    InterviewAI
                </p>

                <h1
                    className="
                        text-3xl
                        sm:text-4xl
                        font-extrabold
                        mt-1
                    "
                >
                    🎤 AI Mock Interview
                </h1>

                <p
                    className="
                        mt-3
                        text-purple-100
                        text-sm
                        sm:text-base
                    "
                >
                    Practice with AI-generated questions
                    based on your resume.
                </p>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div
                    className="
                        mb-6
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
                GENERATE BUTTON
            ================================================== */}

            {!questions && (

                <div
                    className="
                        bg-white
                        dark:bg-gray-800
                        border
                        border-gray-200
                        dark:border-gray-700
                        rounded-3xl
                        shadow-sm
                        p-8
                        sm:p-12
                        text-center
                    "
                >

                    <div className="text-6xl">
                        🤖
                    </div>

                    <h2
                        className="
                            mt-5
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        Ready for your interview?
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-xl
                            mx-auto
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        We'll generate personalized
                        technical and behavioral questions
                        based on your uploaded resume.
                    </p>

                    <button
                        onClick={
                            generateQuestions
                        }
                        disabled={loading}
                        className="
                            mt-7
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-blue-400
                            text-white
                            px-8
                            py-4
                            rounded-xl
                            font-bold
                            shadow-lg
                            hover:shadow-xl
                            transition
                        "
                    >

                        {loading
                            ? "🤖 Generating..."
                            : "🚀 Start AI Interview"}

                    </button>

                </div>

            )}


            {/* ==================================================
                INTERVIEW
            ================================================== */}

            {questions &&
                allQuestions.length > 0 && (

                    <div className="space-y-6">

                        {/* PROGRESS */}

                        <div
                            className="
                                bg-white
                                dark:bg-gray-800
                                border
                                border-gray-200
                                dark:border-gray-700
                                rounded-2xl
                                p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    mb-3
                                "
                            >

                                <p
                                    className="
                                        font-semibold
                                        text-gray-700
                                        dark:text-gray-200
                                    "
                                >
                                    Question{" "}
                                    {currentQuestion + 1}{" "}
                                    of{" "}
                                    {allQuestions.length}
                                </p>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-blue-600
                                        dark:text-blue-400
                                    "
                                >
                                    {Math.round(progress)}%
                                </p>

                            </div>

                            <div
                                className="
                                    w-full
                                    bg-gray-200
                                    dark:bg-gray-700
                                    rounded-full
                                    h-3
                                    overflow-hidden
                                "
                            >

                                <div
                                    className="
                                        bg-gradient-to-r
                                        from-blue-500
                                        to-purple-600
                                        h-3
                                        rounded-full
                                        transition-all
                                        duration-500
                                    "
                                    style={{
                                        width:
                                            `${progress}%`
                                    }}
                                />

                            </div>

                        </div>


                        {/* QUESTION */}

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

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-blue-600
                                    dark:text-blue-400
                                "
                            >
                                Question{" "}
                                {currentQuestion + 1}
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    leading-8
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                {
                                    allQuestions[
                                        currentQuestion
                                    ]
                                }
                            </h2>

                        </div>


                        {/* ANSWER */}

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

                            <label
                                className="
                                    block
                                    text-lg
                                    font-bold
                                    text-gray-900
                                    dark:text-white
                                    mb-3
                                "
                            >
                                Your Answer
                            </label>

                            <textarea
                                rows={7}
                                value={
                                    answer
                                }
                                onChange={(event) =>
                                    setAnswer(
                                        event.target.value
                                    )
                                }
                                placeholder="Type your answer here..."
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    dark:border-gray-600
                                    rounded-2xl
                                    p-4
                                    bg-white
                                    dark:bg-gray-900
                                    text-gray-900
                                    dark:text-white
                                    placeholder-gray-400
                                    resize-y
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                "
                            />


                            {/* SPEECH BUTTONS */}

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-3
                                    mt-4
                                "
                            >

                                <button
                                    onClick={() => {

                                        resetTranscript();

                                        SpeechRecognition.startListening(
                                            {
                                                continuous:
                                                    true,

                                                language:
                                                    "en-US"
                                            }
                                        );

                                    }}
                                    className="
                                        bg-red-500
                                        hover:bg-red-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        font-semibold
                                        transition
                                    "
                                >
                                    🎙 Start
                                </button>


                                <button
                                    onClick={() => {

                                        SpeechRecognition.stopListening();

                                        if (
                                            transcript
                                        ) {

                                            setAnswer(
                                                transcript
                                            );

                                        }

                                    }}
                                    className="
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        font-semibold
                                        transition
                                    "
                                >
                                    ⏹ Stop
                                </button>


                                <button
                                    onClick={() => {

                                        SpeechRecognition.stopListening();

                                        resetTranscript();

                                        setAnswer("");

                                    }}
                                    className="
                                        bg-gray-600
                                        hover:bg-gray-700
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        font-semibold
                                        transition
                                    "
                                >
                                    🗑 Clear
                                </button>

                            </div>


                            <p
                                className="
                                    mt-3
                                    text-sm
                                    font-semibold
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                {listening
                                    ? "🎙 Listening..."
                                    : "🎤 Microphone Stopped"}
                            </p>


                            {/* EVALUATE */}

                            <button
                                onClick={
                                    evaluateAnswer
                                }
                                disabled={
                                    evaluating ||
                                    !answer.trim()
                                }
                                className="
                                    mt-6
                                    w-full
                                    sm:w-auto
                                    bg-green-700
                                    hover:bg-green-800
                                    disabled:bg-green-300
                                    dark:disabled:bg-green-900
                                    text-white
                                    px-7
                                    py-3
                                    rounded-xl
                                    font-bold
                                    shadow-md
                                    transition
                                "
                            >

                                {evaluating
                                    ? "🤖 Evaluating..."
                                    : "⭐ Evaluate Answer"}

                            </button>

                        </div>


                        {/* EVALUATION */}

                        {evaluation && (

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
                                    ⭐ AI Evaluation
                                </h2>


                                <div
                                    className="
                                        mt-5
                                        flex
                                        flex-col
                                        sm:flex-row
                                        sm:items-center
                                        gap-5
                                    "
                                >

                                    <div
                                        className="
                                            text-5xl
                                            font-extrabold
                                            text-green-600
                                            dark:text-green-400
                                        "
                                    >
                                        {evaluation.score}/10
                                    </div>

                                    <div>

                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                                dark:text-gray-400
                                            "
                                        >
                                            AI Score
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-gray-700
                                                dark:text-gray-300
                                            "
                                        >
                                            Based on relevance,
                                            clarity and technical
                                            understanding.
                                        </p>

                                    </div>

                                </div>


                                <div className="mt-7">

                                    <h3
                                        className="
                                            font-bold
                                            text-gray-900
                                            dark:text-white
                                        "
                                    >
                                        Feedback
                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            text-gray-700
                                            dark:text-gray-300
                                            leading-7
                                        "
                                    >
                                        {
                                            evaluation.feedback ||
                                            "No feedback available."
                                        }
                                    </p>

                                </div>

                            </div>

                        )}


                        {/* NAVIGATION */}

                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                justify-between
                                gap-3
                            "
                        >

                            <button
                                disabled={
                                    currentQuestion === 0
                                }
                                onClick={
                                    goToPrevious
                                }
                                className="
                                    bg-gray-600
                                    hover:bg-gray-700
                                    disabled:bg-gray-300
                                    dark:disabled:bg-gray-800
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                ← Previous
                            </button>


                            {currentQuestion <
                                allQuestions.length - 1 ? (

                                <button
                                    onClick={
                                        goToNext
                                    }
                                    className="
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        px-6
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        transition
                                    "
                                >
                                    Next →
                                </button>

                            ) : (

                                <button
                                    onClick={
                                        finishInterview
                                    }
                                    disabled={
                                        finishing
                                    }
                                    className="
                                        bg-purple-600
                                        hover:bg-purple-700
                                        disabled:bg-purple-400
                                        text-white
                                        px-6
                                        py-3
                                        rounded-xl
                                        font-bold
                                        transition
                                    "
                                >

                                    {finishing
                                        ? "🤖 Generating Report..."
                                        : "🎉 Finish Interview"}

                                </button>

                            )}

                        </div>

                    </div>

                )}

        </MainLayout>

    );

}

export default Interview;