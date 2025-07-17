'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

const faqs = [
  {
    question: 'Khi nào tôi nên đưa con đi khám bác sĩ định kỳ?',
    answer: 'Bạn nên đưa con đi khám bác sĩ định kỳ theo lịch tiêm chủng và kiểm tra sức khỏe tổng quát ít nhất 6 tháng/lần.'
  },
  {
    question: 'Con tôi không chịu nghe lời, làm thế nào để dạy con biết vâng lời mà không làm tổn thương tâm lý của trẻ?',
    answer: (
      <ul className="list-disc pl-5">
        <li>Lắng nghe con: Hiểu lý do tại sao con không nghe lời để có cách giải quyết phù hợp.</li>
        <li>Đặt ra quy tắc rõ ràng: Giải thích cho con về các quy tắc và lý do đằng sau những yêu cầu.</li>
        <li>Khen thưởng hành vi tốt: Khuyến khích và khen ngợi con khi con làm theo yêu cầu.</li>
        <li>Kiên nhẫn và nhất quán: Hãy kiên nhẫn và đảm bảo bạn luôn nhất quán trong cách phản ứng với hành vi của con.</li>
        <li>Tránh la mắng hoặc đe dọa: Hạn chế la mắng hoặc phạt nghiêm khắc, thay vào đó hãy sử dụng các biện pháp nhẹ nhàng nhưng quyết đoán.</li>
      </ul>
    )
  },
  {
    question: 'Làm thế nào để tăng cường hệ miễn dịch cho trẻ nhỏ?',
    answer: 'Đảm bảo trẻ ăn uống đủ chất, ngủ đủ giấc, vận động thường xuyên và tiêm chủng đầy đủ.'
  },
  {
    question: 'Chế độ ăn như thế nào là tốt nhất cho trẻ dưới 1 tuổi?',
    answer: 'Trẻ dưới 1 tuổi nên được bú mẹ hoàn toàn trong 6 tháng đầu, sau đó ăn dặm kết hợp bú mẹ.'
  },
  {
    question: 'Khi nào tôi có thể cho con ăn dặm và thực phẩm nào là phù hợp?',
    answer: 'Bạn có thể cho trẻ ăn dặm từ 6 tháng tuổi, bắt đầu bằng bột ngọt, rau củ nghiền, sau đó tăng dần độ thô.'
  },
  {
    question: 'Trẻ em có nên ngủ chung với bố mẹ hay không?',
    answer: 'Nên tập cho trẻ ngủ riêng để hình thành thói quen tự lập, nhưng có thể ngủ chung khi trẻ còn quá nhỏ.'
  },
  {
    question: 'Làm sao để giúp trẻ tự lập và tự tin hơn?',
    answer: 'Khuyến khích trẻ tự làm các việc cá nhân, động viên trẻ thử sức với những điều mới và luôn lắng nghe, hỗ trợ trẻ.'
  },
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', question: '' });
  const [errors, setErrors] = useState<{ email?: string; phone?: string; topic?: string; question?: string }>({});
  const [popup, setPopup] = useState<{ email?: string; phone?: string; topic?: string; question?: string }>({});

  const handleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const validate = () => {
    const newErrors: { email?: string; phone?: string; topic?: string; question?: string } = {};
    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!form.phone.match(/^\d{9,11}$/)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!form.topic.trim()) {
      newErrors.topic = 'Vui lòng nhập nội dung này';
    }
    if (!form.question.trim()) {
      newErrors.question = 'Vui lòng nhập câu hỏi';
    }
    setErrors(newErrors);
    // Hiện popup lỗi và tự ẩn sau 2s
    if (newErrors.email) {
      setPopup(p => ({ ...p, email: newErrors.email }));
      setTimeout(() => setPopup(p => ({ ...p, email: undefined })), 2000);
    }
    if (newErrors.phone) {
      setPopup(p => ({ ...p, phone: newErrors.phone }));
      setTimeout(() => setPopup(p => ({ ...p, phone: undefined })), 2000);
    }
    if (newErrors.topic) {
      setPopup(p => ({ ...p, topic: newErrors.topic }));
      setTimeout(() => setPopup(p => ({ ...p, topic: undefined })), 2000);
    }
    if (newErrors.question) {
      setPopup(p => ({ ...p, question: newErrors.question }));
      setTimeout(() => setPopup(p => ({ ...p, question: undefined })), 2000);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Gửi thành công!');
        setForm({ name: '', email: '', phone: '', topic: '', question: '' });
      } else {
        alert(data.message || 'Có lỗi xảy ra!');
      }
    } catch (err) {
      alert('Không thể gửi câu hỏi.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#F6F7F9] py-8 px-2 md:px-0 flex flex-col items-center">
        {/* Box giải đáp thắc mắc */}
        <div className="w-full max-w-[76rem] bg-[#FFF8DC] border border-r-4 border-b-4 border-black rounded-3xl p-6 mb-8 shadow-md">
          <h2 className="text-center text-2xl font-bold text-[#002249] mb-8 mt-4">Giải đáp thắc mắc cùng chuyên gia</h2>
          <div className="divide-y divide-[#E5E7EB] bg-white border border-black rounded-xl p-6">
            {(showAll ? faqs : faqs.slice(0, 6)).map((faq, idx) => (
              <div key={idx}>
                <button
                  className={`w-full max-w-[76rem] text-left py-3 font-semibold text-[#002249] flex justify-between items-center focus:outline-none ${openIndex === idx ? 'text-blue-700' : ''}`}
                  onClick={() => handleAccordion(idx)}
                >
                  <span>{faq.question}</span>
                  <span>{openIndex === idx ? '▲' : '▼'}</span>
                </button>
                {openIndex === idx && (
                  <div className="bg-white rounded-xl p-4 text-[#292E35] text-sm mb-2 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          {(!showAll || (showAll && faqs.length > 6)) && (
            <div className="flex justify-center mt-2">
              {showAll ? (
                <button
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  onClick={() => setShowAll(false)}
                >
                  Thu gọn <span className="text-lg">▲</span>
                </button>
              ) : (
                <button
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  onClick={() => setShowAll(true)}
                >
                  Xem thêm <span className="text-lg">▼</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Box hỏi chuyên gia + form nhập thông tin */}
        <div className="w-full max-w-[76rem] bg-white border border-r-4 border-b-4 border-black rounded-2xl p-8 shadow-md flex flex-col md:flex-row gap-6 items-stretch">
          <div className="flex-1 flex flex-col justify-center bg-white">
            <h3 className="text-[#002249] text-2xl font-bold mb-4">Hãy để chuyên gia giúp bạn giải quyết những thắc mắc của riêng bạn.</h3>
            <p className="text-[#292E35] text-base mb-4">Với đội ngũ chuyên gia, bác sĩ đầu ngành, Chidrencare Center sẽ giúp bạn giải đáp những thắc mắc trong việc chăm sóc bé nhà mình. Mục tiêu của chúng ta là xây dựng bước đệm vững trái cho bé có thể vững vàng phát triển.</p>
            <ul className="text-[#2563EB] text-base font-semibold space-y-3 mb-2">
              <li className="flex items-center gap-2"><span className="inline-block w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="8" fill="#2563EB"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Đội ngũ chuyên gia, bác sĩ đầu ngành</li>
              <li className="flex items-center gap-2"><span className="inline-block w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="8" fill="#2563EB"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Trả lời nhanh chóng, khoa học</li>
              <li className="flex items-center gap-2"><span className="inline-block w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="8" fill="#2563EB"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Tư vấn và hướng dẫn tận tình</li>
            </ul>
          </div>
          <div className="flex-1 bg-[#FFF8DC] border border-black rounded-2xl flex flex-col justify-center">
            <h4 className="text-[#002249] text-xl font-bold mb-4 mt-5 text-center">Nhập thông tin của bạn</h4>
            <form className="flex flex-col gap-3 px-6 pb-2" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ tên"
                className="text-gray-500 font-bold border border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.name}
                onChange={handleChange}
              />
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full text-gray-500 font-bold border border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                />
                {/* Popup lỗi email */}
                {popup.email && (
                  <div className="absolute z-10 mt-1 ml-2 bg-red-500 text-white text-xs rounded px-3 py-1 shadow animate-fade-in">
                    {popup.email}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  placeholder="Điện thoại"
                  className={`w-full text-gray-500 font-bold border border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.phone ? 'border-red-500' : ''}`}
                  value={form.phone}
                  onChange={handleChange}
                />
                {/* Popup lỗi phone */}
                {popup.phone && (
                  <div className="absolute z-10 mt-1 ml-2 bg-red-500 text-white text-xs rounded px-3 py-1 shadow animate-fade-in">
                    {popup.phone}
                  </div>
                )}
              </div>
              <input
                type="text"
                name="topic"
                placeholder="Bạn có muốn được tư vấn trực tiếp hay không?"
                className={`text-gray-500 font-bold border border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.topic ? 'border-red-500' : ''}`}
                value={form.topic}
                onChange={handleChange}
              />
              {popup.topic && (
                <div className="absolute z-10 mt-1 ml-2 bg-red-500 text-white text-xs rounded px-3 py-1 shadow animate-fade-in">
                  {popup.topic}
                </div>
              )}
              <textarea
                name="question"
                placeholder="Hãy cho chúng mình biết thắc mắc của bạn?"
                className={`text-gray-500 font-bold border border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[60px] ${errors.question ? 'border-red-500' : ''}`}
                value={form.question}
                onChange={handleChange}
              />
              {popup.question && (
                <div className="absolute z-10 mt-1 ml-2 bg-red-500 text-white text-xs rounded px-3 py-1 shadow animate-fade-in">
                  {popup.question}
                </div>
              )}
              <button type="submit" className="bg-blue-600 border-2 border-black text-white h-11 mb-2 px-6 py-1.5 rounded-3xl font-semibold hover:bg-blue-700 transition mt-2 mx-auto">Gửi câu hỏi</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 