import React from "react";

const Organizers = () => {
  const organizers = [
    { name: "Wanderlust Co.", desc: "Adventure travel specialists.", emoji: "🌍" },
    { name: "CityExplorers", desc: "Urban tour guides.", emoji: "🏙️" },
    { name: "NatureQuest", desc: "Eco-tourism experts.", emoji: "🌲" },
  ];

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">Featured Organizers</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {organizers.map((org, idx) => (
          <div key={idx} className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">{org.emoji}</div>
            <h3 className="text-xl font-semibold">{org.name}</h3>
            <p className="text-gray-600">{org.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organizers;
