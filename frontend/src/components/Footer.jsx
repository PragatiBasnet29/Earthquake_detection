// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from "../assets/images/logo-01.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Logo and Project Name */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-base leading-tight">
              Earthquake<br/>Alert System
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Real-time earthquake detection and alert system powered by IoT sensors.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li><Link to="/home" className="text-gray-300 text-sm hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/live-data" className="text-gray-300 text-sm hover:text-white transition-colors">Live Data</Link></li>
            <li><Link to="/safety" className="text-gray-300 text-sm hover:text-white transition-colors">Safety Measures</Link></li>
            <li><Link to="/about" className="text-gray-300 text-sm hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-gray-300 text-sm hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Follow Us</h3>
          <div className="flex gap-5">
            <a href="https://x.com/PragatiBasnet29" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors text-2xl">
              <FaXTwitter />
            </a>
            <a href="https://www.linkedin.com/in/pragati-basnet-573106263/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Contact Us</h3>
          <a
            href="mailto:pragatibasnet123@gmail.com"
            className="flex items-center gap-2 text-gray-300 text-sm hover:text-white transition-colors"
          >
            <FaEnvelope className="shrink-0" />
            <span>pragatibasnet123@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 px-6 text-center">
        <p className="text-gray-500 text-xs">&copy; 2024 Earthquake Detection &amp; Alert System. All rights reserved.</p>
        <p className="text-gray-600 text-xs mt-1">Designed and developed by QuadraCrafters.</p>
      </div>
    </footer>
  );
};

export default Footer;
