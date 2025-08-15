// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const dummyEvents = {
//   "2025-07-20": [
//     { title: "Sundarbans Adventure", organizer: "Eco Trekker" },
//     { title: "Dhaka City Heritage Walk", organizer: "Urban Tours" },
//   ],
//   "2025-07-21": [{ title: "Cox’s Bazar Beach Cleanup", organizer: "Green Travels" }],
//   "2025-07-23": [{ title: "Hill Tracts Camping", organizer: "TribeX" }],
// };

// const formatDateKey = (date) => date.toISOString().split("T")[0];

// const CalendarSection = () => {
//   const [date, setDate] = useState(new Date());
//   const selectedKey = formatDateKey(date);
//   const events = dummyEvents[selectedKey] || [];

//   return (
//     <section className="py-20 bg-gradient-to-br from-indigo-50 to-white text-center">
//       <h2 className="text-4xl font-bold text-gray-800 mb-6">Tour Event Calendar</h2>
//       <p className="text-gray-600 mb-8 max-w-xl mx-auto">
//         Select a date to view scheduled tours by organizers.
//       </p>

//       <div className="flex justify-center">
//         <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
//           <Calendar
//             onChange={setDate}
//             value={date}
//             tileContent={({ date, view }) => {
//               const key = formatDateKey(date);
//               return view === "month" && dummyEvents[key] ? (
//                 <div className="flex justify-center mt-1">
//                   <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
//                 </div>
//               ) : null;
//             }}
//             tileClassName={({ date, view }) => {
//               const base =
//                 "relative text-sm p-2 rounded-md transition duration-200";
//               const isToday =
//                 view === "month" &&
//                 formatDateKey(date) === formatDateKey(new Date());

//               return `${base} ${
//                 isToday
//                   ? "bg-indigo-100 text-indigo-800 font-semibold"
//                   : "hover:bg-indigo-50 hover:text-indigo-700"
//               }`;
//             }}
//             className="border-0 text-gray-800 [&_abbr]:no-underline [&_abbr]:font-medium"
//           />
//         </div>
//       </div>

//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-gray-700">
//           {events.length > 0
//             ? `Events on ${date.toDateString()}`
//             : `No tours scheduled for ${date.toDateString()}`}
//         </h3>
//         {events.length > 0 && (
//           <ul className="mt-4 space-y-2 max-w-md mx-auto text-left text-gray-600">
//             {events.map((event, idx) => (
//               <li
//                 key={idx}
//                 className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
//               >
//                 <p className="font-medium text-gray-800">{event.title}</p>
//                 <p className="text-sm text-gray-500">Organized by {event.organizer}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CalendarSection;

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";

const dummyEvents = {
  "2025-07-20": [
    {
      title: "Sundarbans Adventure",
      organizer: "Eco Trekker",
      image: "https://images.pexels.com/photos/942326/pexels-photo-942326.jpeg",
      location: "Sundarbans",
      category: "Adventure",
    },
    {
      title: "Dhaka City Heritage Walk",
      organizer: "Urban Tours",
      image: "https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg",
      location: "Dhaka",
      category: "Heritage",
    },
  ],
  "2025-07-21": [
    {
      title: "Cox’s Bazar Beach Cleanup",
      organizer: "Green Travels",
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
      location: "Cox’s Bazar",
      category: "Eco",
    },
  ],
  "2025-07-23": [
    {
      title: "Hill Tracts Camping",
      organizer: "TribeX",
      image: "https://images.pexels.com/photos/1234391/pexels-photo-1234391.jpeg",
      location: "Bandarban",
      category: "Nature",
    },
  ],
};

const formatDateKey = (date) => date.toISOString().split("T")[0];

// const CalendarSection = () => {
//   const [date, setDate] = useState(new Date());
//   const [locationFilter, setLocationFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   const selectedKey = formatDateKey(date);
//   const rawEvents = dummyEvents[selectedKey] || [];

//   const filteredEvents = rawEvents.filter((event) => {
//     const matchLocation = locationFilter
//       ? event.location.toLowerCase().includes(locationFilter.toLowerCase())
//       : true;
//     const matchCategory = categoryFilter
//       ? event.category === categoryFilter
//       : true;
//     return matchLocation && matchCategory;
//   });

//   return (
//     <section className="py-20 bg-gradient-to-br from-indigo-50 to-white text-center">
//       <motion.h2
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-4xl font-bold text-gray-800 mb-6"
//       >
//         Tour Event Calendar
//       </motion.h2>
//       <p className="text-gray-600 mb-8 max-w-xl mx-auto">
//         Select a date and filter events by location or category.
//       </p>

//       {/* 🔍 Filter Bar */}
//       <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 px-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by location"
//           value={locationFilter}
//           onChange={(e) => setLocationFilter(e.target.value)}
//           className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//         />
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//         >
//           <option value="">All Categories</option>
//           <option value="Adventure">Adventure</option>
//           <option value="Eco">Eco</option>
//           <option value="Nature">Nature</option>
//           <option value="Heritage">Heritage</option>
//         </select>
//         <button
//           onClick={() => {}}
//           className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//         >
//           Search
//         </button>
//       </div>

//       {/* 📅 Calendar */}
//       <div className="flex justify-center">
//         <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
//           <Calendar
//             onChange={setDate}
//             value={date}
//             tileContent={({ date, view }) => {
//               const key = formatDateKey(date);
//               return view === "month" && dummyEvents[key] ? (
//                 <div className="flex justify-center mt-1">
//                   <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping"></span>
//                 </div>
//               ) : null;
//             }}
//             tileClassName={({ date, view }) => {
//               const base =
//                 "relative text-sm p-2 rounded-md transition duration-200";
//               const isToday =
//                 view === "month" &&
//                 formatDateKey(date) === formatDateKey(new Date());

//               return `${base} ${
//                 isToday
//                   ? "bg-indigo-100 text-indigo-800 font-semibold"
//                   : "hover:bg-indigo-50 hover:text-indigo-700"
//               }`;
//             }}
//             className="border-0 text-gray-800 [&_abbr]:no-underline [&_abbr]:font-medium"
//           />
//         </div>
//       </div>

//       {/* 🗂️ Events */}
//       <div className="mt-12 px-4">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">
//           {filteredEvents.length > 0
//             ? `Events on ${date.toDateString()}`
//             : `No events found for ${date.toDateString()}`}
//         </h3>

//         {filteredEvents.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             <AnimatePresence>
//               {filteredEvents.map((event, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3, delay: idx * 0.1 }}
//                   className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition transform"
//                 >
//                   <div className="overflow-hidden">
//                     <img
//                       loading="lazy"
//                       src={event.image}
//                       alt={event.title}
//                       className="w-full h-40 object-cover transform hover:scale-105 transition duration-300"
//                     />
//                   </div>
//                   <div className="p-4 text-left">
//                     <h4 className="text-lg font-semibold text-gray-800">
//                       {event.title}
//                     </h4>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Organizer: {event.organizer}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Location: {event.location}
//                     </p>
//                     <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
//                       {event.category}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         ) : ( <div className="flex flex-col items-center mt-10 text-gray-500">
//              <img
//               src="https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@14.0.0/color/svg/1FAE1.svg
// "
//               alt="Calendar illustration"
//               className="w-64 mx-auto"
// />
//               <p className="text-sm">Try another date or adjust your filters.</p>
//             </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CalendarSection;
// const CalendarSection = () => {
//   const [date, setDate] = useState(new Date());
//   const [locationFilter, setLocationFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   const selectedKey = formatDateKey(date);
//   const rawEvents = dummyEvents[selectedKey] || [];

//   const filteredEvents = rawEvents.filter((event) => {
//     const matchLocation = locationFilter
//       ? event.location.toLowerCase().includes(locationFilter.toLowerCase())
//       : true;
//     const matchCategory = categoryFilter
//       ? event.category === categoryFilter
//       : true;
//     return matchLocation && matchCategory;
//   });

//   return (
//     <section className="min-h-screen w-full bg-brand-dark bg-cover text-white font-sans bg-fixed  bg-center " style={{ backgroundImage: `url('https://images.pexels.com/photos/942326/pexels-photo-942326.jpeg')` }}>
     
//       <div className="bg-black bg-opacity-50">
//            {/* Hero */}
//       <header className="relative h-64 md:h-80  flex items-center justify-center" >
//         <div className="absolute inset-0  " />
//         <motion.h1
//           className="z-10 text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           Tour Event Calendar
//         </motion.h1>
//       </header>

//       {/* Filters */}
//       <div className="max-w-6xl mx-auto -mt-10 mb-8 px-4 z-20 relative ">
//         <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-4 border border-white/20">
//           <input
//             type="text"
//             placeholder="Search by location"
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//             className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">All Categories</option>
//             <option value="Adventure">Adventure</option>
//             <option value="Eco">Eco</option>
//             <option value="Nature">Nature</option>
//             <option value="Heritage">Heritage</option>
//           </select>
//           <button
//             onClick={() => {}}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 gap-6 ">
//         {/* Calendar Section */}
//         <motion.div
//           className="w-full md:w-1/2 bg-dark/50 backdrop-blur-md rounded-xl p-6 "
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Calendar
//             onChange={setDate}
//             value={date}
//             tileContent={({ date, view }) => {
//               const key = formatDateKey(date);
//               return view === "month" && dummyEvents[key] ? (
//                 <div className="flex justify-center mt-1">
//                   <span className="h-1.5 w-1.5 bg-green-600 rounded-full animate-ping"></span>
//                 </div>
//               ) : null;
//             }}
//             tileClassName={({ date, view }) => {
//               const isToday =
//                 view === "month" &&
//                 formatDateKey(date) === formatDateKey(new Date());
//               return isToday
//                 ? "bg-indigo-600 text-white font-bold"
//                 : "hover:bg-indigo-200/20 text-white";
//             }}
//             className="react-calendar text-white [&_abbr]:text-sm [&_abbr]:no-underline bg-dark/0 border-none"
//           />
//         </motion.div>

//         {/* Events Section */}
//         <motion.div
//           className="w-full md:w-1/2 overflow-y-auto max-h-[600px] scrollbar-none"
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h3 className="text-xl font-semibold mb-4">
//             {filteredEvents.length > 0
//               ? `Events on ${date.toDateString()}`
//               : `No events on ${date.toDateString()}`}
//           </h3>

//           <AnimatePresence>
//             {filteredEvents.length > 0 ? (
//               filteredEvents.map((event, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="mb-6 bg-white/0 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3, delay: idx * 0.1 }}
//                 >
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4 text-white">
//                     <h4 className="text-lg font-semibold">{event.title}</h4>
//                     <p className="text-sm text-gray-300">
//                       Organizer: {event.organizer}
//                     </p>
//                     <p className="text-sm text-gray-300">
//                       Location: {event.location}
//                     </p>
//                     <span className="inline-block mt-2 px-3 py-1 text-xs bg-indigo-700 text-white rounded-full">
//                       {event.category}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <motion.div
//                 className="text-center text-gray-400 mt-10"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <img
//                   src="https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@14.0.0/color/svg/1FAE1.svg"
//                   alt="No events"
//                   className="w-28 mx-auto mb-4"
//                 />
//                 <p>Try another date or use different filters.</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//       </div>
     
//     </section>
//   );
// };

// export default CalendarSection;


// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { motion, AnimatePresence } from "framer-motion";

// const dummyEvents = {
//   "2025-07-20": [
//     {
//       title: "Sundarbans Adventure",
//       organizer: "Eco Trekker",
//       image: "https://images.pexels.com/photos/942326/pexels-photo-942326.jpeg",
//       location: "Sundarbans",
//       category: "Adventure",
//     },
//     {
//       title: "Dhaka City Heritage Walk",
//       organizer: "Urban Tours",
//       image: "https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg",
//       location: "Dhaka",
//       category: "Heritage",
//     },
//   ],
//   "2025-07-21": [
//     {
//       title: "Cox’s Bazar Beach Cleanup",
//       organizer: "Green Travels",
//       image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
//       location: "Cox’s Bazar",
//       category: "Eco",
//     },
//   ],
//   "2025-07-23": [
//     {
//       title: "Hill Tracts Camping",
//       organizer: "TribeX",
//       image: "https://images.pexels.com/photos/1234391/pexels-photo-1234391.jpeg",
//       location: "Bandarban",
//       category: "Nature",
//     },
//   ],
// };

// const formatDateKey = (date) => date.toISOString().split("T")[0];

const CalendarSection = () => {
   const [date, setDate] = useState(new Date());
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const selectedKey = formatDateKey(date);
  const rawEvents = dummyEvents[selectedKey] || [];

  const filteredEvents = rawEvents.filter((event) => {
    const matchLocation = locationFilter
      ? event.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchCategory = categoryFilter ? event.category === categoryFilter : true;
    return matchLocation && matchCategory;
  });

  return (
<section
      className="min-h-screen w-full bg-fixed bg-center bg-cover text-white font-sans relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/32984669/pexels-photo-32984669.jpeg')`,
      }}
    >
      {/* Backdrop blur + dark overlay covering entire section */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <motion.header
          className="relative h-72 md:h-96 flex items-center justify-center text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold drop-shadow-xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tour Event Calendar
          </motion.h1>
        </motion.header>

        {/* Filters */}
        <div className="max-w-5xl mx-auto -mt-14 px-4 z-20 relative w-full z-10">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">All Categories</option>
              <option value="Adventure">Adventure</option>
              <option value="Eco">Eco</option>
              <option value="Nature">Nature</option>
              <option value="Heritage">Heritage</option>
            </select>
            <button
              onClick={() => {
                // Optionally reset filters or trigger a search (currently no-op)
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-10 flex-1 z-10">
          {/* Calendar */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={({ date, view }) => {
                const key = formatDateKey(date);
                return view === "month" && dummyEvents[key] ? (
                  <div className="flex justify-center mt-1">
                    <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-ping"></span>
                  </div>
                ) : null;
              }}
              tileClassName={({ date, view }) => {
                const isToday =
                  view === "month" && formatDateKey(date) === formatDateKey(new Date());

                return [
                  "transition-colors duration-200 rounded-md px-2",
                  "hover:bg-indigo-500 hover:text-white",
                  isToday ? "bg-indigo-600 text-white font-bold" : "text-white",
                ].join(" ");
              }}
              className="react-calendar text-white bg-white/5 rounded-xl p-4"
            />
          </motion.div>

          {/* Events */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">
              {filteredEvents.length > 0
                ? `Events on ${date.toDateString()}`
                : `No events on ${date.toDateString()}`}
            </h3>

            <AnimatePresence>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    className="mb-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    {/* Event images carousel if multiple images */}
                    {event.images && event.images.length > 1 ? (
                      <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-48 rounded-t-xl"
                      >
                        {event.images.map((imgUrl, i) => (
                          <SwiperSlide key={i}>
                            <img
                              src={imgUrl}
                              alt={`${event.title} - slide ${i + 1}`}
                              className="w-full h-48 object-cover rounded-t-xl"
                              loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      // Single image fallback
                      <img
                        src={event.image || (event.images && event.images[0])}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                        loading="lazy"
                      />
                    )}

                    <div className="p-4 text-white">
                      <h4 className="text-lg font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-300">Organizer: {event.organizer}</p>
                      <p className="text-sm text-gray-300">Location: {event.location}</p>
                      <span className="inline-block mt-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="text-center text-gray-300 mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@14.0.0/color/svg/1FAE1.svg"
                    alt="No events"
                    className="w-24 mx-auto mb-4"
                  />
                  <p>Try another date or change the filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
