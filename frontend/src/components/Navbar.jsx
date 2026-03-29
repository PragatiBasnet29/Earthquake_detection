// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import logo from "../assets/images/logo-01.png"

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const linkClass = "text-white/90 text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white";

  return (
    <nav className="sticky top-0 z-50 bg-[#0492c2] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-white font-bold text-sm leading-tight hidden sm:block">
            Earthquake<br/>Alert System
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/home" className={linkClass}>Home</Link>
          <Link to="/live-data" className={linkClass}>Live Data</Link>
          <Link to="/safety" className={linkClass}>Safety Measures</Link>
          <Link to="/about" className={linkClass}>About</Link>
          <Link to="/contact" className={linkClass}>Contact Us</Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white text-2xl p-1 rounded focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-sky-200 shadow-xl rounded-b-2xl overflow-hidden">
          <div className="flex flex-col divide-y divide-gray-100">
            <Link to="/home" onClick={toggleMenu} className="text-[#0492c2] font-medium px-6 py-4 hover:bg-sky-50 transition-colors">Home</Link>
            <Link to="/live-data" onClick={toggleMenu} className="text-[#0492c2] font-medium px-6 py-4 hover:bg-sky-50 transition-colors">Live Data</Link>
            <Link to="/safety" onClick={toggleMenu} className="text-[#0492c2] font-medium px-6 py-4 hover:bg-sky-50 transition-colors">Safety Measures</Link>
            <Link to="/about" onClick={toggleMenu} className="text-[#0492c2] font-medium px-6 py-4 hover:bg-sky-50 transition-colors">About</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-[#0492c2] font-medium px-6 py-4 hover:bg-sky-50 transition-colors">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
