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
                <div className="surface-card p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="photo-badge w-16 h-16 text-2xl sm:text-3xl">
                            {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <div className="pill mb-2">
                                <FiUser className="w-3.5 h-3.5" />
                                Candidate Profile
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                                {profile?.name || "Candidate"}
                            </h1>
                            <p className="text-sm text-[var(--text-muted)]">{profile?.email || ""}</p>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className="p-4 rounded-2xl bg-[#ecfdf5] border border-[#bbf7d0] text-[#166534] dark:bg-[#062d1d] dark:border-[#14532d] dark:text-[#86efac] text-sm font-semibold flex items-center gap-3">
                        <FiCheckCircle className="w-5 h-5 shrink-0" />
                        {message}
                    </div>
                )}
                {error && (
                    <div className="p-4 rounded-2xl bg-[#fff1f2] border border-[#fecaca] text-[#b91c1c] dark:bg-[#2a0d12] dark:border-[#7f1d1d] dark:text-[#fca5a5] text-sm font-semibold flex items-center gap-3">
                        <FiAlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="surface-card p-6 sm:p-8 space-y-6">
                    <div className="border-b border-[var(--border)] pb-4">
                        <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                            <FiShield className="text-[var(--primary)]" />
                            Account credentials & profile info
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                            Update your display name and primary contact details.
                        </p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-2">
                                Full Display Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                                    <FiUser className="w-4 h-4" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={profile?.name || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="input-shell pl-11 pr-4 py-3 text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-2">
                                Primary Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                                    <FiMail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profile?.email || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="input-shell pl-11 pr-4 py-3 text-sm"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={saving} className="button-primary px-7 py-3.5">
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