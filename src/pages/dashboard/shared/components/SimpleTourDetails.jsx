// src/components/tours/SimpleTourDetails.jsx
import React from "react";

export default function SimpleTourDetails({ tour,guides,offers }) {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">{tour.title}</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Organized by: <strong>{tour.organizer}</strong>
      </p>

      {tour.cover_image && (
        <img
          src={tour.cover_image}
          alt={tour.title}
          className="w-full h-72 object-cover rounded shadow"
        />
      )}

      <section className="space-y-2">
        <p className="text-gray-700 dark:text-gray-300">{tour.description}</p>
        <p><strong>Category:</strong> {tour.category}</p>
        <p><strong>Cost per person:</strong> ${tour.cost_per_person}</p>
        <p><strong>Participants:</strong> up to {tour.max_participants}</p>
        <p><strong>Start:</strong> {tour.start_date} ({tour.start_location})</p>
        <p><strong>End:</strong> {tour.end_date} ({tour.end_location})</p>
      </section>

      <div className="space-y-10">
        {/* Guide Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Guides</h2>
          {guides?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {guide.name}
                  </h3>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {guide.user_email}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {guide.bio}
                  </p>
                  {/* <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Languages: {guide.languages.join(", ")}
                  </p> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No guides available</p>
          )}
        </div>
        {/* Offers Section */}
         <div>
          <h2 className="text-xl font-semibold mb-4">Offers</h2>
          {offers?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {offer.description}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                    ${offer.price}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No offers available</p>
          )}
        </div>
      </div>
    </div>
  );
}

