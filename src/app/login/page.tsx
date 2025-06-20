"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.status !== 200) {
        throw new Error("Đăng nhập thất bại");
      }

      router.push("/solution");
    } catch {
      setError("Email hoặc mật khẩu không đúng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Phần hình ảnh */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src="/images/community/children.png"
                alt="Trẻ em vui chơi"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-2xl font-bold text-center text-purple-600">
              Chào mừng đến với Trung tâm Chăm sóc Trẻ em
            </h2>
          </div>

          {/* Phần form đăng nhập */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Đăng nhập
              </h1>
              <p className="text-lg text-gray-600">
                Hãy đăng nhập để bắt đầu hành trình vui vẻ
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 text-lg border-2 border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 text-lg border-2 border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-lg text-red-600 text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

              <div className="text-center space-y-4">
                <Link
                  href="/forgot-password"
                  className="text-lg text-purple-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Quên mật khẩu?
                </Link>
                <p className="text-lg text-gray-600">
                  Chưa có tài khoản?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
