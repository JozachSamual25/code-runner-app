'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function HelpPanel({ onClose }) {
  const [helpQuery, setHelpQuery] = useState('');
  const [helpResponse, setHelpResponse] = useState('');

  const getHelp = () => {
    const query = helpQuery.toLowerCase();
    let response = '';

    if (query.includes('error') || query.includes('not working')) {
      response = `Common fixes for errors:
- Check for missing semicolons
- Verify all brackets and parentheses are balanced
- Make sure function names are spelled correctly
- Ensure variables are declared before use`;
    } else if (query.includes('semicolon')) {
      response = `Semicolons in JavaScript:
- Add semicolons at the end of statements
- Not required after { } blocks
- Use the Auto-Fix button to add them automatically`;
    } else if (query.includes('function') || query.includes('how to')) {
      response = `Creating functions:
- Syntax: function name(param) { code }
- Arrow functions: const name = (param) => { code }
- Call with: name(argument)
- Example: function add(a, b) { return a + b; }`;
    } else if (query.includes('console') || query.includes('print') || query.includes('output')) {
      response = `Printing output:
- Use: console.log("message")
- Multiple values: console.log(var1, var2)
- Output appears in the console below
- Example: console.log("Result:", 42)`;
    } else if (query.includes('variable') || query.includes('const') || query.includes('let')) {
      response = `Declaring variables:
- const: for values that don't change
- let: for values that can change
- var: older way (avoid in modern code)
- Example: const name = "Alice"; let age = 25;`;
    } else if (query.includes('loop') || query.includes('for') || query.includes('while')) {
      response = `Loops in JavaScript:
- For loop: for (let i = 0; i < 10; i++) { code }
- While loop: while (condition) { code }
- Array iteration: array.forEach(item => { code })`;
    } else if (query.includes('array') || query.includes('list')) {
      response = `Working with arrays:
- Create: const arr = [1, 2, 3]
- Access: arr[0] (first item)
- Add: arr.push(4)
- Length: arr.length
- Loop: arr.forEach(item => console.log(item))`;
    } else if (query.includes('auto') || query.includes('fix')) {
      response = `Auto-Fix features:
- Adds missing semicolons
- Fixes indentation
- Removes extra spaces
- Adds spaces after keywords
- Balances spacing around operators
Click the Auto-Fix button to apply!`;
    } else {
      response = `I can help with:
- Fixing errors
- Functions and how to create them
- Variables (const, let, var)
- Console output / printing
- Loops (for, while)
- Arrays and lists
- Semicolons and syntax
- Auto-fix features

Try asking: "How do I create a function?" or "Why am I getting an error?"`;
    }

    setHelpResponse(response);
  };

  return (
    <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Help Center</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Ask a question:</label>
          <textarea
            value={helpQuery}
            onChange={(e) => setHelpQuery(e.target.value)}
            placeholder="e.g., How do I create a function?"
            className="w-full bg-gray-900 text-gray-100 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
          <button
            onClick={getHelp}
            className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Get Help
          </button>
        </div>

        {helpResponse && (
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="text-sm font-semibold mb-2 text-blue-400">Response:</div>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">{helpResponse}</pre>
          </div>
        )}
      </div>
    </div>
  );
}