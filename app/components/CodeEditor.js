'use client';

import React from 'react';

export default function CodeEditor({ code, setCode, output }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Editor Area */}
      <div className="flex-1 p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-gray-800 text-gray-100 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          spellCheck={false}
          placeholder="Write your JavaScript code here..."
        />
      </div>

      {/* Console Output */}
      <div className="h-48 bg-gray-950 border-t border-gray-700 p-4 overflow-auto">
        <div className="text-sm font-semibold mb-2 text-gray-400">Console Output:</div>
        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
          {output || 'Click "Run Code" to see output here...'}
        </pre>
      </div>
    </div>
  );
}