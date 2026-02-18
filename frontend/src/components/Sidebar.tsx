import React from 'react';
import { Files, Search, GitBranch, Settings, MonitorPlay, MessageSquare } from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  activeTab: 'files' | 'search' | 'git' | 'chat';
  onTabChange: (tab: 'files' | 'search' | 'git' | 'chat') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'files', icon: Files, label: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'git', icon: GitBranch, label: 'Source Control' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
  ] as const;

  return (
    <div className="flex h-full w-12 flex-col items-center justify-between border-r border-zinc-800 bg-zinc-900 py-4">
      <div className="flex flex-col items-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-white",
              activeTab === tab.id ? "bg-zinc-800 text-white" : "text-zinc-500"
            )}
            title={tab.label}
          >
            <tab.icon size={20} />
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
         <button className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-white">
           <MonitorPlay size={20} />
         </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-white">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};
