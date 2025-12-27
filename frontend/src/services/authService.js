import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

// Create an axios instance for shared config (like withCredentials)
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const authService = {
    register: (form) => apiClient.post("/register/", form),
    adminAddedUser: (form) => apiClient.post("/admin-added-user/", form),
    verifyEmail: (email, otp) => apiClient.post("/verify-email/", { email, otp }),
    login: (email, password) => apiClient.post("/login/", { email, password }),
    getDashboard: () => apiClient.get("/dashboard/"),
    resetPassword: (email, new_password) => apiClient.post("/reset-password/", { email, new_password }),
    logout: (email) => apiClient.post("/logout/", { email }),
    resendOtp: (email, purpose) => apiClient.post("/resend-otp/", { email, purpose }),
    getUsers: () => apiClient.get("/users-list/")
};

export default authService;
