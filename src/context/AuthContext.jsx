// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Context 생성
const AuthContext = createContext(null);

// 2. 로그인 상태를 확인하는 간단한 함수 (쿠키 존재 여부로 판단)
const checkAuthStatus = () => {
  // refresh_token이 있는지 확인하여 로그인 상태를 판단합니다.
  // 더 정교하게 만들려면 서버에 토큰 유효성 검사 API를 호출할 수 있습니다.
  return document.cookie.includes('refresh_token');
};

// 3. Provider 컴포넌트 생성
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkAuthStatus());

  // 로그인/로그아웃 시 상태를 업데이트하는 함수
  const login = () => setIsLoggedIn(true);
  const logout = () => {
    // 실제 로그아웃 시 쿠키가 삭제되므로 상태도 false로 변경
    setIsLoggedIn(false);
  };
  
  // App이 로드될 때나 페이지 이동 시 로그인 상태를 다시 확인할 수 있습니다.
  useEffect(() => {
    setIsLoggedIn(checkAuthStatus());
  }, []);

  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. 쉽게 Context를 사용할 수 있는 Custom Hook 생성
export function useAuth() {
  return useContext(AuthContext);
}