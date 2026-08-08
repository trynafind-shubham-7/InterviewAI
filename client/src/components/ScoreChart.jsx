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
        <div className="w-full h-[320px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={formattedData}
                    margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />

                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <YAxis
                        domain={[0, 10]}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--chart-tooltip-bg)",
                            borderColor: "var(--chart-tooltip-border)",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            color: "var(--chart-tooltip-text)",
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#scoreGradient)"
                        dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#ffffff" }}
                        activeDot={{ r: 7, fill: "#6366f1", strokeWidth: 3, stroke: "#ffffff" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreChart;