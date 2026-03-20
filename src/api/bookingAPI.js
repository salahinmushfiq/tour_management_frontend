//src/api/bookingAPI.js
import api from '../api/axiosInstance';
const API_BASE = import.meta.env.VITE_API_URL;
export const fetchBookings = async (page = 0, pageSize = 10, organizerId = null, tourId = null) => {
  const params = {
    page: page + 1,
    page_size: pageSize,
  };

  if (organizerId) params.organizer = organizerId;
  if (tourId) params.tour = tourId;

  const res = await api.get("/bookings/", { params });

  return {
    bookings: res.data.results,
    total: res.data.count,
  };
};

// Add cash entry for a booking
export const cashCollect = async (bookingId, amount) => {
  const { data } = await api.post("/payments/cash/", {
    booking: bookingId,
    amount,
  });
  return data;
};

// Verify full payment manually
export const verifyPayment = async (bookingId) => {
  await api.patch(`/bookings/${bookingId}/verify/`);
};

/**
 * Initiate an online payment for a booking
 * @param {string} bookingId
 * @param {number} amount
 * @returns {Promise<Object>} Gateway redirect info
 */
export const initiateOnlinePayment = async (bookingId, amount) => {
  const { data } = await api.post("/payments/initiate/", {
    booking: bookingId,
    amount,
    method: "sslcommerz",
  });
  return data;
};