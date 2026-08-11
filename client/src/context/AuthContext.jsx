import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../api/axios";

const AuthContext =
    createContext(null);

export const AuthProvider =
    ({ children }) => {

    const [token, setToken] =
        useState(
            localStorage.getItem("token") || ""
        );

    const [user, setUser] =
        useState(() => {

            const saved =
                localStorage.getItem(
                    "user"
                );

            try {
                return saved
                    ? JSON.parse(saved)
                    : null;
            } catch {
                return null;
            }
        });

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const restoreSession =
            async () => {

            const storedToken =
                localStorage.getItem(
                    "token"
                );

            if (!storedToken) {

                setLoading(false);

                return;
            }

            try {

                const response =
                    await api.get(
                        "/auth/profile",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${storedToken}`
                            }
                        }
                    );

                const currentUser =
                    response.data.user;

                setUser(currentUser);

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        currentUser
                    )
                );

                if (
                    currentUser?.name
                ) {
                    localStorage.setItem(
                        "name",
                        currentUser.name
                    );
                }

                if (
                    currentUser?.email
                ) {
                    localStorage.setItem(
                        "email",
                        currentUser.email
                    );
                }

            } catch (error) {

                console.error(
                    "Session restore failed:",
                    error
                );

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                setToken("");
                setUser(null);

            } finally {

                setLoading(false);
            }
        };

        restoreSession();

    }, []);


    const login = (
        jwt,
        loggedInUser
    ) => {

        localStorage.setItem(
            "token",
            jwt
        );

        if (loggedInUser) {

            localStorage.setItem(
                "user",
                JSON.stringify(
                    loggedInUser
                )
            );

            if (loggedInUser.name) {
                localStorage.setItem(
                    "name",
                    loggedInUser.name
                );
            }

            if (loggedInUser.email) {
                localStorage.setItem(
                    "email",
                    loggedInUser.email
                );
            }

            setUser(loggedInUser);
        }

        setToken(jwt);
    };


    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setToken("");
        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth =
    () => useContext(AuthContext);