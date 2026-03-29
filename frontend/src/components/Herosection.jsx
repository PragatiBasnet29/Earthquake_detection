// HeroSection.js
import React from 'react';
import IllustrationImage from '../assets/svgs/earthquake.svg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Text content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Navigating Earthquakes:<br/>
            <span className="text-[#0492c2]">A Guide to Safety</span> and Preparedness
          </h1>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
            Stay Informed, Stay Safe: The Ultimate Preparedness Companion
          </p>

          <Link
            to="/live-data"
            className="inline-block bg-[#0492c2] text-white py-3 px-8 rounded-full font-semibold text-base shadow-md hover:bg-[#037aaf] hover:shadow-lg transition-all duration-300"
          >
            View Live Data
          </Link>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center w-full">
          <img
            src={IllustrationImage}
            alt="Earthquake Illustration"
            className="w-full max-w-sm md:max-w-md drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
