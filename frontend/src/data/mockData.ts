
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

export const initialFiles: FileNode[] = [
  {
    id: 'root',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: '1',
        name: 'App.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}`
      },
      {
        id: '2',
        name: 'styles.css',
        type: 'file',
        language: 'css',
        content: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  color: #3b82f6;
}`
      },
      {
        id: '3',
        name: 'utils.ts',
        type: 'file',
        language: 'typescript',
        content: `export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US').format(date);
};`
      }
    ]
  },
  {
    id: '4',
    name: 'index.html',
    type: 'file',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  },
  {
    id: '5',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{
  "name": "demo-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`
  }
];

export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  color: string;
}

export const initialMessages: Message[] = [
  {
    id: '1',
    user: 'Alex',
    text: 'Hey team, I just updated the App component.',
    timestamp: '10:23 AM',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    user: 'Sarah',
    text: 'Looks good! I will check the styles.',
    timestamp: '10:24 AM',
    color: 'bg-green-500'
  },
  {
    id: '3',
    user: 'Mike',
    text: 'Can we add a util function for dates?',
    timestamp: '10:25 AM',
    color: 'bg-purple-500'
  }
];
