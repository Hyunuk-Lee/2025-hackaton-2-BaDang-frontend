import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {Link} from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

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
    height: 105px;
    display: flex;
    justify-content: space-between ;
    align-items: center;
    padding: 24px 5%;
    background: #FFF;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.05);
    gap: 16px;
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
const StyledNavLink = styled(NavLink)`
    color:#17171B;
    font-family: 'NanumSquareNeo',  sans-serif;
    font-size: 20px;
    font-style: bold;
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
        background-color: #0046FF;
        color: #FAF9F6;
    }
    &:hover{
        background-color: #FFF;
        color: #0046FF;
    }
`;
function Navbar() {
  return (
    <NavbarContainer>
        <LogoLink to="/">
            <Logo src={logoSvg} alt="badang logo" />
        </LogoLink>
        <Menu>
            <MenuItem>
                <StyledNavLink to="/online-review">온라인 리뷰 분석</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink to="/custom-keyword-news">맞춤형 키워드 뉴스</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink to="/collaboration-management">협업 관리</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink to="/profile-edit">정보 수정</StyledNavLink>
            </MenuItem>
        </Menu>
        <LogOut>로그아웃</LogOut>
    </NavbarContainer>
    
  );
}

export default Navbar;
