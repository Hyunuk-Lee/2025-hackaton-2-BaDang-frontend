// components/Advertisement2.jsx
import React from 'react';
import styled from 'styled-components';
import AdImage from "../assets/Ads/AdNews.svg";
const AdContainer = styled.div`
display: flex;
height: 195px;
justify-content: center;
align-items: center;
align-self: stretch;
border-radius: 20px;
margin-top: 65px;
background: var(--Typo-Black01, #494954);
`;

const AdContent = styled.img`
color: var(--Typo-White01, #FAF9F6);

/* B1 */
font-family: NanumSquareOTF;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 28px; /* 140% */
`;

function Advertisement2() {
  return (
    <AdContainer>
      <AdContent src={AdImage}></AdContent>
    </AdContainer>
  );
}

export default Advertisement2