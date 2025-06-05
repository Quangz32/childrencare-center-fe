"use client";

import Layout from "@/components/layout/Layout";
import Card from "./card";
import RoundedButton from "@/components/common/RoundedButton";

const cards = [
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
    id: 3,
    weekday: "Thứ 4",
    image: "/images/progress/lichyeuthuong.jpg",
    date: "22/05/2025",
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

export default function Page() {
  const lichyeuthuongMessage =
    "........... Tuần này bạn đã dành bao nhiêu thời gian để học cùng với bé nhà mình rồi?";
  return (
    <Layout>
      <div className="pt-10 flex flex-col items-center justify-center">
        <h1 className="text-[#002249] text-4xl font-bold mb-10">
          Hãy chia sẻ những kỉ niệm cùng bé nhà mình nhé
        </h1>

        {/* Lịch yêu thương */}
        <div className="flex flex-col w-[70%] shadow-[2px_4px_0px_0px_#000000] rounded-b-[24px]">
          {/* Header */}
          <div
            className="flex flex-col items-center justify-center bg-[#FCE646] h-[100px]
           border-[4px] border-[#002249] relative"
          >
            <h2 className="text-[#7B61FF] text-5xl font-[900] text-center mr-4">
              Lịch yêu thương
            </h2>
            <div className="flex flex-row absolute right-10 top-1/2 transform -translate-y-1/2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-[#fff] border-[4px] border-[#002249] mx-4 rounded-full w-7 h-7  
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
            <div className="w-full grid grid-cols-3 gap-4">
              {/* 1st card */}
              <Card {...cards[0]} />
              <div className="col-span-2 h-[100px] p-4 ">
                <p className=" text-[#002249] text-xl">
                  {lichyeuthuongMessage}
                </p>
              </div>
              {/* 2nd -> N card */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} {...cards[item]} />
              ))}
            </div>
          </div>
        </div>
        <RoundedButton
          text="Thêm kỉ niệm"
          onClick={() => {}}
          className="mt-8 text-2xl"
        />
      </div>
    </Layout>
  );
}
