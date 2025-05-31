import Layout from '@/components/layout/Layout';

export default function Doctors() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Our Doctors</h1>
        <p className="text-lg mb-6">
          Meet our team of experienced pediatricians and childcare specialists.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Doctor Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">Doctor Photo</span>
            </div>
            <h2 className="text-xl font-semibold text-blue-800">Dr. Jane Smith</h2>
            <p className="text-gray-600 italic mb-4">Pediatrician</p>
            <p className="text-gray-700 text-sm">
              Placeholder biography for Dr. Jane Smith. This will include details about her 
              experience, specialties, and approach to childcare.
            </p>
          </div>
          
          {/* Doctor Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">Doctor Photo</span>
            </div>
            <h2 className="text-xl font-semibold text-blue-800">Dr. John Johnson</h2>
            <p className="text-gray-600 italic mb-4">Child Psychologist</p>
            <p className="text-gray-700 text-sm">
              Placeholder biography for Dr. John Johnson. This will include details about his 
              experience, specialties, and approach to child psychology.
            </p>
          </div>
          
          {/* Doctor Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">Doctor Photo</span>
            </div>
            <h2 className="text-xl font-semibold text-blue-800">Dr. Sarah Lee</h2>
            <p className="text-gray-600 italic mb-4">Nutritionist</p>
            <p className="text-gray-700 text-sm">
              Placeholder biography for Dr. Sarah Lee. This will include details about her 
              experience, specialties, and approach to child nutrition.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 