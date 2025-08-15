import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../../hooks/useTheme';


// const ThemeToggle = () => {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('theme') === 'dark'
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   return (
//     <button
//       onClick={() => setDarkMode(!darkMode)}
//       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//     >
//       {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//     </button>
//   );
// };

// export default ThemeToggle;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;