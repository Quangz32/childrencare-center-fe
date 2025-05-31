'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function Appointments() {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you would handle form submission
    console.log('Appointment requested:', formData);
    alert('Thank you for booking an appointment! This is a placeholder - actual appointment booking will be implemented later.');
    // Reset form
    setFormData({
      childName: '',
      childAge: '',
      parentName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      reason: '',
      additionalInfo: ''
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Book an Appointment</h1>
        <p className="text-lg mb-6">
          Schedule an appointment with one of our childcare specialists.
        </p>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Appointment Request Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="childName" className="block text-gray-700 mb-2">Child's Name</label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="childAge" className="block text-gray-700 mb-2">Child's Age</label>
                <input
                  type="text"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="parentName" className="block text-gray-700 mb-2">Parent/Guardian Name</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
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
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="preferredTime" className="block text-gray-700 mb-2">Preferred Time</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                  <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                  <option value="Evening (3PM-6PM)">Evening (3PM-6PM)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-gray-700 mb-2">Reason for Appointment</label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a reason</option>
                <option value="Regular Checkup">Regular Checkup</option>
                <option value="Developmental Assessment">Developmental Assessment</option>
                <option value="Nutritional Consultation">Nutritional Consultation</option>
                <option value="Behavioral Consultation">Behavioral Consultation</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="additionalInfo" className="block text-gray-700 mb-2">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
} 