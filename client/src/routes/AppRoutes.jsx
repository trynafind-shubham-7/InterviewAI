import { Routes, Route } from "react-router-dom";

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

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resume"
                element={
                    <ProtectedRoute>
                        <Resume />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/interview"
                element={
                    <ProtectedRoute>
                        <Interview />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/report"
                element={
                    <ProtectedRoute>
                        <InterviewReport />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;