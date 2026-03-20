// const NotFound = () => (
//   <div className="text-center p-10">
//     <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
//     <p>The page you're looking for doesn't exist.</p>
//   </div>
// );
// export default NotFound;
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiMap, FiChevronLeft } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* --- Visual Illustration Area --- */}
        <div className="relative">
          {/* Large Stylized 404 Background */}
          <h1 className="text-[12rem] md:text-[16rem] font-black text-gray-100 dark:text-slate-800 leading-none select-none">
            404
          </h1>
          
          {/* Floating Icon/Message Over the 404 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 animate-bounce">
              <FiMap size={48} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Lost in the Wild?
            </h2>
          </div>
        </div>

        {/* --- Text Content --- */}
        <div className="space-y-3">
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-md mx-auto">
            Oops! It looks like the trail you're following doesn't exist. 
            The page might have been moved or the link is broken.
          </p>
        </div>

        {/* --- Navigation Actions --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors"
          >
            <FiChevronLeft /> Go Back
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 transition-all active:scale-95"
          >
            <FiHome /> Back to Home
          </button>
        </div>

        {/* --- Decorative Subtle Elements --- */}
        <div className="pt-12 flex justify-center gap-8 opacity-20 dark:opacity-10">
          <div className="h-1 w-24 bg-gray-400 rounded-full" />
          <div className="h-1 w-12 bg-gray-400 rounded-full" />
          <div className="h-1 w-24 bg-gray-400 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;