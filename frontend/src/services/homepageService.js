import apiClient from "./apiClient";

const homepageService = {
  getBanners: () => apiClient.get("/homepage/banners/"),
};

export default homepageService;
