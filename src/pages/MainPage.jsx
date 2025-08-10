// pages/MainPage.jsx

import React from 'react';
import NewsCard from '../components/NewsCard';
import styled from 'styled-components';
import ButtonCard from '../components/ButtonCard';
import pastIcon from '../assets/PastIcon.svg';
import makeIcon from '../assets/MakeIcon.svg';

const Page=styled.div`
  position: absolute;
  top: 105px;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
`
const Advertisement=styled.div`
  width: 100%;
  height: 377px;
  flex-shrink: 0;
  background-color:#17171B;
`
const NewsWrapper=styled.div`
  display: flex;
  gap: 24px;
  width: 792px;
  height: 418px;
`
const ButtonWrapper=styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const Cards=styled.div`
  display: flex;
  height: 542px;
  box-sizing: border-box;
  padding: 36px 120px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
`
const KeywordNews=styled.div`
  width: 100%;
  max-height: 45px;
  color: #17171B;
  font-family: 'NanumSquareNeo';
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
`
function MainPage() {
  return (
    <Page>
      <Advertisement>
        dd
      </Advertisement>
      <Cards>
        <KeywordNews>최신 키워드 뉴스</KeywordNews>
        <NewsWrapper>
          <NewsCard 
          imageUrl="dd"
          keyword="키워드"
          date="00년 0월 0주차"
          title="긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목"      
          />
          <NewsCard
          imageUrl="dd"
          keyword="키워드"
          date="00년 0월 0주차"
          title="긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목"
          isOrange={true}      
          />
        <ButtonWrapper>
          <ButtonCard 
          title="지난 콘텐츠 다시 보기"
          imageUrl={pastIcon}/>
          <ButtonCard
          title="원하는 키워드로 맞춤형 뉴스 만들기"
          imageUrl={makeIcon}/>
        </ButtonWrapper>
        </NewsWrapper>

        
      </Cards>

    </Page>
  );
}

export default MainPage;
