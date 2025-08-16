import React from 'react';
import styled from 'styled-components';
import CardBox from '../../assets/Cards/OrangeCard.svg'; // 카드 배경 이미지
import Arrow from '../../assets/Icons/ArrowIcon.svg';
import { Link } from 'react-router-dom';

const Card = styled(Link)` /* Link로 변경 */
  position: relative;
  width: 384px;
  height: 197px;
  display: block;
  text-decoration: none; /* 링크 밑줄 제거 */
`;
const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;


`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 가로/세로 중앙 정렬 */
  display: flex;
  align-items: center;
  gap: 32px; /* Icon과 Text 사이 간격 */
`;

const Icon = styled.img`
  height: 70px;
`;

const Text = styled.div`
   width: 140px;
  color: #FAF9F6;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 35px; /* 140% */
  white-space: pre-line; /* 줄바꿈 적용 */
`;
const ArrowBtn = styled.img`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 40px;
  height: 40px;
  
`;
function SmallCardBtn({ imgSrc, text, to }) {
  return (
    <Card to={to}>
      <Background src={CardBox} alt="card background" />
      <Content>
        <Icon src={imgSrc} alt={text} />
        <Text>{text}</Text>
      </Content>
        <ArrowBtn src={Arrow} alt="arrow" />
    </Card>
  );
}

export default SmallCardBtn;
