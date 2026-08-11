import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <BrowserRouter>

            <ThemeProvider>

                <AuthProvider>

                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{
                            duration: 3000,
                            success: {
                                duration: 3000
                            },
                            error: {
                                duration: 4000
                            },
                            style: {
                                borderRadius: "14px",
                                background: "#1f2937",
                                color: "#ffffff",
                                padding: "14px 18px",
                                fontSize: "14px"
                            }
                        }}
                    />

                    <App />

                </AuthProvider>

            </ThemeProvider>

        </BrowserRouter>

    </React.StrictMode>

);