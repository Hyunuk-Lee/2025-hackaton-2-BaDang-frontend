// App.jsx
import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/BaseC/Navbar.jsx';
import Footer from './components/BaseC/Footer.jsx';
import MainPage from './pages/MainPage';
import OnlineReviewPage from './pages/OnlineReviewPage.jsx';
import CustomKeywordNewsPage from './pages/CustomKeywordNewsPage.jsx';
import CoworkPage from './pages/CoworkPage.jsx';
import CreateReportPage from './pages/CreateReportPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import { FavoritesProvider } from "./context/FavoritesContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route, /* Router */ useLocation } from 'react-router-dom';
import ScrollToTop from './components/BaseC/ScrollToTop.jsx';

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { min-height: 100%; background-color: #FFF; overflow-x: hidden; }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFF;
`;

const MainContent = styled.div.attrs({ id: "main-scroll" })`
  /* 네비바가 있을 때만 상단 여백을 준다 */
  padding-top: ${(p) => (p.withNavbar ? '80px' : '0')};
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PlainContent = styled.div.attrs({ id: "main-scroll" })`
  flex: 1;        /* 높이만 채우고 나머지는 페이지 내부에서 레이아웃 */
  width: 100%;
`;

function App() {
  const location = useLocation();
  const hideChromeRoutes = ['/signup', '/login'];       // 네비/푸터/메인 레이아웃 숨길 경로
  const hideChrome = hideChromeRoutes.some(p => location.pathname.startsWith(p));

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {!hideChrome && <Navbar />}

        <ScrollToTop />
        <FavoritesProvider>
          {hideChrome ? (
            //  signup: MainContent 대신 PlainContent 사용
            <PlainContent>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </PlainContent>
          ) : (
            // 일반 페이지: 기존 MainContent 사용
            <MainContent withNavbar>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/online-review" element={<OnlineReviewPage />} />
                <Route path="/custom-keyword-news" element={<CustomKeywordNewsPage />} />
                <Route path="/collaboration-management" element={<CoworkPage />} />
                <Route path="/create-report" element={<CreateReportPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
              </Routes>
            </MainContent>
          )}
        </FavoritesProvider>

        {!hideChrome && <Footer />}
      </AppContainer>
    </>
  );
}

export default App;