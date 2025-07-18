"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    role: "parent",
    fullName: "",
    gender: "male",
    address: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users", formData);
      if (response.status !== 201 && response.status !== 200) {
        throw new Error("Đăng ký thất bại");
      }
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!"
        );
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-2 sm:p-4" style={{ background: '#FFF8DC' }}>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl p-4 sm:p-8 space-y-4 sm:space-y-8 bg-white rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
            {/* Phần hình ảnh */}
            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
              <div className="relative w-full h-40 sm:h-64 md:h-96">
                <Image
                  src="/images/community/children.png"
                  alt="Trẻ em vui chơi"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-center text-black">
                Đăng ký tài khoản tại Ánh Dương - Người bạn đồng hành của trẻ
              </h2>
            </div>
            {/* Phần form đăng ký */}
            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
                  Đăng ký
                </h1>
                <p className="text-base sm:text-lg text-black">
                  Tạo tài khoản để bắt đầu hành trình mới
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  {/* Các trường nhập liệu */}
                  <div>
                    <label htmlFor="email" className="block text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border-2 border-purple-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border-2 border-purple-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">
                      Mật khẩu
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border-2 border-purple-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="fullName" className="block text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">
                      Họ và tên
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border-2 border-purple-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">
                      Giới tính
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border-2 border-purple-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">
                      Địa chỉ
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border-2 border-purple-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {error && (
                  <div className="p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <p className="text-base sm:text-lg text-black text-center">{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-medium text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
                <div className="flex justify-center mt-4">
                  <Link href="/" className="inline-block border border-black text-blue-600 px-6 py-2 rounded-2xl font-semibold bg-white hover:bg-blue-50 transition">
                    Quay về trang chủ
                  </Link>
                </div>
                <div className="text-center space-y-2 sm:space-y-4">
                  <p className="text-base sm:text-lg text-black">
                    Đã có tài khoản?{' '}
                    <Link
                      href="/login"
                      className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
