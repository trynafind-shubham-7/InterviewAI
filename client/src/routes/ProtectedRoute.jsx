import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
    children
}) {

    const {
        token,
        loading
    } = useAuth();

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">

                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />

            </div>
        );
    }

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;