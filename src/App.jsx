import { useState } from 'react'
import styled from 'styled-components';
import Navbar from  './components/Navbar.jsx';
import MainPage from './pages/MainPage';
import OnlineReviewPage from './pages/OnlineReviewPage.jsx';
import CustomKeywordNewsPage from './pages/CustomKeywordNewsPage.jsx';
// import CollaborationManagementPage from './pages/CollaborationManagementPage.jsx';
// import ProfileEditPage from './pages/ProfileEditPage.jsx';
import { Routes, Route, Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 모든 요소 기본 여백 제거 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* html, body, root 높이 확보 + 배경색 */
  html, body, #root {
    height: 100%;
    background-color: #FFF;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFF;

`;

const MainContent = styled.main`
  margin-top: 80px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

function App() {
  // const location = useLocation();
  // const hideNavbarRoutes = ["/login", "/signup"];
  return (
    <>
      <GlobalStyle />
    <AppContainer>
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}
      <Navbar/>
      <MainContent>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/online-review" element={<OnlineReviewPage />} />
          <Route path="/custom-keyword-news" element={<CustomKeywordNewsPage />} />
          {/* <Route path="/custom-keyword-news" element={<CustomKeywordNewsPage />} />
          <Route path="/collaboration-management" element={<CollaborationManagementPage />} />
          <Route path="/profile-edit" element={<ProfileEditPage />} /> */}
        </Routes>
      </MainContent>
    </AppContainer>
    </>

  );
}

export default App;
