import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";

function Loader({ message = "Analyzing with AI...", size = "md" }) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                    className={`rounded-full border-2 border-[var(--border)] border-t-[var(--primary)] ${sizeClasses[size] || sizeClasses.md}`}
                />
                <motion.div
                    animate={{ scale: [0.9, 1.08, 0.9] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="absolute text-[var(--primary)]"
                >
                    <FiCpu className="w-5 h-5" />
                </motion.div>
            </div>

            {message && (
                <p className="text-sm font-medium text-[var(--text-muted)] animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
}

export default Loader;
