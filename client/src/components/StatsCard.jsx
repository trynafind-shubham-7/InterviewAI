function StatsCard({
    title,
    value,
    icon,
    color = "text-blue-600"
}) {

    return (

        <div
            className="
                group
                bg-white
                dark:bg-gray-800
                border
                border-gray-200
                dark:border-gray-700
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-extrabold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        {value ?? 0}
                    </h2>

                </div>


                <div
                    className="
                        w-14
                        h-14
                        flex
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gray-100
                        dark:bg-gray-700
                        text-3xl
                        group-hover:scale-110
                        transition-transform
                        duration-300
                    "
                >

                    {icon}

                </div>

            </div>


            <div
                className={`
                    mt-5
                    h-1
                    rounded-full
                    bg-gray-100
                    dark:bg-gray-700
                    overflow-hidden
                `}
            >

                <div
                    className={`
                        h-full
                        w-1/2
                        rounded-full
                        ${color.replace(
                            "text-",
                            "bg-"
                        )}
                        opacity-70
                    `}
                />

            </div>

        </div>

    );

}

export default StatsCard;