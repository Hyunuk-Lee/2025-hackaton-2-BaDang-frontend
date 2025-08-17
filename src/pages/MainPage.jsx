// pages/MainPage.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Advertisement from '../components/MainC/Advertisement';
import BigCards from '../components/MainC/BigCards';
import SmallCards from '../components/MainC/SmallCards';
const Page=styled.div`
display: flex;
width: 1200px;
flex-direction: column;
height: 1238px;
min-height: 100vh;
align-items: flex-start;
`
const HelloText=styled.div`
width: 751px;
height: 150px;
margin: 48px auto;
  color:  #494954;
text-align: center;
font-family: SUIT;
font-size: 40px;
font-style: normal;
font-weight: 800;
line-height: 60px; 
`
const Orange=styled.span`
  color: #FF9762;
`
const Blue=styled.span`
  color: #759AFC;
`
const CardWrapper=styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
  height: 418px;
`



function MainPage() {
  const [name, setName] = useState('');

  useEffect(() => {
    // 예시: 로그인 후 현재 사용자 정보 가져오기
    const fetchUserName = async () => {
      try {
        const response = await fetch('/api/users/current'); // 현재 로그인한 사용자 정보 엔드포인트
        if (!response.ok) throw new Error('사용자 정보 가져오기 실패');
        const data = await response.json();
        setName(data.name); // API에서 받은 name 사용
      } catch (err) {
        console.error(err);
        setName('이름없음'); // 기본값
      }
    };

    fetchUserName();
  }, []);

  return (
    <Page>
      <HelloText>안녕하세요 {name} <Blue>사장님</Blue> <br/>리뷰를 <Orange>분석</Orange>하고 이번주 <Orange>보고서</Orange>를 확인해보세요!</HelloText>
    <CardWrapper>
      <BigCards/>
      <Advertisement/>
      <SmallCards/>
    </CardWrapper>
    </Page>
  );
}

export default MainPage;
