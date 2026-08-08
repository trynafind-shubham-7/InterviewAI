import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function ScoreChart({ data = [] }) {

    return (

        <div
            className="
                w-full
                h-[320px]
                sm:h-[360px]
            "
        >

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-gray-200 dark:stroke-gray-700"
                    />

                    <XAxis
                        dataKey="name"
                        tick={{
                            fill: "currentColor"
                        }}
                        className="
                            text-gray-500
                            dark:text-gray-400
                        "
                    />

                    <YAxis
                        domain={[0, 10]}
                        tick={{
                            fill: "currentColor"
                        }}
                        className="
                            text-gray-500
                            dark:text-gray-400
                        "
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor:
                                "var(--chart-tooltip-bg)",
                            border:
                                "1px solid var(--chart-tooltip-border)",
                            borderRadius:
                                "12px",
                            color:
                                "var(--chart-tooltip-text)"
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{
                            r: 5
                        }}
                        activeDot={{
                            r: 7
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ScoreChart;