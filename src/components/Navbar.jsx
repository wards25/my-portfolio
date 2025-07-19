import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold">
          dev.ward
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#hero" className="hover:text-orange-400">Home</a>
          <a href="#about" className="hover:text-orange-400">About</a>
          <a href="#skills" className="hover:text-orange-400">Skills</a>
          <a href="#projects" className="hover:text-orange-400">Projects</a>
          <a href="#contact" className="hover:text-orange-400">Contact</a>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2 text-center">
          <a href="#hero" className="block hover:text-orange-400" onClick={toggleMenu}>Home</a>
          <a href="#about" className="block hover:text-orange-400" onClick={toggleMenu}>About</a>
          <a href="#skills" className="block hover:text-orange-400" onClick={toggleMenu}>Skills</a>
          <a href="#projects" className="block hover:text-orange-400" onClick={toggleMenu}>Projects</a>
          <a href="#contact" className="block hover:text-orange-400" onClick={toggleMenu}>Contact</a>
        </div>
      )}
    </nav>
  );
}
