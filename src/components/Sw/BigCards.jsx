// components/BigCards.jsx
import React from 'react';
import styled from 'styled-components';
import NewsCard from '../../components/NewsCard';
import BlueCardBtn from '../Sw/BigCardBtn';

const Page=styled.div`
    display: flex;
    width: 1200px;
    height: 418px;
    flex-direction: row;
    gap: 24px;
`

function BigCards() {
  return (
    <Page>
     <NewsCard/> 
     <NewsCard/>
      <BlueCardBtn/>
    </Page>
  );
}

export default BigCards;
