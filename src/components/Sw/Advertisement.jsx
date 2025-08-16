// components/Advertisement.jsx
import React from 'react';
import styled from 'styled-components';
import Ad from '../../assets/Ads/NovaAd.svg'

const AdContainer = styled.div`
display: flex;
height: 195px;
padding: 11px 0;
justify-content: center;
align-items: center;
align-self: stretch;
border-radius: 20px;
background: #494954;
`;

const AdContent = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 20px;
`;

function Advertisement() {
  return (
    <AdContainer>
   <AdContent src={Ad}/>
    </AdContainer>
  );
}

export default Advertisement;