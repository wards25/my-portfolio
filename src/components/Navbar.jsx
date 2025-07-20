import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navbarRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Get all sections
      const sections = document.querySelectorAll('section');
      let currentSection = 'hero';
      
      // Determine which section is in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 100) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm py-2 shadow-lg' : 'bg-gray-900 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#hero" 
            className="text-2xl font-bold"
            onClick={closeMenu}
          >
            dev.ward
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`hover:text-orange-400 transition-colors duration-200 relative group ${
                  activeSection === item.id ? 'text-orange-400' : ''
                }`}
              >
                {item.label}
                <span className={`absolute left-0 bottom-0 h-0.5 ${
                  activeSection === item.id ? 'w-full bg-orange-400' : 'w-0 bg-orange-400 group-hover:w-full'
                } transition-all duration-300`}></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
      }`}>
        <div className="px-4 pt-2 pb-4 space-y-4 flex flex-col">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 ${
                activeSection === item.id 
                  ? 'text-orange-400 bg-gray-700' 
                  : 'hover:text-orange-400'
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}