import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-indigo-500 selection:text-white">
            {/* Sidebar (handles desktop fixed & mobile drawer) */}
            <Sidebar
                isOpen={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
            />

            {/* Main Content Body */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Navbar Header */}
                <Navbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

                {/* Page View Container */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout;