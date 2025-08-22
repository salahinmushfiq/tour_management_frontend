import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axiosInstance from "../../../api/axiosInstance";

export default function OrganizerHome() {
  const [data, setData] = useState({ stats: {}, recentTours: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/tours/dashboard-stats/");
        setData({
          stats: res.data.stats,
          recentTours: res.data.recent_tours,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { stats, recentTours } = data;

  const cards = [
    { title: "Total Tours", value: stats.total_tours },
    { title: "Approved Bookings", value: stats.approved_bookings },
    { title: "Pending Requests", value: stats.pending_requests },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Organizer Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
          >
            <h2 className="text-gray-500 dark:text-gray-400 text-sm">
              {card.title}
            </h2>
            {loading ? (
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                <CountUp end={card.value ?? 0} duration={1.5} />
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Tours */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent Tours
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <li
                  key={idx}
                  className="py-2 flex justify-between text-gray-700 dark:text-gray-200"
                >
                  <span className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  <span className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                </li>
              ))
            : recentTours.map((t) => (
                <li
                  key={t.id}
                  className="py-2 flex justify-between text-gray-700 dark:text-gray-200"
                >
                  <span>{t.title || "Untitled Tour"}</span>
                  <span className="text-gray-400 text-sm">
                    {t.start_date
                      ? new Date(t.start_date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
