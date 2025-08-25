// components/BigCards.jsx
import React from 'react';
import styled from 'styled-components';
import NewsCard from '../NewsCard';
import BlueCardBtn from './BigCardBtn';
import NothingCard from './NothingCard';
import NotebookIcon from '../../assets/Icons/NotebookIcon.svg';
import RobotIcon from '../../assets/Icons/RobotIcon.svg';
import useNewsletterWeek from '../../hooks/useNewsletterWeek';

const Page = styled.div`
  display: flex;
  width: 1200px;
  height: 418px;
  flex-direction: row;
  gap: 24px;
`;

function BigCards({ newsletters = [] }) {
  const latestTwo = newsletters.slice(0, 2);

  // 항상 2자리 유지 → 부족한 부분은 null로 채움
  const filledCards = [
    ...latestTwo,
    ...Array(2 - latestTwo.length).fill(null)
  ];

  return (
    <Page>
      {filledCards.map((item, idx) => {
        if (!item) {
          return (
            <NothingCard
              key={`nothing-${idx}`}
              imageUrl={idx === 0 ? NotebookIcon : RobotIcon}
              text="앗! 아직 보고서가 없어요"
            />
          );
        }

        const { year, month, week } = useNewsletterWeek(item.createdAt);
        return (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            keyword={item.keywords?.[0]?.keywordName || ''}
            date={`${year}년 ${month}월 ${week}주차`}
            imageUrl={item.keywords?.[0]?.keywordImageUrl || ''}
            isOrange={item.isUserMade}
            liked={item.isLiked}
            onToggleLike={item.onToggleLike}
            onClick={item.onClick}
          />
        );
      })}

      <BlueCardBtn />
    </Page>
  );
}

export default BigCards;
