"use client";
import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTransgender, FaUserTag, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserProfile {
  _id: string;
  email: string;
  phone: string;
  role: string;
  fullName: string;
  gender: string;
  address: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangePwOpen, setIsChangePwOpen] = useState(false);
  
  const [editData, setEditData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [pwData, setPwData] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setEditData({
          fullName: response.data.fullName,
          phone: response.data.phone,
          address: response.data.address,
        })
      } catch (err) {
        setError("Không thể tải thông tin cá nhân. Vui lòng thử lại.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if(!profile) return;
    try {
      await axios.put(`/api/users/${profile._id}`, {
        fullName: editData.fullName,
        phone: editData.phone,
        address: editData.address,
      });
      setProfile((prev) => (prev ? { ...prev, ...editData } : null));
      setIsEditOpen(false);
    } catch {
      alert("Cập nhật hồ sơ thất bại!");
    }
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPwData((prev) => ({ ...prev, [name]: value }));
    setPwError("");
  };

  const handlePwSave = async () => {
    if(!profile) return;
    if (pwData.newPw !== pwData.confirm) {
      setPwError("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    try {
      const response = await axios.put(
        `/api/users/${profile._id}/change-password`,
        {
          currentPassword: pwData.current,
          newPassword: pwData.newPw,
        }
      );

      if (response.status === 200) {
        alert("Đổi mật khẩu thành công!");
        setIsChangePwOpen(false);
        setPwData({ current: "", newPw: "", confirm: "" });
        setPwError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setPwError(
          error.response.data.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      } else {
        setPwError("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Đang tải...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return null; // or a message indicating no profile data
  }

  return (
    <Layout>
      <div className="w-screen h-screen min-h-screen min-w-full bg-white py-8 px-0 font-sans overflow-auto">
        <div className="w-full h-full px-4 md:px-10 flex flex-col">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 mt-4">
            <FaUserCircle className="text-blue-400" size={100} />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">Xin chào, {profile.fullName}!</h1>
              <p className="text-black mb-2 max-w-2xl">Cảm ơn bạn đã đồng hành cùng con trên hành trình đặc biệt này. Chúng tôi luôn ở đây để hỗ trợ bạn và bé!</p>
              <button
                className="flex items-center gap-2 mt-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition w-fit"
                onClick={() => setIsEditOpen(true)}
              >
                <FaEdit />
                Chỉnh sửa hồ sơ
              </button>
              <button
                className="flex items-center gap-2 mt-2 ml-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition w-fit"
                onClick={() => setIsChangePwOpen(true)}
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <ProfileRow icon={<FaEnvelope className="text-blue-400" />} label="Email" value={profile.email} />
            <ProfileRow icon={<FaPhone className="text-pink-400" />} label="Số điện thoại" value={profile.phone} />
            <ProfileRow icon={<FaTransgender className="text-green-400" />} label="Giới tính" value={profile.gender === "male" ? "Nam" : "Nữ"} />
            <ProfileRow icon={<FaMapMarkerAlt className="text-yellow-400" />} label="Địa chỉ" value={profile.address} />
            <ProfileRow icon={<FaUserTag className="text-purple-400" />} label="Vai trò" value={profile.role === "parent" ? "Phụ huynh" : profile.role} />
          </div>
          <div className="mt-10 text-left text-sm text-gray-400">
            © {new Date().getFullYear()} Trung tâm đồng hành cùng trẻ tự kỷ
          </div>
        </div>
      </div>
      {/* Popup chỉnh sửa */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-black">Chỉnh sửa hồ sơ</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold mb-1 text-black">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-black">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-black">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold text-black"
                onClick={() => setIsEditOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                onClick={handleEditSave}
              >
                Lưu
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setIsEditOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Popup đổi mật khẩu */}
      {isChangePwOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-black">Đổi mật khẩu</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold mb-1 text-black">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="current"
                  value={pwData.current}
                  onChange={handlePwChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-black">Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPw"
                  value={pwData.newPw}
                  onChange={handlePwChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-black">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  name="confirm"
                  value={pwData.confirm}
                  onChange={handlePwChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              {pwError && <div className="text-red-600 text-sm mt-1">{pwError}</div>}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold text-black"
                onClick={() => { setIsChangePwOpen(false); setPwError(""); }}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                onClick={handlePwSave}
              >
                Lưu
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => { setIsChangePwOpen(false); setPwError(""); }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-row items-center gap-2 w-full text-lg md:text-xl text-left">
      <span>{icon}</span>
      <span className="font-semibold text-black min-w-[120px]">{label}:</span>
      <span className="text-black break-all">{value}</span>
    </div>
  );
}

export default ProfilePage;
