'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

const videos = [
  {
    id: 1,
    title: 'Dạy trẻ tự kỷ giao tiếp (Phần 1)',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video1.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 2,
    title: '3 cách dạy trẻ tự kỷ tại nhà',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video2.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 3,
    title: 'Tương tác đúng cách qua 15 câu hỏi',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video3.png',
    link: 'https://www.youtube.com'
  },
  // Lặp lại cho đủ 9 video mẫu
  {
    id: 4,
    title: 'Dạy trẻ tự kỷ giao tiếp (Phần 1)',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video1.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 5,
    title: '3 cách dạy trẻ tự kỷ tại nhà',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video2.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 6,
    title: 'Tương tác đúng cách qua 15 câu hỏi',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video3.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 7,
    title: 'Dạy trẻ tự kỷ giao tiếp (Phần 1)',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video1.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 8,
    title: '3 cách dạy trẻ tự kỷ tại nhà',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video2.png',
    link: 'https://www.youtube.com'
  },
  {
    id: 9,
    title: 'Tương tác đúng cách qua 15 câu hỏi',
    author: 'An Khánh Nhung',
    authorDesc: 'Youtuber | Chuyên gia',
    desc: 'NHỮNG HOẠT ĐỘNG DẠY TRẺ TỰ KỶ TĂNG CƯỜNG KĨ NĂNG GIAO TIẾP VÀ TƯƠNG TÁC',
    img: '/images/video3.png',
    link: 'https://www.youtube.com'
  },
];

export default function Page() {
  const [keyword, setKeyword] = useState('');
  const [target, setTarget] = useState('');
  const [showAll, setShowAll] = useState(false);

  return (
    <Layout>
      <div className="bg-[#F6F7F9] min-h-screen py-8 px-4 sm:px-6">
        <div className="max-w-[76rem] mx-auto rounded-3xl border-2 border-r-4 border-b-4 border-black bg-white p-4 sm:p-6 md:p-8">
          <h1 className="text-3xl font-bold text-black text-center mb-2">Hướng dẫn tương tác cùng bé nhà mình <span className='inline-block align-middle'><img src="/images/youtube.png" alt="youtube" className="w-13 h-11 inline -mt-2" /></span></h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6 mt-2">
            <input
              type="text"
              placeholder="Từ khoá bạn muốn tìm"
              className="text-gray-500 font-bold border border-black rounded-xl h-12 px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <select
              className="text-gray-500 font-bold border border-black rounded-xl h-12 px-1 py-2 w-full md:w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={target}
              onChange={e => setTarget(e.target.value)}
            >
              <option value="">Đối tượng</option>
              <option value="tre-tu-ky">Trẻ tự kỷ</option>
              <option value="phu-huynh">Phụ huynh</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 h-12 border-2 border-black rounded-[36px] font-semibold hover:bg-blue-700 transition">Tìm kiếm nâng cao</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {(showAll ? videos : videos.slice(0, 6)).map(video => (
              <a 
                key={video.id} 
                href={video.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-r-4 border-b-4 border-black rounded-xl shadow-sm p-3 flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                  <img src={video.img} alt={video.title} className="object-cover w-full h-full" />
                  <span className="absolute top-2 right-2 bg-white/80 rounded-full p-1"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="10" fill="#FF0000"/><path d="M14 10.5L8.5 13.5V7.5L14 10.5Z" fill="white"/></svg></span>
                </div>
                <div className="flex-1 flex flex-col">
                  <h2 className="text-base font-bold text-[#002249] mb-1 line-clamp-2">{video.title}</h2>
                  <div className="flex items-center gap-2 mb-1 mt-2">
                    <img src="/images/avatar.png" alt="avatar" className="w-6 h-6 rounded-full" />
                    <span className="text-xs font-semibold text-[#002249]">{video.author}</span>
                    <span className="text-xs text-gray-400">{video.authorDesc}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2 mt-2">{video.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            {(!showAll || (showAll && videos.length > 6)) && (
              showAll ? (
                <button className="text-blue-600 font-semibold hover:underline flex items-center gap-1" onClick={() => setShowAll(false)}>
                  Thu gọn <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 12V4m0 0L4.5 7.5M8 4l3.5 3.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              ) : (
                <button className="text-blue-600 font-semibold hover:underline flex items-center gap-1" onClick={() => setShowAll(true)}>
                  Xem thêm <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 4v8m0 0l3.5-3.5M8 12L4.5 8.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 