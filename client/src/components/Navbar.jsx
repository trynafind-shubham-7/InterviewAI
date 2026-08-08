import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiCpu, FiUser } from "react-icons/fi";

function Navbar({ onOpenMobileSidebar }) {
    const { user } = useAuth();
    const location = useLocation();

    const getPageTitle = (path) => {
        switch (path) {
            case "/dashboard":
                return "Dashboard Overview";
            case "/interview":
                return "AI Mock Interview Studio";
            case "/resume":
                return "Resume Analyzer & Skill Gap";
            case "/history":
                return "Session History & Logs";
            case "/profile":
                return "Candidate Profile";
            case "/report":
                return "Interview Performance Report";
            default:
                return "InterviewAI";
        }
    };

    return (
        <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-3">
                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    onClick={onOpenMobileSidebar}
                    className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
                    aria-label="Open sidebar"
                >
                    <FiMenu className="w-6 h-6" />
                </button>

                {/* Mobile Brand Title */}
                <div className="flex items-center gap-2.5 md:hidden">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <FiCpu className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                        Interview<span className="text-indigo-500">AI</span>
                    </span>
                </div>

                {/* Desktop Breadcrumb / Page Title */}
                <div className="hidden md:block">
                    <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                        {getPageTitle(location.pathname)}
                    </h1>
                </div>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-3">
                <ThemeToggle />

                {user && (
                    <Link
                        to="/profile"
                        className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                    >
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                            {user.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
                        </div>
                        <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                            {user.name || "Candidate"}
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Navbar;
