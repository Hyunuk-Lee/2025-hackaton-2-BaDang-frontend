// components/BaseC/Navbar.jsx

import styled from 'styled-components';
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import logoSvg from '../../assets/BadangLogo.svg';
import { useAuth } from '../../context/AuthContext';

// Styled-components 코드는 기존과 동일...
const Logo=styled.img`
    height: 48px;
    cursor: pointer;
`
const NavbarContainer=styled.div`
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    box-sizing: border-box;
    height: 80px;
    display: flex;
    justify-content: space-between ;
    align-items: center;
    padding: 24px 5%;
    background: #FFF;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.05);
    gap: 16px;
    border-bottom: 1px solid #D8D8D8;
`
const Menu =styled.ul`
    width: 602px;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 0; 
    gap: 16px;
`;
const MenuItem =styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
`;
const LogOut =styled.div`
    color: #9D9D9D;
    text-align: center;
    font-family: "Nanum Gothic";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
    cursor: pointer;
`;
const LogoLink=styled(Link)`
  color: inherit;      
  text-decoration: none;   
  display: flex;         
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
`;
const StyledNavLink = styled.a`
    color:  #494954;
    text-align: center;
    font-family: SUIT;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
    height: 41px;
    min-width: fit-content;

    text-decoration: none;  
    display: flex;         
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    padding: 9px 13px;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &.active{
        background-color: #759AFC;
        color: #FAF9F6;
    }
    &:hover:not(.active){
        background-color: #FFF;
        color: #759AFC;
    }
`;


function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ 2. AuthContext에서 logout 함수 가져오기

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    } finally {
      // ✅ 3. 로그아웃 시 전역 상태 업데이트
      logout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <NavbarContainer>
        <LogoLink to="/">
            <Logo src={logoSvg} alt="badang logo" />
        </LogoLink>
        <Menu>
            <MenuItem>
                <StyledNavLink onClick={() => window.location.href="/online-review"}>온라인 리뷰 분석</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink onClick={() => window.location.href="/custom-keyword-news"}>맞춤형 키워드 뉴스</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink onClick={() => window.location.href="/collaboration-management"}>협업 관리</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink onClick={() => window.location.href="/profile-edit"}>정보 수정</StyledNavLink>
            </MenuItem>
        </Menu>
        {/* ✅ 4. LogOut div에 onClick 이벤트를 연결합니다. */}
        <LogOut onClick={handleLogout}>로그아웃</LogOut>
    </NavbarContainer>
  );
}

export default Navbar;