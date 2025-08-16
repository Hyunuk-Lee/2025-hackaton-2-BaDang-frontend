import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CardBox from '../../assets/Cards/BlueCard.svg'; // 카드 배경 이미지
import Graph from '../../assets/Icons/GraphIcon.svg';
import Notebook from '../../assets/Icons/NotebookIcon.svg';
import Arrow from '../../assets/Icons/ArrowIcon.svg';
const Card = styled(Link)`
  position: relative;
  display: block;
  width: 384px;
  height: 418px;
  text-decoration: none; /* 링크 밑줄 제거 */
  color: inherit;        /* 글자색 기본 유지 */
  cursor: pointer;`;

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Icon1 = styled.img`
position: absolute;
left: 20px;
bottom: 20px;
width: 175px;
height: 171px;
flex-shrink: 0;
`;

const Icon2 = styled.img`
position: absolute;
right: 31px;
bottom: 71px;
width: 117.203px;
height: 104.166px;
`;
const Text = styled.div`
position: absolute;
top: 24px;
left: 24px;
   width: 209px;
  color: #FAF9F6;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 35px; /* 140% */
`;
const ArrowBtn = styled.img`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 40px;
  height: 40px;
  
`;
const Orange = styled.span`
  color: #FF9762; `;
function BigCardBtn() {
  return (
    <Card to="/online-review">
        <Background src={CardBox} alt="card background" />
        <Text>바당의 분석과<br/>
        사장님의 노하우로<br/>
        <Orange>바</Orange>꾸세요 <Orange>당</Orange>신의 가게</Text>
        <Icon1 src={Graph} />
        <Icon2 src={Notebook}/>
        <ArrowBtn src={Arrow} alt="Go to Online Review" />

    </Card>
  );
}

export default BigCardBtn;
