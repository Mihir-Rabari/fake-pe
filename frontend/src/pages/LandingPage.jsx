import React from 'react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Expe
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Modern Payment Gateway for Developers
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Build, test, and scale payment integrations with our comprehensive BaaS platform.
            UPI-style payments, webhooks, real-time updates, and more.
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
              View Docs
            </button>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fast Integration</h3>
            <p className="text-gray-600">Get started in minutes with our simple REST APIs and SDKs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600">WebSocket-based live payment notifications</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Developer First</h3>
            <p className="text-gray-600">Comprehensive docs, test mode, and sandbox environment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
