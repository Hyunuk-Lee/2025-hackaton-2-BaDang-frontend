// services/api.js
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// 기본 fetch 함수
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API 함수들
export const api = {
  // GET 요청
  get: (endpoint) => apiRequest(endpoint),
  
  // POST 요청
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT 요청
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE 요청
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE',
  }),
};

// 특정 API 함수들
export const storeApi = {
  // 매장 분석 데이터 가져오기
  getAnalysis: (storeId) => api.get(`api/${storeId}/analysis/total/`),
  
  // 매장 정보 가져오기
  getStoreInfo: (storeId) => api.get(`api/stores/${storeId}/`),
};