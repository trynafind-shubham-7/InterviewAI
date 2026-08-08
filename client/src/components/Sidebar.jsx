import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠"
        },
        {
            name: "Resume",
            path: "/resume",
            icon: "📄"
        },
        {
            name: "Interview",
            path: "/interview",
            icon: "🎤"
        },
        {
            name: "History",
            path: "/history",
            icon: "📜"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "👤"
        }
    ];

    return (

        <aside
            className="
                w-64
                min-h-screen
                bg-blue-700
                dark:bg-gray-900
                text-white
                flex
                flex-col
                shadow-xl
                transition-colors
                duration-300
            "
        >

            {/* Logo */}

            <div
                className="
                    p-6
                    text-3xl
                    font-bold
                    border-b
                    border-blue-600
                    dark:border-gray-700
                "
            >

                🤖 InterviewAI

            </div>


            {/* Navigation */}

            <div className="flex-1 p-4">

                {menuItems.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
                            block
                            p-3
                            rounded-lg
                            mb-2
                            transition
                            duration-200
                            ${
                                location.pathname === item.path
                                    ? "bg-blue-500 dark:bg-blue-600 shadow-md"
                                    : "hover:bg-blue-600 dark:hover:bg-gray-800"
                            }
                        `}
                    >

                        <span className="mr-2">
                            {item.icon}
                        </span>

                        {item.name}

                    </Link>

                ))}

            </div>


            {/* Bottom Controls */}

            <div
                className="
                    p-4
                    border-t
                    border-blue-600
                    dark:border-gray-700
                "
            >

                {/* Theme */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        mb-4
                        px-1
                    "
                >

                    <div className="flex items-center gap-2">

                        <span className="text-lg">
                            {document.documentElement.classList.contains("dark")
                                ? "🌙"
                                : "☀️"}
                        </span>

                        <span className="text-sm font-medium">
                            Theme
                        </span>

                    </div>

                    <ThemeToggle />

                </div>


                {/* Logout */}

                <button
                    onClick={() => {

                        logout();

                        navigate("/");

                    }}
                    className="
                        w-full
                        bg-red-500
                        hover:bg-red-600
                        p-3
                        rounded-lg
                        font-semibold
                        transition
                        duration-200
                        shadow-sm
                        hover:shadow-md
                    "
                >

                    🚪 Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;