import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {

    return (

        <div
            className="
                flex
                min-h-screen
                bg-gray-100
                dark:bg-gray-950
                transition-colors
                duration-300
            "
        >

            <Sidebar />

            <main
                className="
                    flex-1
                    min-h-screen
                    p-4
                    sm:p-6
                    lg:p-8
                    bg-gray-100
                    dark:bg-gray-950
                    text-gray-900
                    dark:text-gray-100
                    transition-colors
                    duration-300
                    overflow-x-hidden
                "
            >

                {children}

            </main>

        </div>

    );

}

export default MainLayout;