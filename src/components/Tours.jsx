import React from "react";

const Tours = () => {
  const tours = [
    { title: "Himalayan Trek", location: "Nepal", duration: "10 days" },
    { title: "Historic Europe", location: "France & Italy", duration: "12 days" },
    { title: "Sundarbans Safari", location: "Bangladesh", duration: "3 days" },
  ];

  return (
    <section id="tours" className="bg-gray-50 py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">Popular Tours</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {tours.map((tour, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
            <p>{tour.location}</p>
            <span className="text-sm text-gray-500">{tour.duration}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tours;
