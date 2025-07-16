'use client';
import Layout from '@/components/layout/Layout';

import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, ChevronLeft, ChevronRight, Users, Award, BookOpen } from 'lucide-react';

// Define the data for the centers
const centersData = [
  {
    imageSrc: '/images/community/tukyHN.png',
    name: 'Trường dạy trẻ tự kỷ ở Hà Nội – Ánh Sao',
    address: '69, Ngõ 255 Phố Vọng, Phường Đồng Tân, Quận Hai Bà Trưng, TP Hà Nội',
    contact: '0912 720 466',
    features: [
      'Đội ngũ giáo viên giàu kinh nghiệm, tâm huyết',
      'Phương pháp giáo dục hiện đại',
      'Cung cấp các chương trình giáo dục phù hợp với từng giai đoạn phát triển của trẻ',
    ],
    rating: 4.5,
    students: 120,
    established: '2015',
  },
  {
    imageSrc: '/images/community/NHC_Academy.png',
    name: 'Trung tâm Giáo dục NHC Academy',
    address: '69, Ngõ 255 Phố Vọng, Phường Đông Tân, Quận Hai Bà Trưng, TP Hà Nội',
    contact: '0912 720 466',
    features: [
      'Đội ngũ giáo viên giàu kinh nghiệm, tâm huyết',
      'Phương pháp giáo dục hiện đại',
      'Cung cấp các chương trình giáo dục phù hợp với từng giai đoạn phát triển của trẻ',
    ],
    rating: 4.5,
    students: 85,
    established: '2018',
  },
  {
    imageSrc: '/images/community/Nangmai.png',
    name: 'Trung tâm Năng Mai',
    address: '69, Ngõ 255 Phố Vọng Phường Đồng Tân, Quận Hai Bà Trưng, TP Hà Nội',
    contact: '0912 720 406',
    features: [
      'Đội ngũ giáo viên giàu kinh nghiệm, tâm huyết',
      'Phương pháp giáo dục hiện đại',
      'Cung cấp các chương trình giáo dục phù hợp với từng giai đoạn phát triển của trẻ',
    ],
    rating: 4.5,
    students: 95,
    established: '2017',
  },
];

const testimonials = [
  {
    name: 'Lan Hương',
    role: 'Mẹ bỉm sữa',
    content: 'Mình rất vui khi bé nhà mình đã có những tiến bộ rất tích cực trong việc giao tiếp, học tập và bé còn chủ động nói chuyện với ba mẹ bé nữa',
    avatar: '/images/community/feedback.jpg',
    rating: 5,
  },
  {
    name: 'Minh Tuấn',
    role: 'Bố của bé An',
    content: 'Trung tâm có môi trường học tập tuyệt vời, giáo viên nhiệt tình và chuyên nghiệp. Bé An thích đến trường mỗi ngày',
    avatar: '/images/community/feedback.jpg',
    rating: 5,
  },
  {
    name: 'Thu Hà',
    role: 'Phụ huynh',
    content: 'Cảm ơn các cô giáo đã kiên nhẫn và tận tâm với con. Sau 6 tháng học, con đã có những thay đổi tích cực rõ rệt',
    avatar: '/images/community/feedback.jpg',
    rating: 5,
  },
];

export default function CentersPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

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
      <div className="bg-[#F6F7F9] min-h-screen py-8 px-4 sm:px-6">
        <div className="max-w-[76rem] mx-auto rounded-3xl border-2 border-r-4 border-b-4 border-black bg-white p-4 sm:p-6 md:p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black text-center mb-4">
              Trung Tâm Giáo Dục Trẻ Em
              <span className="text-blue-600"> Hàng Đầu</span>
            </h1>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Khám phá những trung tâm giáo dục uy tín, chất lượng cao dành cho trẻ em với đội ngũ giáo viên chuyên nghiệp
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl border-2 border-black shadow-sm p-6 max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tên trung tâm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black font-bold"
                />
              </div>

              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black font-bold"
              >
                <option value="">Đối tượng</option>
                <option value="autism">Trẻ tự kỷ</option>
                <option value="adhd">Trẻ tăng động</option>
                <option value="learning">Khó khăn học tập</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black font-bold"
              >
                <option value="">Vị trí</option>
                <option value="haibatrung">Hai Bà Trưng</option>
                <option value="dongda">Đống Đa</option>
                <option value="caugiay">Cầu Giấy</option>
              </select>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl border-2 border-black font-semibold hover:bg-blue-700 transition shadow">
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Centers Section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {centersData.map((center, index) => (
                <div key={index} className="bg-white border-2 border-black rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/3 relative overflow-hidden">
                      <img
                        src={center.imageSrc}
                        alt={center.name}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Thành lập {center.established}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-2/3 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-black group-hover:text-blue-600 transition-colors">
                          {center.name}
                        </h2>
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold text-black">{center.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start text-black">
                          <MapPin className="w-5 h-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span>{center.address}</span>
                        </div>
                        <div className="flex items-center text-black">
                          <Phone className="w-5 h-5 mr-2 text-gray-400" />
                          <span className="font-semibold">{center.contact}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="flex items-center text-black">
                          <Users className="w-5 h-5 mr-2 text-blue-500" />
                          <span className="text-sm">{center.students} học sinh</span>
                        </div>
                        <div className="flex items-center text-black">
                          <Award className="w-5 h-5 mr-2 text-green-500" />
                          <span className="text-sm">Chứng nhận</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-black mb-3 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                          Điểm nổi bật
                        </h3>
                        <ul className="space-y-2">
                          {center.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-black">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl border-2 border-black font-semibold hover:bg-blue-700 transition">
                          Tìm hiểu thêm
                        </button>
                        <button className="border-2 border-black text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-50 transition">
                          Liên hệ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl border-2 border-black font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Xem thêm trung tâm
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-16 mt-8 rounded-3xl border-2 border-black max-w-[76rem] mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Phụ Huynh Nói Gì Về Chúng Tôi
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                Những chia sẻ chân thành từ các bậc phụ huynh đã tin tưởng đồng hành cùng chúng tôi
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                  />

                  <div className="flex justify-center mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>

                  <p className="text-lg text-black mb-6 max-w-2xl mx-auto leading-relaxed italic">
                    {testimonials[currentTestimonial].content}
                  </p>

                  <div className="text-center">
                    <h4 className="font-bold text-black text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-black">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-black hover:text-blue-600 border-2 border-black"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-black hover:text-blue-600 border-2 border-black"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}