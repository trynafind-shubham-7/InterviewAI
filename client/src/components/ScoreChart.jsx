import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function ScoreChart({ data = [] }) {
    const formattedData = data.length > 0 ? data : [
        { name: "Mon", score: 6 },
        { name: "Tue", score: 7 },
        { name: "Wed", score: 8 },
        { name: "Thu", score: 7.5 },
        { name: "Fri", score: 8.5 },
        { name: "Sat", score: 9 },
        { name: "Sun", score: 8.8 },
    ];

    return (
        <div className="w-full h-[300px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData} margin={{ top: 16, right: 12, left: -18, bottom: 0 }}>
                    <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1f5eff" stopOpacity={0.28} />
                            <stop offset="95%" stopColor="#1f5eff" stopOpacity={0.02} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />

                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
                    <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--chart-tooltip-bg)",
                            borderColor: "var(--chart-tooltip-border)",
                            borderRadius: "12px",
                            color: "var(--chart-tooltip-text)",
                            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
                            padding: "10px 12px",
                            fontSize: "12px",
                            fontWeight: "600"
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#1f5eff"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#scoreGradient)"
                        dot={{ r: 4, fill: "#1f5eff", strokeWidth: 2, stroke: "#ffffff" }}
                        activeDot={{ r: 6, fill: "#1f5eff", strokeWidth: 2, stroke: "#ffffff" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreChart;