# Code Runner App

A Next.js application that allows users to write JavaScript code, run it, automatically fix basic mistakes, and get help through an intelligent help panel.

## Features

- **Code Editor**: Write and edit JavaScript code
- **Run Code**: Execute code and see output in real-time
- **Auto-Fix**: Automatically fix common coding mistakes
- **Help Panel**: Get context-aware help based on keywords

## Auto-Fix Rules

1. Balances brackets `{}` and parentheses `()`
2. Adds missing semicolons
3. Fixes indentation (2 spaces per level)
4. Removes extra spaces
5. Adds spaces after keywords (if, for, while, etc.)
6. Fixes spacing around operators (=, +, -, *, /)
7. Closes unclosed quotes
8. Fixes console.log issues

## Help Keywords

The help system responds to queries about:
- Errors and troubleshooting
- Functions
- Variables (const, let, var)
- Console/printing
- Loops (for, while)
- Arrays
- Semicolons
- Auto-fix features

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

1. Write your JavaScript code in the editor
2. Click **Run Code** to execute it
3. Click **Auto-Fix** to automatically fix common mistakes
4. Click **Help** to open the help panel and ask questions

## Technologies

- Next.js 14+
- React
- Tailwind CSS
- Lucide React Icons