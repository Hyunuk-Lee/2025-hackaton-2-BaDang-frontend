// components/CoworkC/StoreBtn.jsx
import React from 'react';
import styled from 'styled-components';

const BtnWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  gap: 10px;
  border: none;
  border-radius: 20px;
  background: #FFF;
    box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);

  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "NanumSquareOTF";
  font-weight: 500;
  font-size: 16px;
  line-height: normal;
  color: #494954;

  &:hover {
    background-color: #759AFC;
    color: #FAF9F6;
  }


`;

function StoreBtn({ storeName = "가게 이름", onClick}) {
  return <BtnWrapper onClick={onClick}>{storeName}</BtnWrapper>;
}

export default StoreBtn;
