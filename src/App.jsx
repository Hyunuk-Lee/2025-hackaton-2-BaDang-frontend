import { useState } from 'react'
import styled from 'styled-components';
import Navbar from  './components/Navbar.jsx';
import MainPage from './pages/MainPage';
import OnlineReviewPage from './pages/OnlineReviewPage.jsx';
// import CustomKeywordNewsPage from './pages/CustomKeywordNewsPage.jsx';
// import CollaborationManagementPage from './pages/CollaborationManagementPage.jsx';
// import ProfileEditPage from './pages/ProfileEditPage.jsx';
import { Routes, Route, Router } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  margin-top: 105px;
  flex: 1;
`;

function App() {
  // const location = useLocation();
  // const hideNavbarRoutes = ["/login", "/signup"];
  return (
    <AppContainer>
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}
      <Navbar/>
      <MainContent>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/online-review" element={<OnlineReviewPage />} />
          {/* <Route path="/custom-keyword-news" element={<CustomKeywordNewsPage />} />
          <Route path="/collaboration-management" element={<CollaborationManagementPage />} />
          <Route path="/profile-edit" element={<ProfileEditPage />} /> */}
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App;
