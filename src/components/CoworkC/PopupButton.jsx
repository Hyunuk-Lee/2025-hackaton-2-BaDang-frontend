// components/CoworkC/PopupButton.jsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  min-width: 283px;
  height: 59px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: ${props => {
    if (props.$btnName === "요청하기" || props.$btnName === "수락하기") return "#759AFC";
    if (props.$btnName === "거절하기" || props.$btnName === "협업 종료") return "#FF9762";
    return "#FF9762"; // 기본 색
  }};
  color: #FAF9F6;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

function PopupButton({ btnName }) {
  return <Button $btnName={btnName}>{btnName}</Button>;
}

export default PopupButton;
