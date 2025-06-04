"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Progress", title: "Theo dõi tiến độ", href: "/progress" },
    { name: "Guides", title: "Hướng dẫn", href: "/guides" },
    { name: "Centers", title: "Trung tâm cho bé", href: "/centers" },
    { name: "Community", title: "Cộng đồng", href: "/community" },
    { name: "Qa", title: "Trẻ hỏi chuyên gia trả lời", href: "/qa" },
    { name: "Solution", title: "Giải pháp", href: "/solution" },
    { name: "Advisory", title: "Đăng ký tư vấn", href: "/advisory" },
  ];

  const isActive = (path: string) => pathname === path;

  const lastNavItemStyle = {
    border: "1px solid #000",
    backgroundColor: "#0070F4", // Màu nền xanh
    borderRadius: "100px", // Bo viền
    boxShadow: "0.67px 1.33px 0px 0px #000000", // Đổ bóng
    color: "#fff",
    marginLeft: "8px",
    fontWeight: "bold",
    padding: "10px 16px",
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {" "}
            {/* space-x-4 */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#002249]">
                Children Care Center
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-[10px] py-[10px] rounded-md text-base font-[550] text-[#292E35] ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                style={index === navItems.length - 1 ? lastNavItemStyle : {}}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon for closing menu */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
