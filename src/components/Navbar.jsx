import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Logo=styled.div`
    color:  #FF8040;
    font-family: Paperlogy;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const NavbarContainer=styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
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
  width: 100%;
  height: 100%;
`;
const StyledNavLink = styled(NavLink)`
    color:#17171B;
    font-family: 'NanumSquareNeo',  sans-serif;
    font-size: 20px;
    font-style: bold;
    line-height: normal;
    white-space: nowrap;
    max-height: 23px;

    text-decoration: none;  
    display: flex;         
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 60px;
    padding: 9px 13px;

    &.active,
    &:hover {
        background-color: #0046FF;
        color: #FAF9F6;
    }
`;
function Navbar() {
  return (
    <NavbarContainer>
        <Logo>
            <LogoLink to="/">badang</LogoLink>
        </Logo>
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
