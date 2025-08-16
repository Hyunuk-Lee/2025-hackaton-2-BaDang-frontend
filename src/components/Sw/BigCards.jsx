// components/BigCards.jsx
import React from 'react';
import styled from 'styled-components';
import BlueCard from '../../assets/Cards/BlueCard.png'
import NewsCard from '../../components/NewsCard';

const Page=styled.div`
    display: flex;
    width: 1200px;
    height: 418px;
    flex-direction: row;
    gap: 24px;
`
const Card = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;
function BigCards() {
  return (
    <Page>
     <NewsCard/> 
     <NewsCard/>
     <Card src={BlueCard}/>
    </Page>
  );
}

export default BigCards;
