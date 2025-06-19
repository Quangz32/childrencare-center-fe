"use client";

import Layout from "@/components/layout/Layout";
import Card from "./card";

import RoundedButton from "@/components/common/RoundedButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Modal, { MemoryData } from "./Modal";
import { useAuth } from "@/hooks/useAuth";

interface WeekInfo {
  weekNumber: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  label: string; // "Tuần 1 (20/05 - 26/05)"
}

export default function Page() {
  const { apiCall, isAuthenticated, isLoading: authLoading } = useAuth();
  const [memories, setMemories] = useState<MemoryData[]>([]);
  const [loading, setLoading] = useState(true);

  // Date selection states
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo | null>(null);
  const [weeksInMonth, setWeeksInMonth] = useState<WeekInfo[]>([]);

  // UI states
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchMemories();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    // Tính toán các tuần trong tháng khi thay đổi năm/tháng
    const weeks = getWeeksInMonth(selectedYear, selectedMonth);
    setWeeksInMonth(weeks);

    // Chọn tuần đầu tiên nếu chưa có tuần nào được chọn hoặc tuần hiện tại không có trong tháng mới
    if (
      !selectedWeek ||
      !weeks.find((w) => w.weekNumber === selectedWeek.weekNumber)
    ) {
      setSelectedWeek(weeks[0] || null);
    }
  }, [selectedYear, selectedMonth]);

  // Tính toán các tuần trong tháng (chỉ tính tuần từ thứ 2 - chủ nhật)
  const getWeeksInMonth = (year: number, month: number): WeekInfo[] => {
    const weeks: WeekInfo[] = [];
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    // Tìm thứ hai đầu tiên của tháng
    let currentMonday = new Date(firstDayOfMonth);
    const dayOfWeek = currentMonday.getDay();
    const daysToMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
    if (dayOfWeek !== 1) {
      currentMonday.setDate(currentMonday.getDate() + daysToMonday);
    }

    let weekNumber = 1;

    // Nếu thứ hai đầu tiên không phải là ngày đầu tháng, kiểm tra xem có nên tính tuần trước đó không
    if (currentMonday.getDate() > 1) {
      const prevMonday = new Date(currentMonday);
      prevMonday.setDate(prevMonday.getDate() - 7);

      // Nếu tuần trước có ít nhất 4 ngày trong tháng này thì tính vào
      if (prevMonday.getMonth() === month - 1) {
        const prevSunday = new Date(prevMonday);
        prevSunday.setDate(prevSunday.getDate() + 6);

        weeks.push({
          weekNumber: weekNumber++,
          startDate: formatDateToString(prevMonday),
          endDate: formatDateToString(prevSunday),
          label: `Tuần ${weekNumber - 1} (${formatDateDisplay(
            prevMonday
          )} - ${formatDateDisplay(prevSunday)})`,
        });
      }
    }

    // Tính các tuần đầy đủ trong tháng
    while (currentMonday <= lastDayOfMonth) {
      const sunday = new Date(currentMonday);
      sunday.setDate(sunday.getDate() + 6);

      weeks.push({
        weekNumber: weekNumber++,
        startDate: formatDateToString(currentMonday),
        endDate: formatDateToString(sunday),
        label: `Tuần ${weekNumber - 1} (${formatDateDisplay(
          currentMonday
        )} - ${formatDateDisplay(sunday)})`,
      });

      // Chuyển sang thứ hai tuần tiếp theo
      currentMonday.setDate(currentMonday.getDate() + 7);
    }

    return weeks;
  };

  // Format Date object thành DD/MM
  const formatDateDisplay = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
  };

  // Format Date object thành YYYY-MM-DD
  const formatDateToString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
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
      alert("Có lỗi xảy ra khi tải danh sách kỷ niệm");
    } finally {
      setLoading(false);
    }
  };

  const lichyeuthuongMessage =
    "........... Tuần này bạn đã dành bao nhiêu thời gian để học cùng với bé nhà mình rồi?";

  // Xử lý thay đổi tuần
  const handleWeekChange = (week: WeekInfo) => {
    setSelectedWeek(week);
    setShowDateSelector(false);
  };

  // Nút tiến tuần
  const handleNextWeek = () => {
    if (!selectedWeek) return;

    const currentIndex = weeksInMonth.findIndex(
      (w) => w.weekNumber === selectedWeek.weekNumber
    );
    if (currentIndex < weeksInMonth.length - 1) {
      // Chuyển sang tuần tiếp theo trong cùng tháng
      setSelectedWeek(weeksInMonth[currentIndex + 1]);
    } else {
      // Chuyển sang tháng tiếp theo
      if (selectedMonth === 12) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  // Nút lùi tuần
  const handlePrevWeek = () => {
    if (!selectedWeek) return;

    const currentIndex = weeksInMonth.findIndex(
      (w) => w.weekNumber === selectedWeek.weekNumber
    );
    if (currentIndex > 0) {
      // Chuyển sang tuần trước trong cùng tháng
      setSelectedWeek(weeksInMonth[currentIndex - 1]);
    } else {
      // Chuyển sang tháng trước
      if (selectedMonth === 1) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(12);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    }
  };

  const handleAddMemory = (date: string) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleSaveMemory = (data: MemoryData) => {
    // Thêm memory mới vào danh sách local
    setMemories((prev) => [...prev, data]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate("");
  };

  // Tạo danh sách 7 ngày trong tuần hiện tại
  const getWeekDays = (week: WeekInfo) => {
    if (!week) return [];

    const startDate = new Date(week.startDate + "T00:00:00");
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
      const dateString = formatDateToString(currentDate);

      days.push({ weekday, date: dateString });
    }

    return days;
  };

  const weekDays = selectedWeek ? getWeekDays(selectedWeek) : [];

  // Format date để hiển thị đẹp hơn (DD/MM/YYYY)
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("vi-VN");
  };

  // Generate years (5 năm trước và sau)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Generate months
  const months = [
    { value: 1, label: "Tháng 1" },
    { value: 2, label: "Tháng 2" },
    { value: 3, label: "Tháng 3" },
    { value: 4, label: "Tháng 4" },
    { value: 5, label: "Tháng 5" },
    { value: 6, label: "Tháng 6" },
    { value: 7, label: "Tháng 7" },
    { value: 8, label: "Tháng 8" },
    { value: 9, label: "Tháng 9" },
    { value: 10, label: "Tháng 10" },
    { value: 11, label: "Tháng 11" },
    { value: 12, label: "Tháng 12" },
  ];

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
          onEdit={() => {}} // Có thể implement sau
          onDelete={() => {}} // Có thể implement sau
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
            <p className="text-gray-600 mb-6">
              Bạn cần đăng nhập để truy cập trang này.
            </p>
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

        {/* Date Navigation */}
        <div className="mb-6 flex items-center gap-4">
          {/* Previous Week Button */}
          <button
            onClick={handlePrevWeek}
            className="w-10 h-10 bg-[#0070F4] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000]"
          >
            ←
          </button>

          {/* Date Selector */}
          <div className="relative">
            <button
              onClick={() => setShowDateSelector(!showDateSelector)}
              className="bg-[#FCE646] border-[4px] border-[#002249] px-6 py-3 rounded-xl shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200 min-w-[300px]"
            >
              <span className="text-[#002249] text-xl font-bold">
                {selectedWeek ? selectedWeek.label : "Chọn tuần"}
              </span>
              <span className="ml-2 text-[#002249]">▼</span>
            </button>

            {/* Dropdown Date Selector */}
            {showDateSelector && (
              <div className="absolute top-full left-0 mt-2 bg-white border-[4px] border-[#002249] rounded-xl shadow-[2px_4px_0px_0px_#000000] z-10 min-w-[400px] p-4">
                {/* Year and Month Selectors */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#002249] font-semibold mb-2">
                      Năm
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) =>
                        setSelectedYear(parseInt(e.target.value))
                      }
                      className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#002249] font-semibold mb-2">
                      Tháng
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) =>
                        setSelectedMonth(parseInt(e.target.value))
                      }
                      className="w-full p-2 border-2 border-[#002249] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Week Selector */}
                <div>
                  <label className="block text-[#002249] font-semibold mb-2">
                    Tuần
                  </label>
                  <div className="max-h-48 overflow-y-auto">
                    {weeksInMonth.map((week) => (
                      <button
                        key={week.weekNumber}
                        onClick={() => handleWeekChange(week)}
                        className={`w-full px-3 py-2 text-left hover:bg-[#FCE646] transition-colors duration-200 rounded ${
                          selectedWeek?.weekNumber === week.weekNumber
                            ? "bg-[#FCE646]"
                            : ""
                        }`}
                      >
                        <div className="text-[#002249] font-bold">
                          {week.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowDateSelector(false)}
                  className="mt-4 w-full bg-[#0070F4] text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>

          {/* Next Week Button */}
          <button
            onClick={handleNextWeek}
            className="w-10 h-10 bg-[#0070F4] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000]"
          >
            →
          </button>
        </div>

        {/* Lịch yêu thương */}
        <div className="flex flex-col shadow-[2px_4px_0px_0px_#000000] rounded-b-[24px]">
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
                <p className=" text-[#002249] text-xl">
                  {lichyeuthuongMessage}
                </p>
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
        mode="add"
      />
    </Layout>
  );
}
