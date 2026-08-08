import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    useEffect(() => {

        fetchProfile();

    }, []);


    const fetchProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const token =
                localStorage.getItem("token");

            const res = await api.get(

                "/profile",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setProfile(
                res.data.user ||
                res.data.profile
            );

        }

        catch (err) {

            console.error(
                "Profile Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load profile."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const handleChange = (event) => {

        setProfile({

            ...profile,

            [event.target.name]:
                event.target.value

        });

    };


    const handleSave = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            setMessage("");

            setError("");

            const token =
                localStorage.getItem("token");

            const res = await api.put(

                "/profile",

                {
                    name:
                        profile.name,

                    email:
                        profile.email
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setProfile(
                res.data.user ||
                profile
            );

            if (profile.name) {

                localStorage.setItem(
                    "name",
                    profile.name
                );

            }

            setMessage(
                "Profile updated successfully."
            );

        }

        catch (err) {

            console.error(
                "Profile Update Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to update profile."
            );

        }

        finally {

            setSaving(false);

        }

    };


    if (loading) {

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
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-200
                            dark:border-gray-700
                            rounded-3xl
                            shadow-xl
                            p-10
                            text-center
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
                                text-xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            Loading Profile...
                        </h2>

                    </div>

                </div>

            </MainLayout>

        );

    }


    if (error && !profile) {

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

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-red-700
                            dark:text-red-300
                        "
                    >
                        Unable to load profile
                    </h2>

                    <p
                        className="
                            mt-2
                            text-red-600
                            dark:text-red-400
                        "
                    >
                        {error}
                    </p>

                    <button
                        onClick={fetchProfile}
                        className="
                            mt-4
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-5
                            py-2
                            rounded-xl
                            font-semibold
                        "
                    >
                        Try Again
                    </button>

                </div>

            </MainLayout>

        );

    }


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

                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-5
                    "
                >

                    <div
                        className="
                            w-20
                            h-20
                            rounded-full
                            bg-white/20
                            flex
                            items-center
                            justify-center
                            text-4xl
                            shadow-lg
                        "
                    >
                        👤
                    </div>

                    <div>

                        <p
                            className="
                                text-blue-100
                                text-sm
                                font-medium
                            "
                        >
                            Account Settings
                        </p>

                        <h1
                            className="
                                text-3xl
                                sm:text-4xl
                                font-extrabold
                                mt-1
                            "
                        >
                            My Profile
                        </h1>

                        <p
                            className="
                                mt-2
                                text-blue-100
                            "
                        >
                            Manage your InterviewAI
                            account information.
                        </p>

                    </div>

                </div>

            </div>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            {message && (

                <div
                    className="
                        mb-6
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

                    ✅ {message}

                </div>

            )}


            {error && profile && (

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
                PROFILE FORM
            ================================================== */}

            <div
                className="
                    max-w-3xl
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

                <form
                    onSubmit={handleSave}
                >

                    <div className="space-y-6">

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
                                name="name"
                                type="text"
                                value={
                                    profile?.name || ""
                                }
                                onChange={handleChange}
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
                                placeholder="Enter your name"
                            />

                        </div>


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
                                name="email"
                                type="email"
                                value={
                                    profile?.email || ""
                                }
                                onChange={handleChange}
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
                                placeholder="Enter your email"
                            />

                        </div>


                        {/* SAVE */}

                        <div
                            className="
                                pt-2
                                flex
                                justify-end
                            "
                        >

                            <button
                                type="submit"
                                disabled={saving}
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    disabled:bg-blue-400
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    shadow-md
                                    hover:shadow-lg
                                    transition
                                "
                            >

                                {saving
                                    ? "Saving..."
                                    : "💾 Save Changes"}

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </MainLayout>

    );

}

export default Profile;