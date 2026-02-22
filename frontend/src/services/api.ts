import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),
};

// Room API
export const roomAPI = {
  createRoom: (data: { name: string; description?: string }) =>
    api.post('/rooms', data),
  joinRoom: (inviteCode: string) =>
    api.post('/rooms/join', { inviteCode }),
  getMyRooms: () => api.get('/rooms'),
  getRoom: (roomId: number) => api.get(`/rooms/${roomId}`),
};

// File API
export const fileAPI = {
  getFileTree: (roomId: number) => api.get(`/files/room/${roomId}`),
  createFile: (roomId: number, data: any) => api.post(`/files/room/${roomId}`, data),
  updateFile: (fileId: number, content: string) =>
    api.put(`/files/${fileId}`, { content }),
  deleteFile: (fileId: number) => api.delete(`/files/${fileId}`),
};

// User API
export const userAPI = {
  updateProfile: (data: { username: string }) => api.put('/users/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/users/password', data),
};

export default api;
