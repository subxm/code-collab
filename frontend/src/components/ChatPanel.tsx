import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  color: string;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex h-full flex-col bg-zinc-900 border-l border-zinc-800">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Room Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.color} text-white text-xs font-bold`}>
              {msg.user.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-zinc-300">{msg.user}</span>
                <span className="text-xs text-zinc-500">{msg.timestamp}</span>
              </div>
              <p className="text-sm text-zinc-400 bg-zinc-800/50 p-2 rounded-md rounded-tl-none">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="border-t border-zinc-800 p-4">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-md bg-zinc-800 px-4 py-2 pr-10 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
