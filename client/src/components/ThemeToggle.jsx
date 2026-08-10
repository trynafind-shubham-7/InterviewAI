import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

function ThemeToggle() {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--panel-soft)] text-[var(--text)] border border-[var(--border)] shadow-sm cursor-pointer"
        >
            <motion.div
                key={darkMode ? "dark" : "light"}
                initial={{ scale: 0.7, rotate: -60, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {darkMode ? <FiSun className="w-4 h-4 text-[var(--warning)]" /> : <FiMoon className="w-4 h-4 text-[var(--primary)]" />}
            </motion.div>
        </motion.button>
    );
}

export default ThemeToggle;