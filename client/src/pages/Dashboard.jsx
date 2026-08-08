import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/StatsCard";
import ScoreChart from "../components/ScoreChart";
import api from "../api/axios";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res = await api.get(
                "/dashboard",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setDashboard(
                res.data.dashboard
            );

        } catch (err) {

            console.error(
                "Dashboard Error:",
                err
            );

        }

    };


    if (!dashboard) {

        return (

            <MainLayout>

                <div
                    className="
                        min-h-[70vh]
                        flex
                        items-center
                        justify-center
                    "
                >

                    <div
                        className="
                            text-center
                            bg-white
                            dark:bg-gray-800
                            p-10
                            rounded-3xl
                            shadow-xl
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                border-4
                                border-blue-200
                                border-t-blue-600
                                rounded-full
                                animate-spin
                                mx-auto
                            "
                        />

                        <h2
                            className="
                                mt-5
                                text-2xl
                                font-bold
                                text-gray-800
                                dark:text-white
                            "
                        >
                            Loading Dashboard...
                        </h2>

                    </div>

                </div>

            </MainLayout>

        );

    }


    const chartData = [

        {
            name: "1",
            score: 6
        },

        {
            name: "2",
            score: 7
        },

        {
            name: "3",
            score: 8
        },

        {
            name: "4",
            score: 9
        },

        {
            name: "5",
            score:
                dashboard.bestScore || 10
        }

    ];


    const quickActions = [

        {
            title: "Resume Analyzer",
            description:
                "Upload your resume and get AI-powered feedback.",
            icon: "📄",
            path: "/resume",
            gradient:
                "from-blue-500 to-cyan-500"
        },

        {
            title: "AI Mock Interview",
            description:
                "Practice realistic interviews with AI.",
            icon: "🎤",
            path: "/interview",
            gradient:
                "from-purple-500 to-pink-500"
        },

        {
            title: "Interview History",
            description:
                "Review your previous interview attempts.",
            icon: "📊",
            path: "/history",
            gradient:
                "from-green-500 to-emerald-500"
        },

        {
            title: "My Profile",
            description:
                "Manage your account and preferences.",
            icon: "👤",
            path: "/profile",
            gradient:
                "from-orange-500 to-red-500"
        }

    ];


    return (

        <MainLayout>

            {/* ==================================================
                HERO
            ================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600
                    text-white
                    p-6
                    sm:p-8
                    lg:p-10
                    shadow-2xl
                    mb-8
                "
            >

                <div
                    className="
                        absolute
                        -top-20
                        -right-20
                        w-64
                        h-64
                        bg-white/10
                        rounded-full
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-32
                        -left-20
                        w-72
                        h-72
                        bg-white/10
                        rounded-full
                    "
                />

                <div className="relative z-10">

                    <p
                        className="
                            text-sm
                            sm:text-base
                            font-medium
                            text-blue-100
                        "
                    >
                        InterviewAI Dashboard
                    </p>

                    <h1
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-5xl
                            font-extrabold
                            mt-2
                        "
                    >
                        👋 Welcome Back,{" "}
                        {dashboard.name}
                    </h1>

                    <p
                        className="
                            mt-3
                            text-sm
                            sm:text-base
                            lg:text-lg
                            text-blue-100
                            max-w-2xl
                        "
                    >
                        Ready to improve your interview
                        skills today? Keep practicing and
                        take your career to the next level.
                    </p>

                </div>

            </section>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                "
            >

                <StatsCard
                    title="Resume Score"
                    value={
                        dashboard.resumeScore
                    }
                    icon="📄"
                    color="text-blue-600"
                />

                <StatsCard
                    title="Interviews"
                    value={
                        dashboard.interviews
                    }
                    icon="🎤"
                    color="text-green-600"
                />

                <StatsCard
                    title="Average Score"
                    value={
                        dashboard.averageScore
                    }
                    icon="⭐"
                    color="text-yellow-500"
                />

                <StatsCard
                    title="Best Score"
                    value={
                        dashboard.bestScore
                    }
                    icon="🏆"
                    color="text-purple-600"
                />

            </section>


            {/* ==================================================
                QUICK ACTIONS
            ================================================== */}

            <section className="mt-8">

                <div className="mb-5">

                    <h2
                        className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        Quick Actions
                    </h2>

                    <p
                        className="
                            mt-1
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Continue improving your
                        interview preparation.
                    </p>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                    "
                >

                    {quickActions.map(
                        (item) => (

                            <Link
                                key={item.path}
                                to={item.path}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    bg-white
                                    dark:bg-gray-800
                                    border
                                    border-gray-200
                                    dark:border-gray-700
                                    rounded-3xl
                                    p-6
                                    shadow-sm
                                    hover:shadow-xl
                                    transition-all
                                    duration-300
                                "
                            >

                                <div
                                    className={`
                                        absolute
                                        inset-0
                                        bg-gradient-to-r
                                        ${item.gradient}
                                        opacity-0
                                        group-hover:opacity-5
                                        transition
                                    `}
                                />

                                <div
                                    className="
                                        relative
                                        z-10
                                        flex
                                        items-start
                                        gap-5
                                    "
                                >

                                    <div
                                        className="
                                            w-14
                                            h-14
                                            flex
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-gray-100
                                            dark:bg-gray-700
                                            text-3xl
                                            group-hover:scale-110
                                            transition
                                        "
                                    >
                                        {item.icon}
                                    </div>

                                    <div>

                                        <h3
                                            className="
                                                text-xl
                                                font-bold
                                                text-gray-900
                                                dark:text-white
                                            "
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-2
                                                text-gray-500
                                                dark:text-gray-400
                                                leading-6
                                            "
                                        >
                                            {item.description}
                                        </p>

                                        <p
                                            className="
                                                mt-4
                                                text-blue-600
                                                dark:text-blue-400
                                                font-semibold
                                            "
                                        >
                                            Open →
                                        </p>

                                    </div>

                                </div>

                            </Link>

                        )
                    )}

                </div>

            </section>


            {/* ==================================================
                PERFORMANCE
            ================================================== */}

            <section
                className="
                    mt-8
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-3xl
                    shadow-sm
                    p-5
                    sm:p-7
                "
            >

                <div className="mb-6">

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        Interview Performance
                    </h2>

                    <p
                        className="
                            mt-1
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Track your progress over time.
                    </p>

                </div>

                <div
                    className="
                        w-full
                        overflow-x-auto
                    "
                >

                    <ScoreChart
                        data={chartData}
                    />

                </div>

            </section>

        </MainLayout>

    );

}

export default Dashboard;