// context/SidebarContext.js (optional)
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};
