"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import Toast from "@/components/common/Toast";
import { useToast } from "@/hooks/useToast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemoryData) => void;
  selectedDate?: string; // Ngày được chọn từ parent component
  mode: "add" | "edit";
  editData?: MemoryData; // Data để edit
}

export interface MemoryData {
  id?: string;
  date: string;
  title: string;
  content: string;
  image?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  mode,
  editData,
}: ModalProps) {
  const { apiCall } = useAuth();
  const { toast, showSuccess, showError, showWarning, hideToast } = useToast();

  const [formData, setFormData] = useState<MemoryData>({
    date: "",
    title: "",
    content: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && editData) {
        // Mode edit: load dữ liệu từ editData
        setFormData({
          id: editData.id,
          date: editData.date,
          title: editData.title,
          content: editData.content,
          image: editData.image || "",
        });
      } else {
        // Mode add: set ngày được chọn từ parent hoặc ngày hiện tại
        const dateToUse =
          selectedDate || new Date().toISOString().split("T")[0];
        setFormData({
          date: dateToUse,
          title: "",
          content: "",
          image: "",
        });
      }
      setSelectedFile(null);
      setErrors({});
    }
  }, [isOpen, selectedDate, mode, editData]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!formData.content.trim()) newErrors.content = "Vui lòng nhập nội dung";

    // Chỉ yêu cầu ảnh khi add hoặc khi edit mà không có ảnh cũ
    if (mode === "add" && !selectedFile) {
      newErrors.image = "Vui lòng chọn ảnh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Tạo FormData để gửi kèm file
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("content", formData.content.trim());
      formDataToSend.append("date", formData.date);

      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }

      let response;
      let result;

      if (mode === "add") {
        // Gửi request tạo mới
        response = await fetch("/api/memories", {
          method: "POST",
          headers: getAuthHeaders(),
          body: formDataToSend,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Có lỗi xảy ra khi tạo kỷ niệm");
        }

        result = await response.json();

        // Gọi callback onSave với data mới
        onSave({
          ...formData,
          id: result.memory._id,
          image: result.memory.image,
        });

        showSuccess("Tạo kỷ niệm thành công!");
      } else {
        // Mode edit: gửi request cập nhật
        response = await fetch(`/api/memories/${formData.id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: formDataToSend,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Có lỗi xảy ra khi cập nhật kỷ niệm"
          );
        }

        result = await response.json();

        // Gọi callback onSave với data đã cập nhật
        onSave({
          id: result.memory._id,
          date: formData.date,
          title: result.memory.title,
          content: result.memory.content,
          image: result.memory.image,
        });

        showSuccess("Cập nhật kỷ niệm thành công!");
      }

      // Đóng modal
      onClose();
    } catch (error: any) {
      console.error(
        `Error ${mode === "add" ? "creating" : "updating"} memory:`,
        error
      );
      showError(
        error.message ||
          `Có lỗi xảy ra khi ${mode === "add" ? "tạo" : "cập nhật"} kỷ niệm`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function để lấy auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showWarning("Vui lòng chọn file hình ảnh");
      return;
    }

    // Validate file size (max 10MB theo API)
    if (file.size > 10 * 1024 * 1024) {
      showWarning("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB");
      return;
    }

    setSelectedFile(file);

    // Tạo preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        image: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);

    // Clear error nếu có
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Format date để hiển thị đẹp hơn
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FCE646] to-[#FFD700] p-6 rounded-t-2xl border-b-4 border-[#002249]">
          <div className="flex justify-between items-center">
            <h2 className="text-[#002249] text-2xl font-bold">
              {mode === "add" ? "Thêm kỷ niệm mới" : "Chỉnh sửa kỷ niệm"}
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
            {/* Date Display (Disabled) */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Ngày
              </label>
              <div className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                {formatDisplayDate(formData.date)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Ngày đã được chọn và không thể thay đổi
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề kỷ niệm"
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

            {/* Image Upload */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Hình ảnh {mode === "add" ? "*" : "(Tùy chọn)"}
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Image Preview */}
                <div className="relative">
                  {formData.image ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p>Chưa chọn ảnh</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex flex-col justify-center space-y-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className="bg-[#0070F4] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mode === "edit" ? "Thay đổi ảnh" : "Chọn ảnh"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <p className="text-sm text-gray-600">
                    Hỗ trợ: JPG, PNG, GIF (tối đa 10MB)
                  </p>

                  {selectedFile && (
                    <p className="text-sm text-green-600">
                      ✓ Đã chọn: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>

              {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-[#002249] font-semibold mb-2">
                Nội dung *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Mô tả kỷ niệm của bạn..."
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
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-[#0070F4] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {mode === "add" ? "Đang tạo..." : "Đang cập nhật..."}
                </>
              ) : mode === "add" ? (
                "Tạo kỷ niệm"
              ) : (
                "Cập nhật kỷ niệm"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
