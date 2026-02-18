import React from 'react';
import { Share2, Play, Layout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4">
      <div className="flex items-center gap-4">
        <Layout className="text-blue-500" />
        <div>
          <h1 className="text-sm font-semibold text-zinc-100">CollabCode Project</h1>
          <p className="text-xs text-zinc-500">Real-time Collaboration</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center -space-x-2">
          {['Alex', 'Sarah', 'Mike'].map((user, i) => (
            <div
              key={user}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-xs font-medium text-zinc-300 ring-2 ring-zinc-900 ${
                i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-green-600' : 'bg-purple-600'
              }`}
              title={user}
            >
              {user.charAt(0)}
            </div>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-xs font-medium text-zinc-500 hover:bg-zinc-700 cursor-pointer">
            +2
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500">
          <Share2 size={16} />
          Share
        </button>
        
        <button className="flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white">
          <Play size={16} />
          Run
        </button>
      </div>
    </header>
  );
};
