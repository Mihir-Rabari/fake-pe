import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

// Language icons mapping
const languageIcons = {
  javascript: '🟨',
  typescript: '🔷',
  python: '🐍',
  java: '☕',
  jsx: '⚛️',
  tsx: '⚛️',
  html: '🌐',
  css: '🎨',
  json: '📋',
  bash: '💻',
  shell: '💻',
  sql: '🗄️',
  text: '📄'
};

// Simple syntax highlighter using regex patterns
const highlightSyntax = (code, language) => {
  if (language === 'text') return code;
  
  let highlighted = code;
  
  // Keywords
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'import', 'export', 'from', 'default', 'class', 'extends', 'async', 'await',
    'try', 'catch', 'throw', 'new', 'this', 'super', 'static', 'public', 'private'
  ];
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span class="text-purple-400">$1</span>`);
  });
  
  // Strings
  highlighted = highlighted.replace(
    /(['"`])(?:(?=(\\?))\2.)*?\1/g,
    '<span class="text-green-400">$&</span>'
  );
  
  // Comments
  highlighted = highlighted.replace(
    /\/\/.*/g,
    '<span class="text-gray-500 italic">$&</span>'
  );
  highlighted = highlighted.replace(
    /\/\*[\s\S]*?\*\//g,
    '<span class="text-gray-500 italic">$&</span>'
  );
  
  // Numbers
  highlighted = highlighted.replace(
    /\b\d+\.?\d*\b/g,
    '<span class="text-orange-400">$&</span>'
  );
  
  // Function calls
  highlighted = highlighted.replace(
    /\b(\w+)(?=\()/g,
    '<span class="text-blue-400">$1</span>'
  );
  
  return highlighted;
};

export function CodeBlock({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-fakepe-border bg-fakepe-surface overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CodeBlockHeader({ filename, language, className = '' }) {
  const icon = languageIcons[language?.toLowerCase()] || languageIcons.text;
  
  return (
    <div className={`flex items-center gap-2 px-4 py-2 border-b border-fakepe-border bg-fakepe-background ${className}`}>
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-mono text-fakepe-text-primary">{filename}</span>
      {language && (
        <span className="ml-auto text-xs text-fakepe-text-secondary uppercase">
          {language}
        </span>
      )}
    </div>
  );
}

export function CodeBlockBody({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

export function CodeBlockContent({
  code,
  language = 'text',
  highlightLines = [],
  highlightWords = [],
  focusLines = [],
  showLineNumbers = true,
  showCopyButton = true,
  theme = 'dark',
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');
  const maxLineNumber = lines.length.toString().length;

  const isLineHighlighted = (lineNum) => {
    return highlightLines.some(range => {
      if (typeof range === 'number') return range === lineNum;
      if (typeof range === 'string') {
        const [start, end] = range.split('-').map(Number);
        return lineNum >= start && lineNum <= end;
      }
      return false;
    });
  };

  const isLineFocused = (lineNum) => {
    return focusLines.length > 0 && !focusLines.includes(lineNum);
  };

  const getLinePrefix = (line) => {
    if (line.startsWith('+ ')) return 'add';
    if (line.startsWith('- ')) return 'remove';
    return null;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Copy Button */}
      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-lg bg-fakepe-surface/50 hover:bg-fakepe-surface border border-fakepe-border text-fakepe-text-secondary hover:text-fakepe-primary transition z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-fakepe-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const isHighlighted = isLineHighlighted(lineNum);
            const isFocused = isLineFocused(lineNum);
            const diffType = getLinePrefix(line);
            
            let displayLine = line;
            if (diffType) {
              displayLine = line.substring(2); // Remove diff prefix
            }

            // Highlight words
            let processedLine = displayLine;
            if (highlightWords.length > 0) {
              highlightWords.forEach(word => {
                const regex = new RegExp(`(${word})`, 'gi');
                processedLine = processedLine.replace(
                  regex,
                  '<mark class="bg-fakepe-primary/30 text-fakepe-primary px-1 rounded">$1</mark>'
                );
              });
            }

            // Apply syntax highlighting
            const highlighted = language !== 'text' 
              ? highlightSyntax(processedLine, language)
              : processedLine;

            return (
              <div
                key={index}
                className={`flex ${
                  isHighlighted
                    ? 'bg-fakepe-primary/10 border-l-2 border-fakepe-primary'
                    : ''
                } ${
                  isFocused ? 'opacity-40' : ''
                } ${
                  diffType === 'add'
                    ? 'bg-green-500/10 border-l-2 border-green-500'
                    : diffType === 'remove'
                    ? 'bg-red-500/10 border-l-2 border-red-500'
                    : ''
                }`}
              >
                {/* Diff Indicator */}
                {diffType && (
                  <span
                    className={`inline-block w-4 text-center ${
                      diffType === 'add'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {diffType === 'add' ? '+' : '-'}
                  </span>
                )}

                {/* Line Numbers */}
                {showLineNumbers && (
                  <span
                    className="select-none text-fakepe-text-secondary pr-4 text-right"
                    style={{ minWidth: `${maxLineNumber + 1}ch` }}
                  >
                    {lineNum}
                  </span>
                )}

                {/* Code Line */}
                <span
                  className="flex-1 text-fakepe-text-primary"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

// Export all components
export default CodeBlock;
