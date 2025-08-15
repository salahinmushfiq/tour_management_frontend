import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-center">
      <p>&copy; {new Date().getFullYear()} Multi-Tour Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
