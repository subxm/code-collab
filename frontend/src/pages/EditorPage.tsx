import React, { useState } from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { FileExplorer } from '../components/FileExplorer';
import { CodeEditor } from '../components/CodeEditor';
import { ChatPanel } from '../components/ChatPanel';
import { initialFiles, initialMessages } from '../data/mockData';

export const EditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'search' | 'git' | 'chat'>('files');
  const [activeFileId, setActiveFileId] = useState('1');
  const [files, setFiles] = useState(initialFiles);
  const [code, setCode] = useState(initialFiles[0].children![0].content || '');
  const [messages, setMessages] = useState(initialMessages);

  const handleFileClick = (id: string) => {
    setActiveFileId(id);
    // Find file content (simplified search)
    const findFile = (nodes: any[]): any => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findFile(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    const file = findFile(files);
    if (file && file.content) {
      setCode(file.content);
    }
  };

  const handleToggleFolder = (id: string) => {
    const toggleNode = (nodes: any[]): any[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) };
        }
        return node;
      });
    };
    setFiles(toggleNode(files));
  };

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      user: 'You',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'bg-indigo-500'
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-300 overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content Area */}
        <Group orientation="horizontal" className="flex-1">
          
          {/* Left Panel (Explorer/Search/etc) */}
          <AnimatePresence mode="wait">
            {activeTab !== 'chat' && (
              <Panel defaultSize={20} minSize={15} maxSize={30} className="flex flex-col border-r border-zinc-800 bg-zinc-900/50">
                 <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                 >
                    <div className="p-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      {activeTab === 'files' ? 'Explorer' : activeTab.toUpperCase()}
                    </div>
                    {activeTab === 'files' && (
                      <div className="flex-1 overflow-y-auto">
                        <FileExplorer 
                          files={files} 
                          activeFileId={activeFileId} 
                          onFileClick={handleFileClick}
                          onToggleFolder={handleToggleFolder}
                        />
                      </div>
                    )}
                    {activeTab !== 'files' && (
                        <div className="p-4 text-center text-zinc-500 text-sm">
                            Feature coming soon
                        </div>
                    )}
                 </motion.div>
              </Panel>
            )}
          </AnimatePresence>
          
          {activeTab !== 'chat' && <Separator className="w-1 bg-zinc-800 hover:bg-indigo-500 transition-colors" />}

          {/* Editor Area */}
          <Panel defaultSize={60} minSize={30}>
             <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4 }}
               className="h-full w-full bg-[#1e1e1e]" // Monaco editor bg color
             >
                {/* Tabs (Mock) */}
                <div className="flex bg-zinc-900 border-b border-zinc-800">
                    <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-indigo-500 text-sm text-zinc-300 flex items-center gap-2">
                         <span className="text-blue-400">TSX</span>
                         <span>App.tsx</span>
                         <span className="hover:bg-zinc-700 rounded p-0.5 cursor-pointer">×</span>
                    </div>
                     <div className="px-4 py-2 hover:bg-zinc-800 text-sm text-zinc-500 flex items-center gap-2 cursor-pointer">
                         <span className="text-yellow-400">CSS</span>
                         <span>styles.css</span>
                    </div>
                </div>
                <CodeEditor 
                  code={code} 
                  language="typescript" 
                  onChange={(val) => setCode(val || '')} 
                />
             </motion.div>
          </Panel>

          {/* Right Panel (Chat) */}
           <AnimatePresence>
              {activeTab === 'chat' && (
                <>
                   <Separator className="w-1 bg-zinc-800 hover:bg-indigo-500 transition-colors" />
                   <Panel defaultSize={25} minSize={20} maxSize={40}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full border-l border-zinc-800"
                      >
                         <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
                      </motion.div>
                   </Panel>
                </>
              )}
           </AnimatePresence>
        </Group>
      </div>
    </div>
  );
};
