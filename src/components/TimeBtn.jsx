// components/TimeBtn.jsx
import React from 'react';
import styled from 'styled-components';
const BtnText =styled.div`
    color: #17171B;
    text-align: center;
    font-family: "NanumSquareOTF";
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`
const BtnWrapper =styled.div`
    display: inline-flex;
    padding: 20px 15px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    width: fit-content;
    background: #FFF;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover:not(.active){
        box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
    }
    
    &.active{
        background-color: #0046FF;
         ${BtnText} {
      color: #FAF9F6; /* active일 때 글씨 하얀색 */
    };
    }
`



function TimeBtn({range, isActive, onClick}) {
  return (
        <BtnWrapper className={isActive ? "active" : ""} onClick={onClick}>
            <BtnText>{range}</BtnText>
        </BtnWrapper>
  );
}
export default TimeBtn;
