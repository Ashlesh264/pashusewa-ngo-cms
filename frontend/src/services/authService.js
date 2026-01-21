import apiClient from "./apiClient";

const authService = {
    register: (form) => apiClient.post("/userauth/register/", form),
    adminAddedUser: (form) => apiClient.post("/userauth/admin-added-user/", form),
    verifyEmail: (email, otp) => apiClient.post("/userauth/verify-email/", { email, otp }),
    login: (email, password) => apiClient.post("/userauth/login/", { email, password }),
    getDashboard: () => apiClient.get("/userauth/dashboard/"),
    resetPassword: (email, new_password) => apiClient.post("/userauth/reset-password/", { email, new_password }),
    logout: (email) => apiClient.post("/userauth/logout/", { email }),
    resendOtp: (email, purpose) => apiClient.post("/userauth/resend-otp/", { email, purpose }),
    getUsers: () => apiClient.get("/userauth/users-list/")
};

export default authService;
