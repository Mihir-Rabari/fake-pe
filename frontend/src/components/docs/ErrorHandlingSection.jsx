import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function ErrorHandlingSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Error Handling</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Handle errors gracefully in your integration</p>
      </div>

      {/* Error Codes Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6 pb-4">Common Error Codes</h2>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left p-3 font-semibold">Status Code</th>
              <th className="text-left p-3 font-semibold">Description</th>
              <th className="text-left p-3 font-semibold">Common Causes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="p-3"><code className="text-red-600">400</code></td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Bad Request</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Missing required parameters, invalid data format</td>
            </tr>
            <tr>
              <td className="p-3"><code className="text-red-600">401</code></td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Unauthorized</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Invalid API credentials</td>
            </tr>
            <tr>
              <td className="p-3"><code className="text-red-600">404</code></td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Not Found</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Payment or resource doesn't exist</td>
            </tr>
            <tr>
              <td className="p-3"><code className="text-red-600">422</code></td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Unprocessable Entity</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Validation errors, insufficient balance</td>
            </tr>
            <tr>
              <td className="p-3"><code className="text-red-600">500</code></td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Internal Server Error</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Server-side issues</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Basic Error Handling */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Basic Error Handling</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Always wrap API calls in try-catch blocks:</p>
        <CodeBlock 
          code={`try {
  const payment = await fakepe.payments.create({
    merchantId: 'mer_123',
    amount: 50000,
    orderId: 'order_001'
  });
  console.log('Payment created:', payment.paymentId);
} catch (error) {
  console.error('Payment creation failed:', error.message);
  
  if (error.statusCode) {
    console.error('Status code:', error.statusCode);
  }
  
  if (error.response) {
    console.error('Error details:', error.response);
  }
}`}
          onCopy={() => copyCode('basic-error', 'err1')}
          copied={copiedCode === 'err1'}
        />
      </div>

      {/* Advanced Error Handling */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Advanced Error Handling</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Handle specific error types:</p>
        <CodeBlock 
          code={`async function handlePayment() {
  try {
    const payment = await fakepe.payments.create({
      merchantId: 'mer_123',
      amount: 50000,
      orderId: 'order_001'
    });
    return { success: true, payment };
  } catch (error) {
    // Handle specific error types
    if (error.statusCode === 401) {
      console.error('Authentication failed. Check your API credentials.');
      // Refresh credentials or notify admin
    } else if (error.statusCode === 422) {
      console.error('Validation error:', error.response?.error);
      // Show user-friendly error message
    } else if (error.statusCode >= 500) {
      console.error('Server error. Please retry later.');
      // Implement retry logic
    } else {
      console.error('Unexpected error:', error);
    }
    
    return { success: false, error: error.message };
  }
}`}
          onCopy={() => copyCode('advanced-error', 'err2')}
          copied={copiedCode === 'err2'}
        />
      </div>

      {/* Retry Logic */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Retry Logic</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Implement automatic retries for server errors:</p>
        <CodeBlock 
          code={`async function createPaymentWithRetry(params, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const payment = await fakepe.payments.create(params);
      return payment;
    } catch (error) {
      // Only retry on server errors
      if (error.statusCode >= 500 && attempt < maxRetries) {
        console.log(\`Attempt \${attempt} failed. Retrying...\`);
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      } else {
        throw error;
      }
    }
  }
}`}
          onCopy={() => copyCode('retry-logic', 'err3')}
          copied={copiedCode === 'err3'}
        />
      </div>

      {/* Error Response Format */}
      <div className="border-l-4 border-orange-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Error Response Format</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">All errors follow a consistent format:</p>
        <CodeBlock 
          code={`{
  "error": "Descriptive error message",
  "statusCode": 400,
  "details": {
    // Additional error context (if available)
  }
}`}
          onCopy={() => copyCode('error-format', 'err4')}
          copied={copiedCode === 'err4'}
          language="json"
        />
      </div>

      {/* Best Practices */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-200">Best Practices</h3>
            <ul className="text-green-800 dark:text-green-300 text-sm mt-2 space-y-1">
              <li>• Always wrap API calls in try-catch blocks</li>
              <li>• Log errors with sufficient context for debugging</li>
              <li>• Implement retry logic for transient errors (500+)</li>
              <li>• Show user-friendly error messages</li>
              <li>• Monitor error rates and set up alerts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Issues */}
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <div className="flex items-start">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-200">Common Issues & Solutions</h3>
            <div className="text-red-800 dark:text-red-300 text-sm mt-2 space-y-2">
              <p><strong>401 Unauthorized:</strong> Check your key_id and key_secret are correct</p>
              <p><strong>404 Not Found:</strong> Verify the payment ID or resource exists</p>
              <p><strong>422 Validation Error:</strong> Check all required fields are provided with valid data</p>
              <p><strong>500 Server Error:</strong> Retry the request or check server status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
