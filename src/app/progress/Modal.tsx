"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemoryData) => void;
  memory?: MemoryData;
  mode: "add" | "edit";
}

export interface MemoryData {
  id?: number;
  weekday: string;
  date: string;
  title: string;
  content: string;
  image?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onSave,
  memory,
  mode,
}: ModalProps) {
  const [formData, setFormData] = useState<MemoryData>({
    weekday: "",
    date: "",
    title: "",
    content: "",
    image: "/images/progress/lichyeuthuong.jpg",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (memory && mode === "edit") {
      setFormData(memory);
    } else if (mode === "add") {
      setFormData({
        weekday: "",
        date: new Date().toISOString().split("T")[0], // Today's date as default
        title: "",
        content: "",
        image: "/images/progress/lichyeuthuong.jpg",
      });
    }
    setErrors({});
  }, [memory, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.weekday) newErrors.weekday = "Vui lòng chọn thứ trong tuần";
    if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
    if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!formData.content.trim()) newErrors.content = "Vui lòng nhập nội dung";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave(formData);
    onClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to Cloudinary via our API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      setFormData((prev) => ({
        ...prev,
        image: result.data.secure_url,
      }));

      setUploadProgress(100);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");

      // Fallback to base64 if Cloudinary fails
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FCE646] to-[#FFD700] p-6 rounded-t-2xl border-b-4 border-[#002249]">
          <div className="flex justify-between items-center">
            <h2 className="text-[#002249] text-2xl font-bold">
              {mode === "add" ? "Thêm kỉ niệm mới" : "Sửa kỉ niệm"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-[#002249] text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Row 1: Weekday & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#002249] font-semibold mb-2">
                  Thứ trong tuần *
                </label>
                <select
                  name="weekday"
                  value={formData.weekday}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 transition-all ${
                    errors.weekday
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                >
                  <option value="">Chọn thứ</option>
                  <option value="Thứ 2">Thứ 2</option>
                  <option value="Thứ 3">Thứ 3</option>
                  <option value="Thứ 4">Thứ 4</option>
                  <option value="Thứ 5">Thứ 5</option>
                  <option value="Thứ 6">Thứ 6</option>
                  <option value="Thứ 7">Thứ 7</option>
                  <option value="Chủ nhật">Chủ nhật</option>
                </select>
                {errors.weekday && (
                  <p className="text-red-500 text-sm mt-1">{errors.weekday}</p>
                )}
              </div>

              <div>
                <label className="block text-[#002249] font-semibold mb-2">
                  Ngày *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 transition-all ${
                    errors.date
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            {/* Row 2: Title */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề kỉ niệm"
                className={`w-full p-3 border-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 transition-all ${
                  errors.title
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Row 3: Image Upload */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Hình ảnh
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Image */}
                <div className="relative">
                  {formData.image && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                            <p>Đang tải lên... {uploadProgress}%</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex flex-col justify-center space-y-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-[#0070F4] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? "Đang tải lên..." : "Chọn ảnh mới"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <p className="text-sm text-gray-600">
                    Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4: Content */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Nội dung *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Mô tả kỉ niệm của bạn..."
                rows={4}
                className={`w-full p-3 border-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.content
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 py-3 px-6 bg-[#0070F4] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mode === "add" ? "Thêm kỉ niệm" : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
