//src/hooks/useEvents.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/eventsApi";

export const useEvents = (filters) => {
  return useInfiniteQuery({
    queryKey: ["events", filters],
    queryFn: fetchEvents,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page"); // extracts page number from next URL
      }
      return undefined;
    },
    keepPreviousData: true, // preserves previous pages while fetching next
    staleTime: 1000 * 60, // 1 min cache
  });
};