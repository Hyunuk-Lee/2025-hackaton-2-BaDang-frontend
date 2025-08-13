// components/Advertisement.jsx
import React from 'react';
import styled from 'styled-components';

const AdContainer = styled.div`
  height: 377px;
  background-color: #17171B;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdContent = styled.div`
  color: #FFF;
  text-align: center;
  font-family: 'NanumSquareNeo';
  font-size: 24px;
  font-weight: 700;
`;

function Advertisement() {
  return (
    <AdContainer>
      <AdContent>
        광고 영역
      </AdContent>
    </AdContainer>
  );
}

export default Advertisement;