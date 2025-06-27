"use client";

import Layout from "@/components/layout/Layout";
import Card from "./card";

import RoundedButton from "@/components/common/RoundedButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Modal, { MemoryData } from "./Modal";
import { useAuth } from "@/hooks/useAuth";
import Toast from "@/components/common/Toast";
import { useToast } from "@/hooks/useToast";

// Tạo danh sách các tuần
const weeks = [
  { id: 1, name: "Tuần 1", startDate: "2025-05-20", endDate: "2025-05-26" },
  { id: 2, name: "Tuần 2", startDate: "2025-05-27", endDate: "2025-06-02" },
  { id: 3, name: "Tuần 3", startDate: "2025-06-03", endDate: "2025-06-09" },
  { id: 4, name: "Tuần 4", startDate: "2025-06-10", endDate: "2025-06-16" },
];

export default function Page() {
  const { apiCall, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const [memories, setMemories] = useState<MemoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [editingMemory, setEditingMemory] = useState<MemoryData | null>(null);

  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingMemoryId, setDeletingMemoryId] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Tính toán tuần hiện tại (từ thứ 2 đến chủ nhật)
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Chủ nhật, 1 = Thứ 2, ...

    // Tính ngày thứ 2 (đầu tuần)
    const monday = new Date(today);
    // Nếu hôm nay là chủ nhật (0), lùi lại 6 ngày để lấy thứ 2 tuần trước
    // Nếu không phải chủ nhật, lùi lại (currentDay - 1) ngày để lấy thứ 2
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    // Tính ngày chủ nhật (cuối tuần)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    // Format dates to YYYY-MM-DD
    const startDate = monday.toISOString().split("T")[0];
    const endDate = sunday.toISOString().split("T")[0];

    setCurrentWeek({ startDate, endDate });
  }, []);

  useEffect(() => {
    if (!authLoading && isAuthenticated && currentWeek.startDate) {
      fetchMemories();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [authLoading, isAuthenticated, currentWeek]);

  const fetchMemories = async () => {
    try {
      setLoading(true);

      const response = await apiCall("/api/memories");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch memories");
      }

      // Transform API data to match MemoryData interface
      const transformedMemories: MemoryData[] = data.allMemories.map(
        (memory: any) => ({
          id: memory._id,
          date: memory.date.split("T")[0], // Convert to YYYY-MM-DD format
          title: memory.title,
          content: memory.content,
          image: memory.image,
        })
      );

      setMemories(transformedMemories);
      console.log("Fetched memories:", transformedMemories);
    } catch (error) {
      console.error("Error fetching memories:", error);
      showError("Có lỗi xảy ra khi tải danh sách kỷ niệm");
    } finally {
      setLoading(false);
    }
  };

  const lichyeuthuongMessage =
    "........... Tuần này bạn đã dành bao nhiêu thời gian để học cùng với bé nhà mình rồi?";

  // Chuyển đến tuần trước
  const goToPreviousWeek = () => {
    const startDate = new Date(currentWeek.startDate);
    startDate.setDate(startDate.getDate() - 7);

    const endDate = new Date(currentWeek.endDate);
    endDate.setDate(endDate.getDate() - 7);

    setCurrentWeek({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
  };

  // Chuyển đến tuần sau
  const goToNextWeek = () => {
    const startDate = new Date(currentWeek.startDate);
    startDate.setDate(startDate.getDate() + 7);

    const endDate = new Date(currentWeek.endDate);
    endDate.setDate(endDate.getDate() + 7);

    setCurrentWeek({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
  };

  // Handler cho Add Memory
  const handleAddMemory = (date: string) => {
    setModalMode("add");
    setSelectedDate(date);
    setEditingMemory(null);
    setShowModal(true);
  };

  // Handler cho Edit Memory
  const handleEditMemory = (id: string) => {
    const memoryToEdit = memories.find((memory) => memory.id === id);
    if (!memoryToEdit) {
      showError("Không tìm thấy kỷ niệm để chỉnh sửa");
      return;
    }

    setModalMode("edit");
    setEditingMemory(memoryToEdit);
    setSelectedDate(""); // Không cần thiết cho edit
    setShowModal(true);
  };

  // Handler cho Delete Memory
  const handleDeleteMemory = (id: string) => {
    setDeletingMemoryId(id);
    setShowDeleteConfirm(true);
  };

  // Xác nhận xóa
  const confirmDelete = async () => {
    if (!deletingMemoryId) return;

    setIsDeleting(true);
    try {
      const response = await apiCall(`/api/memories/${deletingMemoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Có lỗi xảy ra khi xóa kỷ niệm");
      }

      // Xóa memory khỏi state local
      setMemories((prev) =>
        prev.filter((memory) => memory.id !== deletingMemoryId)
      );

      showSuccess("Xóa kỷ niệm thành công!");
    } catch (error: any) {
      console.error("Error deleting memory:", error);
      showError(error.message || "Có lỗi xảy ra khi xóa kỷ niệm");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setDeletingMemoryId("");
    }
  };

  // Hủy xóa
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeletingMemoryId("");
  };

  const handleSaveMemory = (data: MemoryData) => {
    if (modalMode === "add") {
      // Thêm memory mới vào danh sách local
      setMemories((prev) => [...prev, data]);
    } else {
      // Cập nhật memory trong danh sách local
      setMemories((prev) =>
        prev.map((memory) => (memory.id === data.id ? data : memory))
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate("");
    setEditingMemory(null);
    setModalMode("add");
  };

  // Tạo danh sách 7 ngày trong tuần hiện tại
  const getWeekDays = () => {
    if (!currentWeek.startDate) return [];

    const startDate = new Date(currentWeek.startDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const weekdayNames = [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
      ];
      const weekday = weekdayNames[currentDate.getDay()];
      const dateString = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD

      days.push({ weekday, date: dateString });
    }

    return days;
  };

  const weekDays = getWeekDays();

  // Format date để hiển thị đẹp hơn (DD/MM/YYYY)
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("vi-VN");
  };

  // Tạo danh sách cards để hiển thị (bao gồm cả thẻ trống)
  const displayCards = weekDays.map((day, index) => {
    const existingMemory = memories.find((memory) => memory.date === day.date);

    if (existingMemory) {
      return (
        <Card
          key={existingMemory.id}
          id={existingMemory.id}
          weekday={day.weekday}
          date={formatDisplayDate(day.date)}
          title={existingMemory.title}
          content={existingMemory.content}
          image={existingMemory.image}
          onEdit={handleEditMemory}
          onDelete={handleDeleteMemory}
        />
      );
    } else {
      return (
        <Card
          key={`empty-${index}`}
          weekday={day.weekday}
          date={formatDisplayDate(day.date)}
          isEmpty={true}
          onAdd={() => handleAddMemory(day.date)}
        />
      );
    }
  });

  // Format date range cho header tuần
  const formatWeekRange = () => {
    if (!currentWeek.startDate) return "";
    const startDate = formatDisplayDate(currentWeek.startDate);
    const endDate = formatDisplayDate(currentWeek.endDate);
    return `${startDate} - ${endDate}`;
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="pt-10 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002249]"></div>
          <p className="mt-4 text-[#002249]">Đang tải...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="pt-10 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#002249] mb-4">
              Vui lòng đăng nhập để xem kỷ niệm
            </h2>
            <p className="text-gray-600 mb-6">Bạn cần đăng nhập để truy cập trang này.</p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-[#0070F4] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-10 flex flex-col items-center justify-center">
        <h1 className="text-[#002249] text-4xl font-bold mb-10">
          Hãy chia sẻ những kỷ niệm cùng bé nhà mình nhé
        </h1>

        {/* Hiển thị tuần hiện tại và nút điều hướng */}
        <div className="mb-6 flex items-center justify-center">
          <button
            onClick={goToPreviousWeek}
            className="bg-[#FCE646] border-[4px] border-[#002249] px-4 py-2 rounded-xl shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200 mr-4"
          >
            <span className="text-[#002249] text-xl font-bold">←</span>
          </button>

          <div className="bg-[#FCE646] border-[4px] border-[#002249] px-6 py-3 rounded-xl shadow-[2px_4px_0px_0px_#000000]">
            <span className="text-[#002249] text-xl font-bold">{formatWeekRange()}</span>
          </div>

          <button
            onClick={goToNextWeek}
            className="bg-[#FCE646] border-[4px] border-[#002249] px-4 py-2 rounded-xl shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200 ml-4"
          >
            <span className="text-[#002249] text-xl font-bold">→</span>
          </button>
        </div>

        {/* Lịch yêu thương */}
        <div className="mx-[100px] flex flex-col shadow-[2px_4px_0px_0px_#000000] rounded-b-[24px]">
          {/* Header */}
          <div
            className="flex flex-col items-center justify-center bg-[#FCE646] h-[100px]
           border-[4px] border-[#002249] relative"
          >
            <h2
              className="text-[#7B61FF] text-xl sm:text-3xl md:text-5xl font-[900] text-center 
            mr-4"
            >
              Lịch yêu thương
            </h2>
            <div className="flex flex-row absolute right-10 top-1/2 transform -translate-y-1/2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="hidden md:block bg-[#fff] border-[4px] border-[#002249] mx-4 rounded-full w-7 h-7  
                  shadow-[2px_4px_0px_0px_#000000]"
                ></div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div
            className="w-full p-10 flex flex-col items-center justify-center bg-[#fff]
            border-l-[4px] border-r-[4px] border-b-[4px] border-[#002249] rounded-b-[24px]"
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* 1st card */}
              {displayCards[0]}
              <div className="col-span-1 sm:col-span-1 md:col-span-2 h-[100px] p-4 ">
                <p className=" text-[#002249] text-xl">{lichyeuthuongMessage}</p>
              </div>
              {/* 2nd -> 7th card */}
              {displayCards.slice(1).map((card, index) => (
                <div key={index}>{card}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveMemory}
        selectedDate={selectedDate}
        mode={modalMode}
        editData={editingMemory || undefined}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-2xl">
              <div className="flex justify-center items-center">
                <h2 className="text-white text-2xl font-bold">Xác nhận xóa</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🗑️</div>
                <p className="text-gray-700 text-lg mb-2">
                  Bạn có chắc chắn muốn xóa kỷ niệm này không?
                </p>
                <p className="text-red-600 text-sm">Hành động này không thể hoàn tác!</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-6 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang xóa...
                    </>
                  ) : (
                    "Xóa kỷ niệm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </Layout>
  );
}
