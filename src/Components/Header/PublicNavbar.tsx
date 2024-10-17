import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Menu icon for mobile
import { IoClose } from "react-icons/io5"; // Close icon for mobile
import { motion, AnimatePresence } from "framer-motion"; // For animations

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the mobile menu
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" }, // Hidden state
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }, // Visible state
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    }, // Exit state
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 }, // Links start below and invisible
    visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }, // Animate in with slight delay
  };

  return (
    <header className="bg-neutral bg-opacity-90 backdrop-blur-lg shadow-md fixed top-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center py-5 px-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-primary">StockNewsPro</div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8 text-lg font-medium">
          <a
            href="#"
            className="text-textPrimary hover:text-primary transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-textPrimary hover:text-primary transition duration-300"
          >
            News
          </a>
          <a
            href="#"
            className="text-textPrimary hover:text-primary transition duration-300"
          >
            Predictions
          </a>
          <a
            href="#"
            className="text-textPrimary hover:text-primary transition duration-300"
          >
            Blog
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          <a
            href="#"
            className="px-6 py-2 border border-primary text-primary rounded-btn-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-btn-shadow"
          >
            Sign In
          </a>
          <a
            href="#"
            className="px-6 py-2 bg-primary text-white rounded-btn-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-btn-shadow"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl text-textPrimary focus:outline-none"
          >
            {isOpen ? <IoClose /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-neutral bg-opacity-90 backdrop-blur-lg px-6 py-8 fixed top-0 left-0 w-full h-screen z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-5 right-5 text-3xl text-textPrimary focus:outline-none"
            >
              <IoClose />
            </button>

            <ul className="space-y-6 text-lg font-medium text-textPrimary mt-12">
              {["Home", "News", "Predictions", "Blog"].map((link, i) => (
                <motion.li
                  key={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a
                    href="#"
                    className="block hover:text-primary transition duration-300"
                    onClick={toggleMenu} // Close the menu when clicking any link
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href="#"
                  className="block px-6 py-2 border border-primary text-primary rounded-btn-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-btn-shadow"
                  onClick={toggleMenu}
                >
                  Sign In
                </a>
              </motion.li>
              <motion.li
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href="#"
                  className="block px-6 py-2 bg-primary text-white rounded-btn-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-btn-shadow"
                  onClick={toggleMenu}
                >
                  Get Started
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
