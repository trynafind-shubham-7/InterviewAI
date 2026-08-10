import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import {
    FiHome,
    FiFileText,
    FiMic,
    FiClock,
    FiUser,
    FiLogOut,
    FiCpu,
    FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: FiHome },
        { name: "Interview Studio", path: "/interview", icon: FiMic },
        { name: "Resume AI", path: "/resume", icon: FiFileText },
        { name: "Session History", path: "/history", icon: FiClock },
        { name: "My Profile", path: "/profile", icon: FiUser },
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full bg-[var(--panel)] text-[var(--text)] border-r border-[var(--border)] shadow-sm select-none">
            <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                <Link to="/dashboard" onClick={onClose} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-sm">
                        <FiCpu className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="font-extrabold text-xl tracking-tight text-[var(--text)]">
                            Interview<span className="text-[var(--primary)]">AI</span>
                        </span>
                        <span className="block text-[10px] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                            Candidate Suite
                        </span>
                    </div>
                </Link>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--panel-soft)] border border-[var(--border)]"
                        aria-label="Close Sidebar"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                )}
            </div>

            <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
                <div className="px-3 pb-2 text-[10px] font-bold tracking-[0.14em] text-[var(--text-muted)] uppercase">
                    Navigation
                </div>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link key={item.path} to={item.path} onClick={onClose} className="relative block">
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavTab"
                                    className="absolute inset-0 bg-[var(--primary-soft)] border border-[var(--primary)]/10 rounded-xl"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "text-[var(--primary)]" : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--panel-soft)]"}`}>
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[var(--border)] bg-[var(--panel-soft)] space-y-4">
                {user && (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--panel)] border border-[var(--border)]">
                        <div className="w-9 h-9 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--text)] truncate">{user.name || "Candidate"}</p>
                            <p className="text-xs text-[var(--text-muted)] truncate">{user.email || ""}</p>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <span className="text-xs font-medium text-[var(--text-muted)]">Theme</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (onClose) onClose();
                            logout();
                            navigate("/");
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#dc2626] bg-[#fee2e2] dark:bg-[#3f1717] border border-[#fecaca] dark:border-[#7f1d1d]"
                    >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <aside className="hidden md:block w-64 h-screen sticky top-0 z-30 shrink-0">
                {sidebarContent}
            </aside>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-slate-900/55 z-40 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 250 }}
                            className="fixed inset-y-0 left-0 w-72 z-50 md:hidden"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default Sidebar;