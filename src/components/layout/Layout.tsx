"use client";

import React from "react";
import Navbar from "./Navbar";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaCommentDots } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow bg-white max-w-7xl mx-auto px-4">{children}</main>
      <footer className="bg-blue-600 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cột 1: Thông tin trung tâm */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Ánh Dương 🌈</h2>
              <p className="text-sm mb-4">Đồng hành cùng trẻ em chậm phát triển</p>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2" /> Thạch Hòa, Thạch Thất, Hà Nội
              </div>
              <div className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2" /> 0385 669 226
              </div>
              <div className="flex items-center mb-2">
                <FaEnvelope className="mr-2" /> anhduongcare@gmail.com
              </div>
            </div>
            {/* Cột 2: Liên kết nhanh */}
            <div className="flex flex-col gap-2">
              {/* <h3 className="text-lg font-semibold mb-2">Liên kết nhanh</h3>
              <a href="/" className="hover:underline">Trang chủ</a>
              <a href="/guides" className="hover:underline">Hướng dẫn</a>
              <a href="/centers" className="hover:underline">Trung tâm</a>
              <a href="/community" className="hover:underline">Cộng đồng</a>
              <a href="/qa" className="hover:underline">Hỏi đáp</a> */}
            </div>
            {/* Cột 3: Mạng xã hội */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Kết nối với chúng tôi</h3>
              <div className="flex gap-4 mb-2">
                <a
                  href="https://web.facebook.com/profile.php?id=61577325685154"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100 transition"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://zalo.me/0379446503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100 transition"
                >
                  <FaCommentDots size={20} />
                </a>
              </div>
              <p className="text-xs mt-4">
                &copy; {new Date().getFullYear()} Ánh Dương. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
