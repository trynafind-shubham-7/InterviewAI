import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Resume from "../pages/Resume";
import Interview from "../pages/Interview";
import History from "../pages/History";
import Profile from "../pages/Profile";
import InterviewReport from "../pages/InterviewReport";

import ProtectedRoute from "./ProtectedRoute";

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="w-full h-full"
    >
        {children}
    </motion.div>
);

function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <PageWrapper><Dashboard /></PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume"
                    element={
                        <ProtectedRoute>
                            <PageWrapper><Resume /></PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <PageWrapper><Interview /></PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <PageWrapper><History /></PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <PageWrapper><Profile /></PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/report"
                    element={
                        <ProtectedRoute>
                            <PageWrapper><InterviewReport /></PageWrapper>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;