import { motion } from "framer-motion";

function StatsCard({ title, value, icon: Icon, trend, color = "indigo", progress = 75 }) {
    const colorMap = {
        indigo: {
            bg: "bg-[var(--primary-soft)] text-[var(--primary)] border-[rgba(31,94,255,0.12)]",
            bar: "bg-[var(--primary)]",
            badge: "bg-[var(--primary-soft)] text-[var(--primary)]",
        },
        emerald: {
            bg: "bg-[#ecfdf5] dark:bg-[#052e1d] text-[#16a34a] border-[#bbf7d0] dark:border-[#14532d]",
            bar: "bg-[#16a34a]",
            badge: "bg-[#ecfdf5] text-[#15803d] dark:bg-[#052e1d] dark:text-[#4ade80]",
        },
        amber: {
            bg: "bg-[#fff7ed] dark:bg-[#3a2208] text-[#f59e0b] border-[#fed7aa] dark:border-[#78350f]",
            bar: "bg-[#f59e0b]",
            badge: "bg-[#fff7ed] text-[#b45309] dark:bg-[#3a2208] dark:text-[#fbbf24]",
        },
        violet: {
            bg: "bg-[#f5f3ff] dark:bg-[#1f163b] text-[#7c3aed] border-[#ddd6fe] dark:border-[#4c1d95]",
            bar: "bg-[#7c3aed]",
            badge: "bg-[#f5f3ff] text-[#6d28d9] dark:bg-[#1f163b] dark:text-[#a78bfa]",
        },
    };

    const activeColor = colorMap[color] || colorMap.indigo;

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="relative overflow-hidden p-5 rounded-[18px] bg-[var(--panel)] border border-[var(--border)] shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {title}
                    </span>
                    <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--text)]">
                        {value ?? 0}
                    </h3>

                    {trend && (
                        <div className="mt-2 flex items-center gap-1.5">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${activeColor.badge}`}>
                                {trend}
                            </span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-xl border ${activeColor.bg}`}>
                    {Icon ? <Icon className="w-5 h-5" /> : null}
                </div>
            </div>

            <div className="mt-5 w-full h-2 rounded-full bg-[var(--panel-soft)] overflow-hidden border border-[var(--border)]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${activeColor.bar}`}
                />
            </div>
        </motion.div>
    );
}

export default StatsCard;