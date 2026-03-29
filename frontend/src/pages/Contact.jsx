import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: '', // 'success' | 'error' | 'loading'
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <div className="px-6 py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0492c2] mb-10 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-[#0492c2] mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions or suggestions about the Earthquake Alert System? Feel free to reach out to us. 
              We're here to help and improve our system for a safer community.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#0492c2]/10 p-3 rounded-lg text-[#0492c2]">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Email</h3>
                  <a href="mailto:pragatibasnet123@gmail.com" className="text-gray-600 hover:text-[#0492c2] transition-colors">
                    pragatibasnet123@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#0492c2]/10 p-3 rounded-lg text-[#0492c2]">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/pragati-basnet-573106263/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-[#0492c2] transition-colors"
                  >
                    Pragati Basnet
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#0492c2]/10 p-3 rounded-lg text-[#0492c2]">
                  <FaXTwitter size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">X (formerly Twitter)</h3>
                  <a 
                    href="https://x.com/PragatiBasnet29" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-[#0492c2] transition-colors"
                  >
                    @PragatiBasnet29
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#0492c2] mb-6">Send a Message</h2>
            
            {status.message && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0492c2]/20 focus:border-[#0492c2] outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0492c2]/20 focus:border-[#0492c2] outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0492c2]/20 focus:border-[#0492c2] outline-none transition-all"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status.type === 'loading'}
                className="w-full bg-[#0492c2] hover:bg-[#037da7] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg active:transform active:scale-[0.98]"
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
