import React from 'react';
import { CodeBlock, CodeBlockHeader, CodeBlockBody, CodeBlockContent } from '../ui';

/**
 * Wrapper component to bridge old CodeBlock API to new CodeBlock component
 * This allows us to update imports without changing all the usage patterns
 */
export default function CodeBlockWrapper({
  code,
  language = 'bash',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  ...props
}) {
  return (
    <CodeBlock>
      {filename && <CodeBlockHeader filename={filename} language={language} />}
      <CodeBlockBody>
        <CodeBlockContent
          code={code}
          language={language}
          showLineNumbers={showLineNumbers}
          showCopyButton={true}
          {...props}
        />
      </CodeBlockBody>
    </CodeBlock>
  );
}
