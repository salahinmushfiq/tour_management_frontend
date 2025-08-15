import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";

export default function ParticipantsTab({ tourId }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchParticipants() {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/tours/${tourId}/participants/`);
        setParticipants(res.data);
        console.log("participants data");
        console.log(res.data);
      } catch (err) {
        setError("Failed to load participants.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, [tourId]);

  if (loading) {
    return <p>Loading participants...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (participants.length === 0) {
    return <p>No participants found for this tour.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Participants</h2>
      <ul className="space-y-2">
        {participants.map((participant) => (
          <li
            key={participant.id}
            className="p-2 border rounded bg-gray-50 dark:bg-gray-800"
          >
            <p>
              <strong>Name:</strong> {participant.name || participant.email}
            </p>
            <p>
              <strong>Email:</strong> {participant.email}
            </p>
            {/* Add more participant info as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
