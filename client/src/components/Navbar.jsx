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
                return "Resume Analyzer";
            case "/history":
                return "Session History";
            case "/profile":
                return "Candidate Profile";
            case "/report":
                return "Performance Report";
            default:
                return "InterviewAI";
        }
    };

    return (
        <header className="sticky top-0 z-20 w-full px-4 sm:px-6 py-3.5 flex items-center justify-between bg-[var(--panel)]/90 border-b border-[var(--border)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenMobileSidebar}
                    className="md:hidden p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--panel-soft)] border border-[var(--border)]"
                    aria-label="Open sidebar"
                >
                    <FiMenu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2.5 md:hidden">
                    <div className="w-8 h-8 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-sm">
                        <FiCpu className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight text-[var(--text)]">
                        Interview<span className="text-[var(--primary)]">AI</span>
                    </span>
                </div>

                <div className="hidden md:block">
                    <h1 className="text-lg font-bold text-[var(--text)] tracking-tight">
                        {getPageTitle(location.pathname)}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />

                {user && (
                    <Link
                        to="/profile"
                        className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-[var(--panel-soft)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors"
                    >
                        <div className="w-7 h-7 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xs">
                            {user.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
                        </div>
                        <span className="hidden sm:inline text-xs font-semibold text-[var(--text)] max-w-[120px] truncate">
                            {user.name || "Candidate"}
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Navbar;
