export interface User {
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  message: string;
}

export interface Room {
  id: number;
  name: string;
  description?: string;
  inviteCode: string;
  ownerUsername: string;
  memberCount: number;
}

export interface FileNode {
  id: number;
  name: string;
  type: 'FILE' | 'FOLDER';
  content?: string;
  language?: string;
  parentId?: number;
  children: FileNode[];
  createdAt: string;
  updatedAt: string;
}
