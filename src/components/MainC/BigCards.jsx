// components/BigCards.jsx
import React from 'react';
import styled from 'styled-components';
import NewsCard from '../NewsCard';
import BlueCardBtn from './BigCardBtn';
import NothingCard from './NothingCard';
import NotebookIcon from '../../assets/Icons/NotebookIcon.svg';
import RobotIcon from '../../assets/Icons/RobotIcon.svg';

const Page=styled.div`
    display: flex;
    width: 1200px;
    height: 418px;
    flex-direction: row;
    gap: 24px;
`

function BigCards({ newsletters = [] }) {
  // newsletters: 최신 뉴스레터 최대 2개 들어있는 배열
  const firstCard = newsletters[0]
    ? <NewsCard data={newsletters[0]} />
    : <NothingCard imageUrl={NotebookIcon} text="앗! 아직 보고서가 없어요" />;

  const secondCard = newsletters[1]
    ? <NewsCard data={newsletters[1]} />
    : <NothingCard imageUrl={RobotIcon} text="앗! 아직 보고서가 없어요" />;

  return (
    <Page>
      {firstCard}
      {secondCard}
      <BlueCardBtn />
    </Page>
  );
}

export default BigCards;
