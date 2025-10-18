import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../context/ThemeContext';

export default function CodeBlock({ 
  code, 
  language = 'bash', 
  title, 
  filename,
  showLineNumbers = true,
  highlightLines = [],
  startingLineNumber = 1
}) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

  // Theme-aware syntax highlighting
  const syntaxTheme = isDark ? vscDarkPlus : vs;

  return (
    <div className={`my-6 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-300'} ${isDark ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} shadow-2xl overflow-hidden`}>
      {/* Header */}
      {(title || filename || language) && (
        <div className={`flex items-center justify-between px-5 py-3 ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300'}`}>
          <div className="flex items-center gap-3">
            {/* Mac-style window dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            </div>
            
            {filename && (
              <div className="flex items-center gap-2 ml-2">
                <Terminal className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{filename}</span>
              </div>
            )}
            {title && !filename && (
              <span className={`text-sm font-medium ml-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{title}</span>
            )}
            {language && (
              <span className={`text-xs px-2.5 py-1 ${langColor.bg} text-white rounded-md font-mono font-bold uppercase tracking-wide shadow-lg ${langColor.glow}`}>
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-300'} rounded-md transition-all duration-200`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">Copied!</span>
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
            className={`absolute top-3 right-3 p-2 ${isDark ? 'bg-gray-800/90 hover:bg-gray-700' : 'bg-gray-200/90 hover:bg-gray-300'} rounded-lg transition z-10 shadow-lg`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
            )}
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={syntaxTheme}
          showLineNumbers={showLineNumbers}
          startingLineNumber={startingLineNumber}
          wrapLines={true}
          lineNumberStyle={{
            minWidth: '3.5em',
            paddingRight: '1.5em',
            paddingLeft: '0.5em',
            textAlign: 'right',
            userSelect: 'none',
            opacity: isDark ? 0.4 : 0.5,
            color: isDark ? '#6e7681' : '#57606a',
            borderRight: isDark ? '1px solid #30363d' : '1px solid #d0d7de',
            marginRight: '1em',
          }}
          lineProps={(lineNumber) => {
            const style = { display: 'block' };
            if (highlightLines.includes(lineNumber)) {
              style.backgroundColor = isDark ? 'rgba(97, 218, 251, 0.08)' : 'rgba(59, 130, 246, 0.08)';
              style.borderLeft = `3px solid ${isDark ? '#61dafb' : '#3b82f6'}`;
              style.paddingLeft = '0.75rem';
              style.marginLeft = '-0.75rem';
            }
            return { style };
          }}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: isDark ? '#0d1117' : '#f6f8fa',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '0',
            paddingRight: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
