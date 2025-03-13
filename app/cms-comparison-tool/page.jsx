'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CmsComparisonTool = () => {
  const [selectedCms, setSelectedCms] = useState('WordPress');
  const cmsOptions = ['WordPress', 'Joomla', 'Drupal', 'Shopify', 'Wix'];

  const cmsFeatures = {
    WordPress: {
      easeOfUse: 'Easy',
      customization: 'High',
      support: 'Large community',
      cost: 'Free (with paid options)',
    },
    Joomla: {
      easeOfUse: 'Moderate',
      customization: 'High',
      support: 'Moderate community',
      cost: 'Free (with paid options)',
    },
    Drupal: {
      easeOfUse: 'Difficult',
      customization: 'Very High',
      support: 'Large community',
      cost: 'Free (with paid options)',
    },
    Shopify: {
      easeOfUse: 'Easy',
      customization: 'Moderate',
      support: '24/7 support',
      cost: 'Monthly subscription',
    },
    Wix: {
      easeOfUse: 'Very Easy',
      customization: 'Low',
      support: 'Email support',
      cost: 'Free (with paid options)',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            CMS Comparison Tool
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select CMS to Compare
            </label>
            <select
              value={selectedCms}
              onChange={(e) => setSelectedCms(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {cmsOptions.map((cms) => (
                <option key={cms} value={cms}>
                  {cms}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(cmsFeatures[selectedCms]).map(([feature, value]) => (
              <div key={feature} className="bg-gray-100 p-4 rounded-md shadow">
                <h3 className="font-bold">{feature.replace(/([A-Z])/g, ' $1')}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CmsComparisonTool;
