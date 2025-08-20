// import { Moon, Sun } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useTheme } from '../../../../hooks/useTheme';


// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//     >
//       {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//     </button>
//   );
// };

// export default ThemeToggle;


// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../../../../hooks/useTheme";

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div
//       className="flex items-center cursor-pointer select-none"
//       onClick={toggleTheme}
//     >
//       {/* Label icons */}
//       <Sun
//         size={18}
//         className={`transition-colors duration-300 ${
//           theme === "light" ? "text-yellow-400" : "text-gray-400"
//         }`}
//       />
//       <div className="mx-2">
//         {/* Switch */}
//         <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors">
//           <div
//             className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
//               theme === "dark" ? "translate-x-6" : "translate-x-0"
//             }`}
//           />
//         </div>
//       </div>
//       <Moon
//         size={18}
//         className={`transition-colors duration-300 ${
//           theme === "dark" ? "text-indigo-400" : "text-gray-400"
//         }`}
//       />
//     </div>
//   );
// };

// export default ThemeToggle;


import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="relative w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer"
      onClick={toggleTheme}
    >
      {/* Sliding circle */}
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? <Moon size={16} className="text-indigo-500" /> : <Sun size={16} className="text-yellow-400" />}
      </div>

      {/* Optional subtle background icons for context */}
      <Sun className="absolute left-1 top-1.5 text-yellow-200 dark:text-gray-600" size={14} />
      <Moon className="absolute right-1 top-1.5 text-gray-400 dark:text-indigo-200" size={14} />
    </div>
  );
};

export default ThemeToggle;
