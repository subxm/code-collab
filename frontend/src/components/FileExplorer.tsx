import React from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { cn } from '../utils/cn';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isOpen?: boolean;
}

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string;
  onFileClick: (id: string) => void;
  onToggleFolder: (id: string) => void;
  level?: number;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFileId,
  onFileClick,
  onToggleFolder,
  level = 0
}) => {
  return (
    <div className="flex w-full flex-col font-mono text-sm">
      {files.map((file) => (
        <React.Fragment key={file.id}>
          <div
            className={cn(
              "group flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 transition-colors hover:bg-zinc-800",
              file.id === activeFileId && "bg-zinc-800 text-blue-400"
            )}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
            onClick={() => {
              if (file.type === 'folder') {
                onToggleFolder(file.id);
              } else {
                onFileClick(file.id);
              }
            }}
          >
            {file.type === 'folder' && (
              <span className="text-zinc-500 group-hover:text-zinc-300">
                {file.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            )}
            
            {file.type === 'folder' ? (
              <Folder size={14} className={cn("text-blue-500", file.isOpen ? "fill-blue-500/20" : "")} />
            ) : (
              <File size={14} className="text-zinc-500" />
            )}
            
            <span className="truncate">{file.name}</span>
          </div>
          
          {file.type === 'folder' && file.isOpen && file.children && (
            <FileExplorer
              files={file.children}
              activeFileId={activeFileId}
              onFileClick={onFileClick}
              onToggleFolder={onToggleFolder}
              level={level + 1}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
