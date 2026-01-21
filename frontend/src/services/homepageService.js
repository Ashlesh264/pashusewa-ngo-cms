import apiClient from "./apiClient";

const homepageService = {
  getBanners: () => apiClient.get("/homepage/banners/"),
  getVisionMission: () => apiClient.get("/homepage/vision-mission/"),
  getStatistics: () => apiClient.get("/homepage/statistics/"),
  getInitiatives: () => apiClient.get("/homepage/initiatives/"),
};

export default homepageService;
