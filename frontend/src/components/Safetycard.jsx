import React from 'react';
import { Link } from 'react-router-dom';
import image1 from "../assets/images/safety1.jpg";
import image2 from "../assets/images/safety2.jpg";
import image3 from "../assets/images/safety3.jpg";

const Safetycard = () => {
  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0492c2] mb-10">Safety Measures During Earthquake</h2>

        {/* Safety Measure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-5 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-52">
              <img
                src={image1}
                alt="Drop, Cover, and Hold On"
                className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#0492c2] mb-2">1. Drop, Cover, and Hold On</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              When you feel the ground shaking, drop down to your hands and knees, cover your head
              and neck with your arms, and hold on to a sturdy piece of furniture or shelter.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-5 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-52">
              <img
                src={image2}
                alt="Stay Indoors"
                className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#0492c2] mb-2">2. Stay Indoors</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Stay inside and find a safe spot away from windows, heavy furniture, and objects that
              could fall. Avoid doorways and elevators during the shaking.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-5 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-52">
              <img
                src={image3}
                alt="Be Prepared for Aftershocks"
                className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#0492c2] mb-2">3. Be Prepared for Aftershocks</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Earthquakes are often followed by aftershocks. Be prepared for additional shaking and
              take necessary precautions even after the main quake.
            </p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-10">
          <Link
            to="/safety"
            className="inline-block bg-[#0492c2] text-white py-3 px-8 rounded-full font-semibold shadow-md hover:bg-[#037aaf] hover:shadow-lg transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Safetycard;
