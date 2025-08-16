// pages/MainPage.jsx

import React from 'react';
import styled from 'styled-components';
import Advertisement from '../components/Sw/Advertisement';
import BigCards from '../components/Sw/BigCards';
import SmallCards from '../components/Sw/SmallCards';

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
  return (
    <Page>
      <HelloText>안녕하세요 김바당 <Blue>사장님</Blue> <br/>리뷰를 <Orange>분석</Orange>하고 이번주 <Orange>보고서</Orange>를 확인해보세요!</HelloText>
    <CardWrapper>
      <BigCards/>
      <Advertisement/>
      <SmallCards/>
    </CardWrapper>
    </Page>
  );
}

export default MainPage;
