import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {

    const {
        darkMode,
        toggleDarkMode
    } = useTheme();

    return (

        <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            className="
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-xl
                bg-gray-100
                dark:bg-gray-700
                text-gray-700
                dark:text-yellow-300
                hover:bg-gray-200
                dark:hover:bg-gray-600
                shadow-sm
                hover:shadow-md
                transition
            "
        >

            {darkMode ? "☀️" : "🌙"}

        </button>

    );

}

export default ThemeToggle;