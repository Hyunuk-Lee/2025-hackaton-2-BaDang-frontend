import axios from 'axios';

// 1. Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// 별도 리프레시 전용 클라이언트(무한루프 방지 목적)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// 요청 인터셉터(선택)
apiClient.interceptors.request.use(
  (config) => {
    console.log('API 요청 보냄:', config.method, config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401일 때 refresh 시도하고 재요청, 실패하면 로그인으로 리다이렉트
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const cfg = error.config;

    // 로그아웃 요청 또는 _noRefresh 플래그면 통과
    // (백엔드 라우트는 /main/logout, 리프레시는 /main/token 입니다)
    if (cfg?.url?.includes('/main/logout') || cfg?._noRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        // 리프레시 요청 (쿠키 기반). backend token endpoint is /main/token
        await refreshClient.post('/main/token', null);
        // 재시도
        cfg._noRefresh = true;
        return apiClient.request(cfg);
      } catch (refreshErr) {
        console.error('refresh failed', refreshErr);
        // 리프레시 실패 → 클라이언트 상태 정리 후 로그인 페이지로
        try { localStorage.removeItem('auth'); } catch (e) { /* ignore */ }
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
export { refreshClient };