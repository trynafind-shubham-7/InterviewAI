import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

function ThemeToggle() {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="
                relative
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-slate-100
                dark:bg-slate-800/80
                text-slate-700
                dark:text-amber-400
                hover:bg-slate-200
                dark:hover:bg-slate-700
                border
                border-slate-200/80
                dark:border-slate-700/60
                shadow-sm
                transition-colors
                duration-200
                cursor-pointer
            "
        >
            <motion.div
                key={darkMode ? "dark" : "light"}
                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5 text-indigo-600" />}
            </motion.div>
        </motion.button>
    );
}

export default ThemeToggle;