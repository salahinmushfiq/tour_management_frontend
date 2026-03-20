// api/tourApi.js
import api from "./axiosInstance";

export const fetchGuides = async () => {
  const { data } = await api.get("/guides/");
  return data;
};

export const assignGuideToTour = async ({ tourId, guideId }) => {
  const { data } = await api.post(`/tours/${tourId}/assign-guide/`, {
    guide_id: guideId,
  });
  return data;
};

export const fetchTours = async () => {
  const { data } = await api.get("/tours/");
  return data;
};

export const fetchTour = async (tourId) => {
  const { data } = await api.get(`/tours/${tourId}/`);
  return data;
};

export const createTour = async (tour) => {
  const { data } = await api.post("/tours/", tour);
  return data;
};

export const updateTour = async (id, tour) => {
  const { data } = await api.put(`/tours/${id}/`, tour);
  return data;
};

export const deleteTour = async (id) => {
  const { data } = await api.delete(`/tours/${id}/`);
  return data;
};


/**
 * Post a new chat message for a tour
 * @param {string} tourId
 * @param {string} message
 * @returns {Promise<Object>}
 */
export const postChatMessage = async (tourId, message) => {
  const { data } = await api.post(`/tours/${tourId}/chat/`, { message });
  return data;
};

/**
 * Submit a rating and review for a tour
 * @param {string} tourId
 * @param {number} rating
 * @param {string} review
 * @returns {Promise<Object>}
 */
export const postTourRating = async (tourId, rating, review) => {
  const { data } = await api.post(`/tours/${tourId}/rate/`, { rating, review });
  return data;
};

