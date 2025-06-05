"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "../progress/card";
import RoundedButton from "@/components/common/RoundedButton";
import Feed from "./feed";

export default function Page() {
  const lichyeuthuongMessage =
    "........... Tuần này bạn đã dành bao nhiêu thời gian để học cùng với bé nhà mình rồi?";
  return (
    <Layout>
      <div className="pt-10 flex flex-col items-center justify-center">
        <h1 className="text-[#002249] text-4xl font-bold mb-10">
          Tham gia cộng đồng phát triển trẻ thơ
        </h1>
        {/* content */}

        <div
          className="mx-10 flex flex-col items-center justify-center border-2 border-black 
        rounded-3xl shadow-[2px_3px_0px_0px_#000000] overflow-hidden"
        >
          <img
            src="images/community/community_banner.png"
            alt="community"
            className="w-full"
          />
          <div className="w-full px-24 py-12 bg-[#0070F4] border-t-[10px] border-[#83BCFF]">
            <h2 className="text-white text-5xl font-bold">
              Thắp sáng tương lai trẻ thơ
            </h2>

            <div className="mt-6 flex flex-row justify-between">
              <div className="flex flex-row items-center space-x-4">
                <img
                  src="images/pilot_cat.png"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <p className=" text-white font-bold text-xl">
                  10 chuyên gia • 199 thành viên
                </p>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <div
                  className="px-2 py-1 flex items-center justify-center bg-[#E5F1FE] text-black 
                font-bold rounded-xl border-black border-2"
                >
                  <p className="text-xl">•••</p>
                </div>
                <RoundedButton
                  text="Tham gia ngay"
                  onClick={() => {}}
                  className="bg-[#FFDD00] text-xl font-bold !text-black"
                />
              </div>
            </div>
          </div>
          {/* Feeds */}
          <div className="w-full px-32 py-8 space-y-8">
            <Feed />
            <Feed />
            <Feed />
          </div>

          <div></div>
        </div>
      </div>
    </Layout>
  );
}

/* Rectangle 1328 */

// width: 1198.8px;
// height: 259.72px;

// background: url(ảnh 3.png);
// border-radius: 24px 24px 0px 0px;

// /* Inside auto layout */
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;
