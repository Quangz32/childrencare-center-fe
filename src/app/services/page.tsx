import Layout from '@/components/layout/Layout';

export default function Services() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Our Services</h1>
        <p className="text-lg mb-6">
          Explore the range of childcare services we offer at Children Care Center.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Child Health Checkups</h2>
            <p className="text-gray-700">
              Placeholder description for health checkup services offered at our center.
            </p>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Developmental Programs</h2>
            <p className="text-gray-700">
              Placeholder description for the developmental programs we offer for children.
            </p>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Nutritional Guidance</h2>
            <p className="text-gray-700">
              Placeholder description for the nutritional guidance services we provide.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 