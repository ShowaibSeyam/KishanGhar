/**
 * KishanGhar API Service
 * All backend API calls go through here
 */

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

// Get stored token
const getToken = () => localStorage.getItem('kg_token');

// Base fetch with auth header
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API error');
  }
  return data;
};

// ─── Auth ─────────────────────────────────────────────────────
export const authAPI = {
  register: (body) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  socialSync: (body) => apiFetch('/auth/social-sync', { method: 'POST', body: JSON.stringify(body) }),
  me: () => apiFetch('/auth/me'),
  updateProfile: (body) => apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),
};

// ─── Crops ────────────────────────────────────────────────────
export const cropsAPI = {
  getAll: () => apiFetch('/crops'),
  create: (body) => apiFetch('/crops', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => apiFetch(`/crops/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => apiFetch(`/crops/${id}`, { method: 'DELETE' }),
};

// ─── Livestock ────────────────────────────────────────────────
export const livestockAPI = {
  getAll: () => apiFetch('/livestock'),
  create: (body) => apiFetch('/livestock', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => apiFetch(`/livestock/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => apiFetch(`/livestock/${id}`, { method: 'DELETE' }),
};

// ─── Tasks ────────────────────────────────────────────────────
export const tasksAPI = {
  getAll: () => apiFetch('/tasks'),
  create: (body) => apiFetch('/tasks', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => apiFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => apiFetch(`/tasks/${id}`, { method: 'DELETE' }),
  toggleDone: (id, done) => apiFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify({ done }) }),
};

// ─── Dashboard ────────────────────────────────────────────────
export const dashboardAPI = {
  getStats: () => apiFetch('/dashboard/stats'),
};

// ─── Detections ───────────────────────────────────────────────
export const detectionsAPI = {
  getAll: (type) => apiFetch(`/detections${type ? `?type=${type}` : ''}`),
  getOne: (id) => apiFetch(`/detections/${id}`),
  delete: (id) => apiFetch(`/detections/${id}`, { method: 'DELETE' }),
  saveResult: (id, result) =>
    apiFetch(`/detections/${id}/result`, { method: 'PUT', body: JSON.stringify({ result }) }),

  // Upload image — uses FormData (not JSON)
  uploadCrop: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = getToken();
    const res = await fetch(`${BASE_URL}/detections/crop`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data;
  },

  uploadAnimal: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = getToken();
    const res = await fetch(`${BASE_URL}/detections/animal`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data;
  },
};

// ─── Avatar Upload ────────────────────────────────────────────
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const token = getToken();
  const res = await fetch(`${BASE_URL}/upload/avatar`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
};

// ─── AI Assistant Chat ────────────────────────────────────────
export const aiAPI = {
  chat: (message, language) =>
    apiFetch('/ai/chat', { method: 'POST', body: JSON.stringify({ message, language }) }),
};

// ─── Admin API ────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => apiFetch('/admin/stats'),
  getUsers: () => apiFetch('/admin/users'),
  updateUserRole: (id, role) => apiFetch(`/admin/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role }) }),
  deleteUser: (id) => apiFetch(`/admin/users/${id}`, { method: 'DELETE' }),
  getDetections: () => apiFetch('/admin/detections'),
  deleteDetection: (id) => apiFetch(`/admin/detections/${id}`, { method: 'DELETE' }),
  getCrops: () => apiFetch('/admin/crops'),
  deleteCrop: (id) => apiFetch(`/admin/crops/${id}`, { method: 'DELETE' }),
  getLivestock: () => apiFetch('/admin/livestock'),
  updateLivestock: (id, body) => apiFetch(`/admin/livestock/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteLivestock: (id) => apiFetch(`/admin/livestock/${id}`, { method: 'DELETE' }),
};

// ─── Token helpers ────────────────────────────────────────────
export const saveToken = (token) => localStorage.setItem('kg_token', token);
export const removeToken = () => localStorage.removeItem('kg_token');
