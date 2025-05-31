import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to Children Care Center</h1>
        <p className="text-lg mb-6">
          Providing exceptional childcare services with a focus on health, education, and wellbeing.
        </p>
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            To create a nurturing environment where children can thrive physically, emotionally, and intellectually.
          </p>
        </div>
      </div>
    </Layout>
  );
}
