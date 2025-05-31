'use client';

import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Children Care Center</h2>
              <p className="text-sm mt-1">Caring for your children's health and wellbeing</p>
            </div>
            <div className="text-sm">
              <p>&copy; {new Date().getFullYear()} Children Care Center. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 