// src/components/layout/Header.jsx
import { Menu } from 'lucide-react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 h-16 z-30">
      <div className="px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold ml-2">Sistema de Chamada</h1>
        </div>
      </div>
    </header>
  );
}