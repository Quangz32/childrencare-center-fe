"use client";

import Layout from "@/components/layout/Layout";
import Card from "./card";

import RoundedButton from "@/components/common/RoundedButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Modal, { MemoryData } from "./Modal";

const initialCards: MemoryData[] = [
  {
    id: 1,
    weekday: "Thứ 2",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "20/05/2025",
    title: "Lưu lại kỉ niệm nhé",
    content: ".............................................",
  },
  {
    id: 2,
    weekday: "Thứ 3",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "21/05/2025",
    title: "Lưu lại kỉ niệm nhé",
    content: ".............................................",
  },
  {
    id: 4,
    weekday: "Thứ 5",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "23/05/2025",
    title: "Lưu lại kỉ niệm nhé",
    content: ".............................................",
  },
  {
    id: 5,
    weekday: "Thứ 6",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "24/05/2025",
    title: "Lưu lại kỉ niệm nhé",
    content: ".............................................",
  },
  {
    id: 6,
    weekday: "Thứ 7",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "25/05/2025",
    title: "Lưu lại kỉ niệm nhé",
    content: ".............................................",
  },
  {
    id: 7,
    weekday: "Chủ nhật",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "26/05/2025",
    title: "Lưu lại kỉ niệm nhé",
    content: ".............................................",
  },
];

// Tạo danh sách các tuần
const weeks = [
  { id: 1, name: "Tuần 1", startDate: "20/05/2025", endDate: "26/05/2025" },
  { id: 2, name: "Tuần 2", startDate: "27/05/2025", endDate: "02/06/2025" },
  { id: 3, name: "Tuần 3", startDate: "03/06/2025", endDate: "09/06/2025" },
  { id: 4, name: "Tuần 4", startDate: "10/06/2025", endDate: "16/06/2025" },
];

export default function Page() {
  //Test fetch
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    // setIsClient(true);
    // Call API ở đây
    // fetchData().then(setData);
  }, []);

  const fetchData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY4NTBlY2NhMGY2MTlhZTY1ZWFmYTQ5NSIsInJvbGUiOiJwYXJlbnQiLCJleHAiOjE3NTAzMDg3ODR9.3UszYqvNclXC1iVtYW5BDERhqk-CD6bVu7qgX9ZHcgI";
    const response = await axios.get("http://localhost:3000/api/memories", {
      headers: { Authorization: "Bearer " + token },
    });
    setData(response.data.allMemories);
    console.log("--progress ", response.data.allMemories);
  };

  //Vinh's code
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingMemory, setEditingMemory] = useState<MemoryData | undefined>();

  const lichyeuthuongMessage =
    "........... Tuần này bạn đã dành bao nhiêu thời gian để học cùng với bé nhà mình rồi?";

  const handleWeekChange = (week: (typeof weeks)[0]) => {
    setSelectedWeek(week);
    setShowWeekSelector(false);
  };

  const handleAddMemory = () => {
    setModalMode("add");
    setEditingMemory(undefined);
    setShowModal(true);
  };

  const handleEditMemory = (id: number) => {
    const memory = cards.find((card) => card.id === id);
    if (memory) {
      setModalMode("edit");
      setEditingMemory(memory);
      setShowModal(true);
    }
  };

  const handleDeleteMemory = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa kỉ niệm này?")) {
      setCards((prev) => prev.filter((card) => card.id !== id));
    }
  };

  const handleSaveMemory = (data: MemoryData) => {
    if (modalMode === "add") {
      const newId = Math.max(...cards.map((card) => card.id || 0), 0) + 1;
      const newMemory = { ...data, id: newId };
      setCards((prev) => [...prev, newMemory]);
    } else if (modalMode === "edit" && editingMemory?.id) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === editingMemory.id ? { ...data, id: editingMemory.id } : card
        )
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMemory(undefined);
  };

  // Tạo danh sách 7 ngày trong tuần
  const weekDays = [
    { weekday: "Thứ 2", date: "20/05/2025" },
    { weekday: "Thứ 3", date: "21/05/2025" },
    { weekday: "Thứ 4", date: "22/05/2025" },
    { weekday: "Thứ 5", date: "23/05/2025" },
    { weekday: "Thứ 6", date: "24/05/2025" },
    { weekday: "Thứ 7", date: "25/05/2025" },
    { weekday: "Chủ nhật", date: "26/05/2025" },
  ];

  // Tạo danh sách cards để hiển thị (bao gồm cả thẻ trống)
  const displayCards = weekDays.map((day, index) => {
    const existingCard = cards.find((card) => card.weekday === day.weekday);

    if (existingCard) {
      return (
        <Card
          key={existingCard.id}
          {...existingCard}
          onEdit={handleEditMemory}
          onDelete={handleDeleteMemory}
        />
      );
    } else {
      return (
        <Card
          key={`empty-${index}`}
          weekday={day.weekday}
          date={day.date}
          isEmpty={true}
          onAdd={handleAddMemory}
        />
      );
    }
  });

  return (
    <Layout>
      {/* <CldImage width={600} height={600} src="batdaoroi_ffscim" alt="123" /> */}
      <div className="pt-10 flex flex-col items-center justify-center">
        <h1 className="text-[#002249] text-4xl font-bold mb-10">
          Hãy chia sẻ những kỉ niệm cùng bé nhà mình nhé
        </h1>

        {/* Nút chọn tuần */}
        <div className="mb-6 relative">
          <button
            onClick={() => setShowWeekSelector(!showWeekSelector)}
            className="bg-[#FCE646] border-[4px] border-[#002249] px-6 py-3 rounded-xl shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200"
          >
            <span className="text-[#002249] text-xl font-bold">
              {selectedWeek.name} ({selectedWeek.startDate} - {selectedWeek.endDate})
            </span>
            <span className="ml-2 text-[#002249]">▼</span>
          </button>

          {/* Dropdown tuần */}
          {showWeekSelector && (
            <div className="absolute top-full left-0 mt-2 bg-white border-[4px] border-[#002249] rounded-xl shadow-[2px_4px_0px_0px_#000000] z-10 min-w-[300px]">
              {weeks.map((week) => (
                <button
                  key={week.id}
                  onClick={() => handleWeekChange(week)}
                  className={`w-full px-4 py-3 text-left hover:bg-[#FCE646] transition-colors duration-200 ${
                    selectedWeek.id === week.id ? "bg-[#FCE646]" : ""
                  }`}
                >
                  <div className="text-[#002249] font-bold">{week.name}</div>
                  <div className="text-[#002249] text-sm">
                    {week.startDate} - {week.endDate}
                  </div>
                </button>
              ))}
            </div>
          )}
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
                <p className=" text-[#002249] text-xl">{lichyeuthuongMessage}</p>
              </div>
              {/* 2nd -> 7th card */}
              {displayCards.slice(1).map((card, index) => (
                <div key={index}>{card}</div>
              ))}
            </div>
          </div>
        </div>
        {/* <RoundedButton text="Thêm kỉ niệm" onClick={() => {}} className="mt-8 mb-8 text-2xl" /> */}
      </div>
      <br />
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveMemory}
        memory={editingMemory}
        mode={modalMode}
      />
    </Layout>
  );
}
