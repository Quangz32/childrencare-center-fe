"use client";

import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Define the data for solutions
const solutionsData = [
  {
    imageSrc: "/images/anh_duong_kit.png",
    title: "Ánh Dương Learning kit",
    description:
      "Hỗ trợ trẻ phát triển kỹ năng giao tiếp và ngôn ngữ thông qua các hoạt động tương tác.",
    features: ["Màu sắc tươi sáng", "Chất liệu an toàn", "Kích thích sáng tạo"],
    rating: 4.8,
    students: 150,
    established: "2025",
  },
  {
    imageSrc: "/images/anh_duong_kit2.png",
    title: "Ánh Dương Learning kit 2",
    description:
      "Tăng cường khả năng tư duy và nhận thức thông qua bộ kit.",
    features: ["Phương pháp STEM", "Công cụ học tập hiện đại", "Đánh giá định kỳ"],
    rating: 4.7,
    students: 120,
    established: "2025",
  },
  // {
  //   imageSrc: "/images/community/children.png",
  //   title: "Phát triển nhận thức",
  //   description:
  //     "Tăng cường khả năng tư duy và nhận thức thông qua các bài tập phù hợp với lứa tuổi.",
  //   features: ["Phương pháp STEM", "Công cụ học tập hiện đại", "Đánh giá định kỳ"],
  //   rating: 4.9,
  //   students: 180,
  //   established: "2019",
  // },
];

const testimonials = [
  {
    name: 'Chị Lan Hương',
    role: 'Mẹ bé Minh Anh',
    content: 'Mình rất vui khi bé nhà mình đã có những tiến bộ rất tích cực trong việc giao tiếp, học tập và bé còn chủ động nói chuyện với ba mẹ bé nữa.',
    avatar: '/images/community/feedback.jpg',
    rating: 5
  },
  {
    name: 'Anh Minh Tuấn',
    role: 'Bố bé Hoàng Anh',
    content: 'Các phương pháp giáo dục của trung tâm rất hiệu quả. Bé nhà mình đã tự tin hơn trong giao tiếp và hòa nhập tốt với bạn bè.',
    avatar: '/images/community/feedback.jpg',
    rating: 5
  },
  {
    name: 'Chị Hồng Nhung',
    role: 'Mẹ bé Bảo An',
    content: 'Đội ngũ giáo viên rất nhiệt tình và chuyên nghiệp. Họ luôn quan tâm đến sự phát triển của từng bé và có phương pháp riêng phù hợp.',
    avatar: '/images/community/feedback.jpg',
    rating: 5
  }
];

export default function Page() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#fff] py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-[#002249] text-5xl font-bold mb-4">Childrencare Center</h1>
            <h2 className="text-[#002249] text-2xl font-semibold mb-4">
              Vươn tới ánh dương<br/>Thắp sáng tương lai trẻ thơ
            </h2>
            <p className="text-[#002249] text-lg mb-6">
              Bộ giáo trình Ánh Dương là một công cụ giáo dục đa năng được thiết kế để hỗ trợ trẻ em từ 2-8 tuổi (hoặc một độ tuổi cụ thể) bị chậm phát triển hoặc rối loạn phổ tự kỷ.
            </p>
            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full border-2 border-blue-800 shadow hover:bg-blue-700 transition-colors" onClick={() => window.open('https://www.facebook.com/profile.php?id=61577325685154', '_blank')}>
              Tìm hiểu bộ giáo trình
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-[400px] w-full rounded-2xl border-2 border-[#e6e6d6] shadow-lg bg-[#fcfbe9] p-4">
              <Image
                src="/images/community/children.png"
                alt="Childrencare Center Solutions"
                fill
                className="object-cover rounded-xl border border-r-4 border-b-4 border-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-[#f8f9fa] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-[#002249] text-3xl font-bold mb-12 text-center">Giải pháp cho trẻ</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutionsData.map((solution, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="relative h-80 w-full mb-6">
                  <Image
                    src={solution.imageSrc}
                    alt={solution.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center mb-3">
                  {renderStars(solution.rating)}
                  <span className="ml-2 text-gray-600">({solution.rating})</span>
                </div>
                <h3 className="text-[#002249] text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors" onClick={() => window.open('https://www.facebook.com/profile.php?id=61577325685154', '_blank')}>
                  Tìm hiểu thêm →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-[#002249] text-3xl font-bold mb-12 text-center">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-[#FFF8DC] from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                />

                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed italic">
                  {testimonials[currentTestimonial].content}
                </p>

                <div className="text-center">
                  <h4 className="font-bold text-gray-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
