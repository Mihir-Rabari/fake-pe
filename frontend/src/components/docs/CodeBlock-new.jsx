import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ 
  code, 
  language = 'bash', 
  title, 
  filename,
  showLineNumbers = true,
  highlightLines = [],  // e.g., [3, 5, 6] to highlight lines 3, 5, and 6
  startingLineNumber = 1
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageColors = {
    javascript: { bg: 'bg-yellow-500', text: 'text-yellow-500', glow: 'shadow-yellow-500/50' },
    typescript: { bg: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-500/50' },
    bash: { bg: 'bg-green-500', text: 'text-green-500', glow: 'shadow-green-500/50' },
    shell: { bg: 'bg-green-500', text: 'text-green-500', glow: 'shadow-green-500/50' },
    json: { bg: 'bg-purple-500', text: 'text-purple-500', glow: 'shadow-purple-500/50' },
    python: { bg: 'bg-blue-600', text: 'text-blue-600', glow: 'shadow-blue-600/50' },
    jsx: { bg: 'bg-cyan-500', text: 'text-cyan-500', glow: 'shadow-cyan-500/50' },
    html: { bg: 'bg-orange-500', text: 'text-orange-500', glow: 'shadow-orange-500/50' },
    css: { bg: 'bg-pink-500', text: 'text-pink-500', glow: 'shadow-pink-500/50' },
    php: { bg: 'bg-indigo-500', text: 'text-indigo-500', glow: 'shadow-indigo-500/50' },
  };

  const langColor = languageColors[language] || { bg: 'bg-gray-500', text: 'text-gray-500', glow: 'shadow-gray-500/50' };

  // Custom neon-inspired theme
  const customTheme = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: '#0a0a0a',
      margin: 0,
      padding: showLineNumbers ? '1.25rem 1.25rem 1.25rem 0' : '1.25rem',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: '#0a0a0a',
      textShadow: '0 0 2px rgba(255, 255, 255, 0.1)',
    },
    comment: {
      color: '#6a9955',
      fontStyle: 'italic',
    },
    prolog: { color: '#6a9955' },
    doctype: { color: '#569cd6' },
    cdata: { color: '#6a9955' },
    punctuation: { color: '#d4d4d4' },
    property: { color: '#9cdcfe' },
    tag: { color: '#569cd6' },
    boolean: { color: '#569cd6' },
    number: { color: '#b5cea8' },
    constant: { color: '#4fc1ff' },
    symbol: { color: '#4fc1ff' },
    deleted: { color: '#f44747' },
    selector: { color: '#d7ba7d' },
    'attr-name': { color: '#9cdcfe' },
    string: { color: '#ce9178' },
    char: { color: '#ce9178' },
    builtin: { color: '#4ec9b0' },
    inserted: { color: '#b5cea8' },
    variable: { color: '#9cdcfe' },
    operator: { color: '#d4d4d4' },
    entity: { color: '#569cd6' },
    url: { color: '#3794ff' },
    '.language-css .token.string': { color: '#ce9178' },
    '.style .token.string': { color: '#ce9178' },
    atrule: { color: '#c586c0' },
    'attr-value': { color: '#ce9178' },
    keyword: { color: '#c586c0' },
    function: { color: '#dcdcaa' },
    'class-name': { color: '#4ec9b0' },
    regex: { color: '#d16969' },
    important: { color: '#c586c0', fontWeight: 'bold' },
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
  };

  return (
    <div className="my-6 rounded-xl border border-gray-800 dark:border-gray-700 bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden">
      {/* Header */}
      {(title || filename || language) && (
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
          <div className="flex items-center gap-3">
            {/* Mac-style window dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            </div>
            
            {filename && (
              <div className="flex items-center gap-2 ml-2">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">{filename}</span>
              </div>
            )}
            {title && !filename && (
              <span className="text-sm font-medium text-gray-300 ml-2">{title}</span>
            )}
            {language && (
              <span className={`text-xs px-2.5 py-1 ${langColor.bg} text-white rounded-md font-mono font-bold uppercase tracking-wide shadow-lg ${langColor.glow}`}>
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code */}
      <div className="relative">
        {!title && !filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg transition z-10 shadow-lg"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-300" />
            )}
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={showLineNumbers}
          startingLineNumber={startingLineNumber}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const style = { display: 'block', width: 'fit-content' };
            if (highlightLines.includes(lineNumber)) {
              style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              style.borderLeft = '3px solid #61dafb';
              style.paddingLeft = '0.5rem';
              style.marginLeft = '-0.5rem';
            }
            return { style };
          }}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: '#0a0a0a',
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
          }}
          codeTagProps={{
            style: {
              fontSize: '0.9rem',
              fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
              textShadow: '0 0 2px rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
