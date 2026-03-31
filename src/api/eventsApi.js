// api/eventsApi.js
import axios from "axios";

export const fetchEvents = async ({ pageParam = 1, queryKey }) => {
  const [_key, { search, category, location, startDate, endDate }] = queryKey;

  const params = {
    page: pageParam,
    search: search || undefined,
    category: category || undefined,
    start_location: location || undefined,
    start_date: startDate ? startDate.toISOString().split("T")[0] : undefined,
    end_date: endDate ? endDate.toISOString().split("T")[0] : undefined,
  };

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/tours/`, { params });
  return res.data;
};