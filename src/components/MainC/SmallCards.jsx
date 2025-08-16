// components/Sw/SmallCards.jsx
import React from 'react';
import styled from 'styled-components';
import Card from './SmallCardBtn'
import PastIcon from '../../assets/Icons/PastIcon.svg'
import MakeIcon from '../../assets/Icons/MakeIcon.svg'; 
import CoworkIcon from '../../assets/Icons/CoworkIcon.svg'; 

const Page=styled.div`
    display: flex;
    width: 1200px;
    height: 197px;
    flex-direction: row;
    gap: 24px;
`

function SmallCards() {
  return (
    <Page> 
      <Card imgSrc={PastIcon} text={`지난 보고서\n모아 보기`} to="/custom-keyword-news" />
      <Card imgSrc={MakeIcon} text={`키워드 보고서\n직접 만들기`} to="/custom-keyword-news" />
      <Card imgSrc={CoworkIcon} text={`협업할 가게\n찾아보기`} to="/collaboration-management" />
    </Page>
  );
}

export default SmallCards;