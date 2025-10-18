import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../../context/ThemeContext";

export default function CodeBlock({
  code,
  language = "bash",
  filename = "terminal",
  highlightLines = [],
  startingLineNumber = 1,
  showLineNumbers = true,
}) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const syntaxTheme = isDark ? vscDarkPlus : vs;

  return (
    <div
      className={`group my-6 overflow-hidden rounded-lg border transition-all ${
        isDark
          ? "border-[#2d333b] bg-[#0d1117] shadow-[0_0_0_1px_#2d333b]"
          : "border-gray-200 bg-[#f9fafb] shadow-[0_0_0_1px_#e5e7eb]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 text-xs font-medium font-mono border-b ${
          isDark
            ? "bg-[#161b22] border-[#2d333b] text-gray-400"
            : "bg-[#f3f4f6] border-gray-200 text-gray-600"
        }`}
      >
        <span>{filename}</span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
            isDark
              ? "text-gray-400 hover:text-white hover:bg-[#21262d]"
              : "text-gray-700 hover:text-black hover:bg-gray-200"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Section */}
      <SyntaxHighlighter
        language={language}
        style={syntaxTheme}
        showLineNumbers={showLineNumbers}
        startingLineNumber={startingLineNumber}
        wrapLines
        lineNumberStyle={{
          minWidth: "3em",
          paddingRight: "1.25em",
          textAlign: "right",
          opacity: 0.6,
          color: isDark ? "#8b949e" : "#7a828a",
          fontSize: "0.8rem",
          borderRight: isDark ? "1px solid #2d333b" : "1px solid #e5e7eb",
          marginRight: "1em",
        }}
        lineProps={(lineNumber) => {
          const style = {
            display: "block",
            paddingLeft: "0.75rem",
            transition: "background 0.2s ease",
          };
          if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = isDark
              ? "rgba(56, 139, 253, 0.15)"
              : "rgba(37, 99, 235, 0.08)";
            style.borderLeft = `3px solid ${
              isDark ? "#388bfd" : "rgba(37,99,235,1)"
            }`;
          }
          return { style };
        }}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "1rem 1.25rem",
          fontSize: "0.875rem",
          lineHeight: "1.65",
          background: isDark ? "#0d1117" : "#f9fafb",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace",
          },
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
