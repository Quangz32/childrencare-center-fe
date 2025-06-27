"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import RoundedButton from "@/components/common/RoundedButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const navItems = [
    { name: "Progress", title: "Hành trình", href: "/progress" },
    { name: "Guides", title: "Hướng dẫn", href: "/guides" },
    { name: "Centers", title: "Trung tâm cho bé", href: "/centers" },
    { name: "Qa", title: "Hỏi đáp", href: "/qa" },
    { name: "Solution", title: "Giải pháp", href: "/solution" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {" "}
            {/* space-x-4 */}
            {/* Tạm thời để solution*/}
            <Link href="/solution" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#002249] whitespace-nowrap">
                Ánh Dương 🌈
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-x-8">
            <div className="flex items-center gap-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 py-2 rounded-md text-base font-[550] text-[#292E35] whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            {!isLoading && !isAuthenticated && (
              <div className="flex items-center gap-x-2 ml-6">
                <Link href="/login">
                  <RoundedButton
                    text="Đăng nhập ngay"
                    onClick={() => {}}
                    className="min-w-[120px] text-center px-6 py-2 text-base rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-black shadow-lg font-bold transition-all duration-150"
                  />
                </Link>
                <Link href="/register">
                  <RoundedButton
                    text="Đăng ký tư vấn"
                    onClick={() => {}}
                    className="min-w-[140px] text-center px-6 py-2 text-base rounded-full bg-green-500 hover:bg-green-600 border-2 border-black shadow-lg font-bold transition-all duration-150"
                  />
                </Link>
              </div>
            )}
            {!isLoading && isAuthenticated && (
              <div className="relative ml-6" ref={dropdownRef}>
                <div
                  className="flex items-center cursor-pointer px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen((v) => !v)}
                >
                  <span className="font-semibold text-[#0070F4] mr-2">
                    {user?.fullName || "Tài khoản"}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      href="/myprofile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-t-lg"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Tài khoản của tôi
                    </Link>
                    <div
                      className="block px-4 py-2 text-red-600 hover:bg-blue-50 rounded-b-lg cursor-pointer"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                    >
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          {!isLoading && !isAuthenticated && (
            <>
              <Link href="/login">
                <RoundedButton
                  text="Đăng nhập ngay"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2"
                />
              </Link>
              <Link href="/register">
                <RoundedButton
                  text="Đăng ký tư vấn"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 bg-green-500 hover:bg-green-600"
                />
              </Link>
            </>
          )}
          {!isLoading && isAuthenticated && (
            <div className="mt-2">
              <Link
                href="/myprofile"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-t-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Tài khoản của tôi
              </Link>
              <div
                className="block px-4 py-2 text-red-600 hover:bg-blue-50 rounded-b-lg cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
              >
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
