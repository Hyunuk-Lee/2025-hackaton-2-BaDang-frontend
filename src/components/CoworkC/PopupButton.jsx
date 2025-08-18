// components/CoworkC/PopupButton.jsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
height: ${(props) => props.height || '59px'};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: ${(props) => props.width || '200px'};
  background: ${(props) => props.color || '#FF9762'}; /* 🔹 color props */
  color: #FAF9F6;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

function PopupButton({ btnName, width, color, height }) {
  return <Button width={width} color={color} height={height}>{btnName} </Button>;
}

export default PopupButton;
