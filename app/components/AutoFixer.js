'use client';

export function autoFixCode(code) {
  let fixed = code;
  
  // Rule 1: Remove ) that appears between alphanumeric characters (typos like nam)e)
  // This must be done FIRST before counting parentheses
  let prevFixed = '';
  while (prevFixed !== fixed) {
    prevFixed = fixed;
    fixed = fixed.replace(/([a-zA-Z0-9_$])\)([a-zA-Z0-9_$])/g, '$1$2');
  }
  
  // Rule 2: Balance brackets {}
  let openBraces = (fixed.match(/\{/g) || []).length;
  let closeBraces = (fixed.match(/\}/g) || []).length;
  if (openBraces > closeBraces) {
    fixed += '\n' + '}'.repeat(openBraces - closeBraces);
  }
  
  // Rule 3: Balance parentheses () - line by line
  const lines = fixed.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const openCount = (line.match(/\(/g) || []).length;
    const closeCount = (line.match(/\)/g) || []).length;
    
    if (openCount > closeCount) {
      // Add missing closing parentheses at the end of the line
      line += ')'.repeat(openCount - closeCount);
      lines[i] = line;
    }
  }
  fixed = lines.join('\n');

  // Rule 4: Add missing semicolons at end of statements
  fixed = fixed.split('\n').map(line => {
    const trimmed = line.trim();
    
    // Skip lines that don't need semicolons
    if (!trimmed || 
        trimmed.startsWith('//') || 
        trimmed.startsWith('/*') || 
        trimmed.endsWith(';') || 
        trimmed.endsWith('{') || 
        trimmed.endsWith('}') ||
        trimmed.endsWith(',') || 
        trimmed.startsWith('}')) {
      return line;
    }
    
    // Add semicolon to statements
    if (trimmed.match(/^(const|let|var|return|console\.|break|continue|throw)/) ||
        trimmed.match(/\)$/) ||
        trimmed.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/) ||
        trimmed.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*\(.*\)$/)) {
      
      // Don't add to function/control declarations
      if (!trimmed.match(/^(function|if|for|while|do|switch|try|catch|else)\s/)) {
        return line + ';';
      }
    }
    return line;
  }).join('\n');

  // Rule 5: Fix indentation (2 spaces per level)
  const indentedLines = fixed.split('\n');
  let indentLevel = 0;
  fixed = indentedLines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    // Decrease indent for closing braces
    if (trimmed.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    const indented = '  '.repeat(indentLevel) + trimmed;
    
    // Increase indent after opening braces
    if (trimmed.endsWith('{') && !trimmed.startsWith('}')) {
      indentLevel++;
    } else if (trimmed.includes('{') && !trimmed.includes('}')) {
      indentLevel++;
    }
    
    return indented;
  }).join('\n');

  // Rule 6: Remove multiple consecutive spaces (preserve indentation)
  fixed = fixed.split('\n').map(line => {
    const leadingSpaces = line.match(/^\s*/)[0];
    const content = line.trim().replace(/\s{2,}/g, ' ');
    return leadingSpaces + content;
  }).join('\n');

  // Rule 7: Add spaces after keywords
  fixed = fixed.replace(/\b(if|for|while|switch|catch)\(/g, '$1 (');
  fixed = fixed.replace(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\(/g, 'function $1 (');
  
  // Rule 8: Fix spacing around operators
  fixed = fixed.replace(/([a-zA-Z0-9_$])(=)([^=])/g, '$1 $2 $3');
  fixed = fixed.replace(/([a-zA-Z0-9_$])(===|==|!==|!=|<=|>=|\+=|-=|\*=|\/=)([a-zA-Z0-9_$])/g, '$1 $2 $3');
  fixed = fixed.replace(/([a-zA-Z0-9_$])(\+|-|\*|\/|%)([a-zA-Z0-9_$])/g, '$1 $2 $3');
  
  // Rule 9: Fix unclosed quotes
  fixed = fixed.split('\n').map(line => {
    const singleQuotes = (line.match(/'/g) || []).length;
    const doubleQuotes = (line.match(/"/g) || []).length;
    
    // If odd number of quotes, add closing quote
    if (singleQuotes % 2 === 1 && !line.trim().startsWith('//')) {
      line += "'";
    }
    if (doubleQuotes % 2 === 1 && !line.trim().startsWith('//')) {
      line += '"';
    }
    return line;
  }).join('\n');

  const message = '✓ Code auto-fixed! Applied fixes:\n• Removed typo parentheses\n• Balanced brackets and parentheses\n• Added missing semicolons\n• Fixed indentation\n• Cleaned up spacing\n• Fixed operator spacing\n• Closed unclosed quotes';

  return { fixedCode: fixed, message };
}