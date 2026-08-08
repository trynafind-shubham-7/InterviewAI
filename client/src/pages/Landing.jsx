import { Link } from "react-router-dom";

function Landing() {

    const features = [

        {
            icon: "📄",
            title: "Resume Analyzer",
            desc: "AI checks your resume and gives ATS score."
        },

        {
            icon: "🎤",
            title: "Mock Interview",
            desc: "Practice real interview questions."
        },

        {
            icon: "⭐",
            title: "AI Evaluation",
            desc: "Receive instant feedback."
        },

        {
            icon: "📈",
            title: "Progress Dashboard",
            desc: "Track every interview."
        }

    ];

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white">

            {/* Navbar */}

            <nav className="flex justify-between items-center px-12 py-8">

                <h1 className="text-4xl font-extrabold">

                    🤖 InterviewAI

                </h1>

                <div className="space-x-4">

                    <Link
                        to="/login"
                        className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="border-2 border-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
                    >
                        Register
                    </Link>

                </div>

            </nav>

            {/* Hero */}

            <section className="text-center px-10 pt-16">

                <h1 className="text-7xl font-extrabold">

                    Ace Your Interview

                </h1>

                <h2 className="text-6xl mt-3">

                    with Artificial Intelligence

                </h2>

                <p className="mt-8 text-xl text-blue-100 max-w-3xl mx-auto">

                    Resume Analysis • Mock Interview • AI Evaluation •
                    Performance Tracking

                </p>

                <Link

                    to="/register"

                    className="inline-block mt-10 bg-white text-blue-700 px-10 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"

                >

                    🚀 Get Started Free

                </Link>

            </section>

            {/* Statistics */}

            <section className="max-w-6xl mx-auto mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">

                    <h2 className="text-5xl font-bold">

                        1200+

                    </h2>

                    <p className="mt-3">

                        Resumes Analyzed

                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">

                    <h2 className="text-5xl font-bold">

                        3500+

                    </h2>

                    <p className="mt-3">

                        Interviews

                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">

                    <h2 className="text-5xl font-bold">

                        500+

                    </h2>

                    <p className="mt-3">

                        Active Users

                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">

                    <h2 className="text-5xl font-bold">

                        98%

                    </h2>

                    <p className="mt-3">

                        Satisfaction

                    </p>

                </div>

            </section>

            {/* Features */}

            <section className="max-w-7xl mx-auto mt-28 px-10">

                <h2 className="text-5xl font-bold text-center">

                    Features

                </h2>

                <div className="grid lg:grid-cols-4 gap-8 mt-14">

                    {

                        features.map((feature, index) => (

                            <div

                                key={index}

                                className="bg-white rounded-3xl p-8 text-gray-800 shadow-2xl hover:-translate-y-3 transition"

                            >

                                <div className="text-6xl">

                                    {feature.icon}

                                </div>

                                <h3 className="text-2xl font-bold mt-6">

                                    {feature.title}

                                </h3>

                                <p className="mt-4">

                                    {feature.desc}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </section>

            {/* Why Choose */}

            <section className="max-w-6xl mx-auto mt-32 px-10">

                <h2 className="text-5xl font-bold text-center">

                    Why Choose InterviewAI?

                </h2>

                <div className="grid md:grid-cols-2 gap-10 mt-16">

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

                        ⚡ Instant AI Feedback

                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

                        🎤 Voice Based Interview

                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

                        📄 ATS Resume Score

                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

                        📊 Performance Analytics

                    </div>

                </div>

            </section>

            {/* Footer */}

            <footer className="mt-32 py-12 bg-black/20 text-center">

                <h2 className="text-3xl font-bold">

                    InterviewAI

                </h2>

                <p className="mt-3">

                    AI Powered Interview Preparation Platform

                </p>

                <p className="mt-8 text-sm opacity-80">

                    © 2026 InterviewAI. All Rights Reserved.

                </p>

            </footer>

        </div>

    );

}

export default Landing;