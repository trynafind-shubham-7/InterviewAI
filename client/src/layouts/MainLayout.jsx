import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)] antialiased">
            <Sidebar
                isOpen={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                <Navbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout;