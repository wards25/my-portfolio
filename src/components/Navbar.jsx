import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      opacity: 0,
      y: "-100%",
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: -20 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-gray-800/70 border-b border-gray-700/30 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <motion.a 
          href="#hero" 
          className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          dev.ward
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-orange-400 relative group"
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* Hamburger for mobile */}
        <motion.div 
          className="md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
          >
            {isOpen ? (
              <X size={24} className="text-orange-400" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden"
          >
            <motion.div 
              className="px-4 pb-4 space-y-3 text-center bg-gray-800/80 backdrop-blur-sm"
              variants={{
                open: { 
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                closed: { 
                  transition: { staggerChildren: 0.1, staggerDirection: -1 }
                }
              }}
            >
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 hover:text-orange-400 text-lg"
                  onClick={toggleMenu}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    color: "#fb923c" // orange-400
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}