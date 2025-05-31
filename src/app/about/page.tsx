import Layout from '@/components/layout/Layout';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">About Us</h1>
        <p className="text-lg mb-6">
          Learn more about Children Care Center and our dedicated approach to childcare.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Placeholder text for the about page. This section will contain information about the 
            history of the Children Care Center, our values, and our approach to childcare.
          </p>
        </div>
      </div>
    </Layout>
  );
} 