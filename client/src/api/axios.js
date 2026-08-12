import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api"
});

/*
 * Attach JWT token to every request
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        /*
         * Do not force application/json here.
         *
         * Axios/browser will automatically set the correct
         * Content-Type for FormData uploads, including the
         * multipart boundary.
         */
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

/*
 * Handle authentication errors
 */
api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            console.warn(
                "Authentication failed:",
                error.response?.data?.message
            );
        }

        return Promise.reject(error);
    }
);

export default api;