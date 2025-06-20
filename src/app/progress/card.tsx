"use client";

import { useState, useEffect, useRef } from "react";

interface CardProps {
  id?: string;
  weekday: string;
  image?: string;
  date: string;
  title?: string;
  content?: string;
  isEmpty?: boolean;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function Card({
  id,
  weekday,
  image,
  date,
  title,
  content,
  isEmpty = false,
  onAdd,
  onEdit,
  onDelete,
}: CardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setShowMenu(false);
    if (onEdit && id) {
      onEdit(id);
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    if (onDelete && id) {
      onDelete(id);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    }
  };

  if (isEmpty) {
    return (
      <div className="p-4 max-h-[180px] bg-[#FFFCE6] border-[1px] border-black rounded-lg shadow-[1px_2px_0px_0px_#000000] relative flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-[#7B61FF] text-xl font-bold mb-2">{weekday}</p>
          <p className="text-black text-sm font-semibold mb-4">{date}</p>
          <button
            onClick={handleAdd}
            className="w-12 h-12 bg-[#7B61FF] rounded-full flex items-center justify-center shadow-[2px_4px_0px_0px_#000000] hover:shadow-[1px_2px_0px_0px_#000000] transition-all duration-200"
          >
            <span className="text-white text-3xl font-bold">+</span>
          </button>
          <p className="text-black text-sm mt-2">Thêm kỉ niệm</p>
        </div>
        <div className="flex flex-row space-x-1 absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2">
          <img src={"/images/progress/rect5194.svg"} alt="decoration" />
          <img src={"/images/progress/rect5194.svg"} alt="decoration" />
          <img src={"/images/progress/rect5194.svg"} alt="decoration" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 h-[180px] bg-[#FFFCE6] border-[1px] border-black rounded-lg shadow-[1px_2px_0px_0px_#000000] relative">
        <div className="flex flex-col">
          {/* up */}
          <div className="mb-2 flex flex-row justify-between items-center">
            <p className="text-[#7B61FF] text-xl font-bold">{weekday}</p>
            <div className="flex items-center space-x-2">
              <p className="text-black text-sm font-semibold">{date}</p>
              {/* Menu button */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="6" cy="12" r="1.5" />
                    <circle cx="18" cy="12" r="1.5" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white border-2 border-[#002249] rounded-lg shadow-[2px_4px_0px_0px_#000000] z-10 min-w-[120px]">
                    <button
                      onClick={handleEdit}
                      className="w-full px-3 py-2 text-left hover:bg-[#FCE646] transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                      <span className="text-[#002249] font-semibold">Sửa</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-3 py-2 text-left hover:bg-red-100 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                      <span className="text-red-600 font-semibold">Xóa</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* down */}
          <div className="flex flex-row">
            <img
              src={image}
              alt="image"
              className="w-2/5 h-[96px] border-[#FFDD00] border-2 rounded-lg shadow-[0.83px_1.66px_0px_0px_#000000]"
            />
            <div className="flex flex-col pl-3 w-3/5">
              <p className="text-black text-sm font-bold">{title}</p>
              <p className="text-black text-sm break-words">{content}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-1 absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2">
          <img src={"/images/progress/rect5194.svg"} alt="decoration" />
          <img src={"/images/progress/rect5194.svg"} alt="decoration" />
          <img src={"/images/progress/rect5194.svg"} alt="decoration" />
        </div>
      </div>
    </div>
  );
}
