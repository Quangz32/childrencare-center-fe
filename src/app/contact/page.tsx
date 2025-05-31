'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you would handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! This is a placeholder - actual form submission will be implemented later.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Contact Us</h1>
        <p className="text-lg mb-6">
          We're here to answer your questions about our childcare services.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Location</h2>
              <p className="text-gray-700 mb-2">123 Children Care Street</p>
              <p className="text-gray-700 mb-2">Your City, State 12345</p>
              <p className="text-gray-700 mb-2">Country</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-2">Phone: (123) 456-7890</p>
              <p className="text-gray-700 mb-2">Email: info@childrencarecenter.com</p>
              <p className="text-gray-700 mb-2">Hours: Monday-Friday: 8am-6pm</p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 