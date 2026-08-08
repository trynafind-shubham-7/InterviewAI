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
        <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800/80 shadow-2xl select-none">
            {/* Header / Brand */}
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                <Link 
                    to="/dashboard" 
                    onClick={onClose} 
                    className="flex items-center gap-3 group cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
                        <FiCpu className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-slate-300 bg-clip-text text-transparent">
                            Interview<span className="text-indigo-400">AI</span>
                        </span>
                        <span className="block text-[10px] font-semibold tracking-wider text-indigo-400 uppercase">
                            Pro Candidate Suite
                        </span>
                    </div>
                </Link>

                {/* Mobile Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        aria-label="Close Sidebar"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Navigation
                </div>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className="relative block"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavTab"
                                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span
                                className={`
                                    relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-colors duration-200
                                    ${isActive 
                                        ? "text-white font-semibold" 
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Footer Controls */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 space-y-4">
                {/* User Card */}
                {user && (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user.name || "Candidate"}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email || ""}</p>
                        </div>
                    </div>
                )}

                {/* Theme & Logout Actions */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <span className="text-xs font-medium text-slate-400">Theme</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (onClose) onClose();
                            logout();
                            navigate("/");
                        }}
                        className="
                            flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold
                            text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20
                            transition-colors duration-200 cursor-pointer
                        "
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
            {/* Desktop Sidebar (Fixed Width) */}
            <aside className="hidden md:block w-64 h-screen sticky top-0 z-30 shrink-0">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer (AnimatePresence) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 md:hidden"
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