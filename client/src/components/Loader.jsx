import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";

function Loader({ message = "Analyzing with AI...", size = "md" }) {
    const sizeClasses = {
        sm: "w-8 h-8 text-sm",
        md: "w-12 h-12 text-base",
        lg: "w-16 h-16 text-lg",
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative flex items-center justify-center">
                {/* Orbiting Spinner Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                    className={`
                        rounded-full border-2 border-indigo-500/20 border-t-indigo-600 border-r-purple-600
                        ${sizeClasses[size] || sizeClasses.md}
                    `}
                />

                {/* Center Icon Pulse */}
                <motion.div
                    animate={{ scale: [0.85, 1.1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute text-indigo-600 dark:text-indigo-400"
                >
                    <FiCpu className="w-5 h-5" />
                </motion.div>
            </div>

            {message && (
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse tracking-wide">
                    {message}
                </p>
            )}
        </div>
    );
}

export default Loader;
