"use client";

import { useState, useEffect } from "react";

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

export default function Modal({ isOpen, onClose, onSave, memory, mode }: ModalProps) {
  const [formData, setFormData] = useState<MemoryData>({
    weekday: "",
    date: "",
    title: "",
    content: "",
    image: "/images/progress/lichyeuthuong.jpg",
  });

  useEffect(() => {
    if (memory && mode === "edit") {
      setFormData(memory);
    } else if (mode === "add") {
      setFormData({
        weekday: "",
        date: "",
        title: "",
        content: "",
        image: "/images/progress/lichyeuthuong.jpg",
      });
    }
  }, [memory, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-[4px_8px_0px_0px_#000000] border-4 border-[#002249] w-full max-w-2xl mx-auto p-0">
        {/* Header */}
        <div className="bg-[#FCE646] p-2 sm:p-3 rounded-t-lg border-b-4 border-[#002249]">
          <h2 className="text-[#002249] text-lg sm:text-xl font-bold text-center">
            {mode === "add" ? "Thêm kỉ niệm mới" : "Sửa kỉ niệm"}
          </h2>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Hàng 1: Thứ trong tuần & Ngày */}
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <label className="block text-[#002249] font-semibold mb-1">Thứ trong tuần</label>
                <select
                  value={formData.weekday}
                  onChange={(e) => setFormData(prev => ({ ...prev, weekday: e.target.value }))}
                  className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:border-[#7B61FF] text-sm text-black"
                  required
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
              </div>
              <div className="flex-1">
                <label className="block text-[#002249] font-semibold mb-1">Ngày</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:border-[#7B61FF] text-sm text-black"
                  required
                />
              </div>
            </div>

            {/* Hàng 2: Tiêu đề & Hình ảnh */}
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <label className="block text-[#002249] font-semibold mb-1">Tiêu đề</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tiêu đề kỉ niệm"
                  className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:border-[#7B61FF] text-sm text-black"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <label className="block text-[#002249] font-semibold mb-1">Hình ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:border-[#7B61FF] text-sm text-black"
                />
                {formData.image && (
                  <div className="mt-1">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-14 h-14 object-cover rounded-lg border-2 border-[#FFDD00]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Hàng 3: Nội dung */}
            <div>
              <label className="block text-[#002249] font-semibold mb-1">Nội dung</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Mô tả kỉ niệm của bạn"
                rows={3}
                className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:border-[#7B61FF] text-sm text-black resize-none"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-300 text-[#002249] font-semibold rounded-lg border-2 border-[#002249] shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#7B61FF] text-white font-semibold rounded-lg border-2 border-[#002249] shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200"
            >
              {mode === "add" ? "Thêm" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 