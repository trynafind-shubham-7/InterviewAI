import { motion } from "framer-motion";

function StatsCard({ title, value, icon: Icon, trend, color = "indigo", progress = 75 }) {
    const colorMap = {
        indigo: {
            bg: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
            bar: "bg-gradient-to-r from-indigo-500 to-purple-600",
            badge: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300",
        },
        emerald: {
            bg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
            bar: "bg-gradient-to-r from-emerald-500 to-teal-600",
            badge: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
        },
        amber: {
            bg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20",
            bar: "bg-gradient-to-r from-amber-500 to-orange-600",
            badge: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
        },
        violet: {
            bg: "bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-500/20",
            bar: "bg-gradient-to-r from-violet-500 to-fuchsia-600",
            badge: "bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300",
        },
    };

    const activeColor = colorMap[color] || colorMap.indigo;

    return (
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="
                relative overflow-hidden p-6 rounded-2xl
                bg-white dark:bg-slate-900/90
                border border-slate-200/80 dark:border-slate-800/80
                shadow-sm hover:shadow-xl hover:shadow-indigo-500/5
                transition-all duration-300 group
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {title}
                    </span>
                    <h3 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {value ?? 0}
                    </h3>

                    {trend && (
                        <div className="mt-2 flex items-center gap-1.5">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${activeColor.badge}`}>
                                {trend}
                            </span>
                        </div>
                    )}
                </div>

                <div className={`p-3.5 rounded-2xl border ${activeColor.bg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    {Icon ? <Icon className="w-6 h-6" /> : null}
                </div>
            </div>

            {/* Progress Bar Accent */}
            <div className="mt-5 w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${activeColor.bar}`}
                />
            </div>
        </motion.div>
    );
}

export default StatsCard;