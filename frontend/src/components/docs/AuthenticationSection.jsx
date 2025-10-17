import React from 'react';
import { Key, XCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function AuthenticationSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Secure your API requests with key-based authentication</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Key className="w-6 h-6 text-blue-600" />
          HTTP Basic Authentication
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          FakePE uses HTTP Basic Auth. Your <code className="bg-white/50 dark:bg-black/30 px-2 py-1 rounded">key_id</code> acts as the username and <code className="bg-white/50 dark:bg-black/30 px-2 py-1 rounded">key_secret</code> as the password.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">SDK Authentication</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">When using the SDK, authentication is automatic:</p>
          <CodeBlock 
            code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'your_key_id',        // Your API Key ID
  key_secret: 'your_key_secret', // Your API Secret
  baseUrl: 'http://localhost:4000'
});

// All requests are automatically authenticated
const payment = await fakepe.payments.create({ ... });`}
            onCopy={() => copyCode('sdk-auth', 'auth1')}
            copied={copiedCode === 'auth1'}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Direct API Requests</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">For direct HTTP requests, include credentials in the Authorization header:</p>
          <CodeBlock 
            code={`curl -X POST http://localhost:4000/api/v1/payments \\
  -u "key_id:key_secret" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchantId": "mer_123",
    "amount": 50000,
    "orderId": "order_001"
  }'`}
            onCopy={() => copyCode('curl-auth', 'auth2')}
            copied={copiedCode === 'auth2'}
            language="bash"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Environment Variables</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">Best practice: Store credentials in environment variables:</p>
          <CodeBlock 
            code={`# .env file
FAKEPE_KEY_ID=test_key_id
FAKEPE_KEY_SECRET=test_key_secret
FAKEPE_BASE_URL=http://localhost:4000`}
            onCopy={() => copyCode('env-auth', 'auth3')}
            copied={copiedCode === 'auth3'}
            language="bash"
          />
          <div className="mt-3">
            <CodeBlock 
              code={`// In your code
require('dotenv').config();

const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET,
  baseUrl: process.env.FAKEPE_BASE_URL
});`}
              onCopy={() => copyCode('env-code', 'auth4')}
              copied={copiedCode === 'auth4'}
            />
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <div className="flex items-start">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-200">Security Best Practices</h3>
            <ul className="text-red-800 dark:text-red-300 text-sm mt-2 space-y-1">
              <li>• Never commit API keys to version control</li>
              <li>• Use environment variables for credentials</li>
              <li>• Rotate keys regularly in production</li>
              <li>• Keep your key_secret private and secure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
