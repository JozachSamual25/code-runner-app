'use client';

import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import HelpPanel from './components/HelpPanel';
import { autoFixCode } from './components/AutoFixer';
import { Play, Wrench, HelpCircle } from 'lucide-react';

export default function Home() {
  const [code, setCode] = useState(`// Write your JavaScript code here
function greet(name) {
  console.log("Hello, " + name)
  return name
}

greet("World")`);
  
  const [output, setOutput] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const runCode = () => {
    setOutput('');
    const logs = [];
    
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    try {
      eval(code);
      setOutput(logs.length > 0 ? logs.join('\n') : '✓ Code executed successfully (no output)');
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      console.log = originalLog;
    }
  };

  const handleAutoFix = () => {
    const { fixedCode, message } = autoFixCode(code);
    setCode(fixedCode);
    setOutput(message);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Code Runner</h1>
        <div className="flex gap-2">
          <button
            onClick={handleAutoFix}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition"
          >
            <Wrench size={18} />
            Auto-Fix
          </button>
          <button
            onClick={runCode}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            <Play size={18} />
            Run Code
          </button>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            <HelpCircle size={18} />
            Help
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <CodeEditor code={code} setCode={setCode} output={output} />
        {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
      </div>
    </div>
  );
}