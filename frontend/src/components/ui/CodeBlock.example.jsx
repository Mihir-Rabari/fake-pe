import React from 'react';
import { CodeBlock, CodeBlockHeader, CodeBlockBody, CodeBlockContent } from './CodeBlock';

// Example 1: Simple code block
export function SimpleExample() {
  const code = `function hello() {
  console.log("Hello, FakePE!");
  return true;
}`;

  return (
    <CodeBlock>
      <CodeBlockBody>
        <CodeBlockContent code={code} language="javascript" />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 2: With header and filename
export function WithHeaderExample() {
  const code = `import React from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  
  return <div>Payment Processing...</div>;
};

export default PaymentPage;`;

  return (
    <CodeBlock>
      <CodeBlockHeader filename="PaymentPage.jsx" language="jsx" />
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="javascript"
          showLineNumbers={true}
          showCopyButton={true}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 3: Highlighted lines
export function HighlightedLinesExample() {
  const code = `const API_URL = 'http://localhost:4000';

async function createPayment(data) {
  const response = await axios.post(\`\${API_URL}/api/v1/payments\`, data);
  return response.data;
}

const payment = await createPayment({ amount: 100 });
console.log(payment);`;

  return (
    <CodeBlock>
      <CodeBlockHeader filename="api.js" language="javascript" />
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="javascript"
          highlightLines={[3, 4, 5]}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 4: Highlighted words
export function HighlightedWordsExample() {
  const code = `const fakepeApi = new FakePEClient({
  apiKey: 'your_api_key',
  environment: 'sandbox'
});

const payment = await fakepeApi.createPayment({
  amount: 1000,
  currency: 'INR'
});`;

  return (
    <CodeBlock>
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="javascript"
          highlightWords={['apiKey', 'sandbox', 'FakePEClient']}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 5: Diff view
export function DiffExample() {
  const code = `  const API_URL = 'http://localhost:4000';
  
- const oldEndpoint = '/payments';
+ const newEndpoint = '/api/v1/payments';
  
- axios.post(oldEndpoint, data);
+ axios.post(\`\${API_URL}\${newEndpoint}\`, data);`;

  return (
    <CodeBlock>
      <CodeBlockHeader filename="migration.diff" language="javascript" />
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="javascript"
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 6: Focus lines
export function FocusLinesExample() {
  const code = `import React from 'react';
import { Button } from './components/ui';

function App() {
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  return (
    <Button onClick={handleClick}>
      Click Me
    </Button>
  );
}`;

  return (
    <CodeBlock>
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="javascript"
          focusLines={[5, 6, 7]}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 7: No line numbers
export function NoLineNumbersExample() {
  const code = `curl -X POST https://api.fakepe.com/v1/payments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "INR",
    "callback_url": "https://yoursite.com/callback"
  }'`;

  return (
    <CodeBlock>
      <CodeBlockHeader filename="create-payment.sh" language="bash" />
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="bash"
          showLineNumbers={false}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

// Example 8: JSON with highlighting
export function JSONExample() {
  const code = `{
  "payment_id": "pay_abc123",
  "amount": 1000,
  "currency": "INR",
  "status": "success",
  "merchant_id": "mer_xyz789",
  "created_at": "2024-10-19T10:30:00Z"
}`;

  return (
    <CodeBlock>
      <CodeBlockHeader filename="response.json" language="json" />
      <CodeBlockBody>
        <CodeBlockContent 
          code={code} 
          language="json"
          highlightLines={[3, 5]}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}

export default {
  SimpleExample,
  WithHeaderExample,
  HighlightedLinesExample,
  HighlightedWordsExample,
  DiffExample,
  FocusLinesExample,
  NoLineNumbersExample,
  JSONExample
};
