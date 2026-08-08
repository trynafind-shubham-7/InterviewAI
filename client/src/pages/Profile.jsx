import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
    FiUser, 
    FiMail, 
    FiSave, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiShield, 
    FiCpu 
} from "react-icons/fi";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
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

            const token = localStorage.getItem("token");
            const res = await api.get("/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile(res.data.user || res.data.profile);
        } catch (err) {
            console.error("Profile Error:", err);
            // Fallback profile if endpoint not ready
            setProfile({
                name: localStorage.getItem("name") || "Candidate",
                email: localStorage.getItem("email") || "user@example.com"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const token = localStorage.getItem("token");
            const res = await api.put("/profile", {
                name: profile.name,
                email: profile.email
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile(res.data.user || profile);
            if (profile.name) localStorage.setItem("name", profile.name);
            if (profile.email) localStorage.setItem("email", profile.email);

            setMessage("Profile settings updated successfully!");
        } catch (err) {
            console.error("Profile Update Error:", err);
            setError(err.response?.data?.message || "Failed to update profile settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex items-center justify-center">
                    <Loader message="Loading profile settings..." size="lg" />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Header Banner */}
                <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 border border-slate-800/40 text-white shadow-xl">
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-white shadow-lg shrink-0">
                            {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                                <FiUser className="w-3.5 h-3.5" />
                                Candidate Profile
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                {profile?.name || "Candidate"}
                            </h1>
                            <p className="text-slate-300 text-xs sm:text-sm">
                                {profile?.email || ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                {message && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center gap-3">
                        <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        {message}
                    </div>
                )}
                {error && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold flex items-center gap-3">
                        <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Main Settings Form Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FiShield className="text-indigo-500" />
                            Account Credentials & Profile Info
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Update your personal display name and primary contact details.
                        </p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Full Display Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <FiUser className="w-4 h-4" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={profile?.name || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="
                                        w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium
                                        bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800
                                        text-slate-900 dark:text-white placeholder-slate-400
                                        focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                                        transition-all duration-200
                                    "
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Primary Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <FiMail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profile?.email || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="
                                        w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium
                                        bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800
                                        text-slate-900 dark:text-white placeholder-slate-400
                                        focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                                        transition-all duration-200
                                    "
                                />
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="
                                    inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white
                                    bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
                                    disabled:opacity-50 shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer
                                "
                            >
                                {saving ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </span>
                                ) : (
                                    <>
                                        <FiSave className="w-4 h-4" />
                                        Save Profile Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default Profile;