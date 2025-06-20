"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // milliseconds
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 border-green-600";
      case "error":
        return "bg-red-500 border-red-600";
      case "warning":
        return "bg-yellow-500 border-yellow-600";
      case "info":
        return "bg-blue-500 border-blue-600";
      default:
        return "bg-gray-500 border-gray-600";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-right-full duration-300">
      <div
        className={`${getToastStyles()} text-white p-4 rounded-xl shadow-[2px_4px_0px_0px_#000000] border-2 max-w-sm min-w-[300px]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getIcon()}</span>
            <p className="font-semibold text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
          >
            <span className="text-white text-sm font-bold">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}
