export default function Feed() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-row items-center space-x-4 mb-4">
        <img
          src="images/pilot_cat.png"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-[#63637B] font-bold">Nguyễn Văn Tuấn</p>
        <p className="text-[#9191A8] text-xs">
          Tiến sĩ - Chuyên gia tâm lý • 6 ngày trước
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-row justify-between space-x-4 mb-2">
        <p className="w-4/5 text-[#63637B] text-lg mr-3">
          🌟 LỜI KHUYÊN DÀNH CHO PHỤ HUYNH - NUÔI DƯỠNG TRÍ TUỆ VÀ CẢM XÚC CHO
          TRẺ 🌟 👩‍⚕️ Tiến sĩ Tâm lý Trẻ em chia sẻ: Cha mẹ không chỉ là người
          nuôi dưỡng mà còn là người dẫn dắt cảm xúc và tư duy của con trẻ. Mỗi
          lời nói, hành động của bạn đều có ảnh hưởng sâu sắc đến quá trình phát
          triển của con.
        </p>
        <img
          src="images/community/feed_img_1.jpg"
          alt="feed"
          className="w-2/12 h-5/6 rounded-xl"
        />
      </div>

      {/* React & Comment */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <div className="bg-[#F4F4FA] px-2 text-black flex flex-row items-center space-x-1 rounded-full">
            <span>🔥</span>
            <span className="text-sm">4</span>
          </div>
          <div className="bg-[#F4F4FA] px-2 text-black flex flex-row items-center space-x-1 rounded-full">
            <span>🎉</span>
            <span className="text-sm">3</span>
          </div>
          <div className="bg-[#F4F4FA] px-2 text-black flex flex-row items-center space-x-1 rounded-full">
            <span>🤘🏻</span>
            <span className="text-sm">2</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <span className="text-[#63637B] text-sm mr-2"> 2 comments </span>

          <div className="inline-flex flex-row-reverse">
            {/* Comment avatars */}
            {[
              {
                avatar: "images/pilot_cat.png",
              },
              {
                avatar: "images/pilot_cat.png",
              },
              {
                avatar: "images/pilot_cat.png",
              },
            ].map((item, index) => (
              <span
                key={index}
                className={`relative border-[1px] border-white rounded-full overflow-hidden w-8 ml-[-10px]`}
              >
                <img src={item.avatar} alt="avatar" className="block w-full" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
