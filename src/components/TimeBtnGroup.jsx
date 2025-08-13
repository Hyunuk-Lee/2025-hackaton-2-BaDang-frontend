// components/TimeBtnGroup.jsx
import React from 'react';
import styled from 'styled-components';

const TimeBtnWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
`

const BtnWrapper = styled.div`
    display: inline-flex;
    padding: 20px 15px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: fit-content;
    background: transparent;
    cursor: pointer;

    &.active{
        background-color: #0046FF;
        color: #FAF9F6;
        border-radius: 20px;
    }

`

const BtnText = styled.div`
    color: #17171B;
    text-align: center;
    font-family: "NanumSquareOTF";
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    transition: all 0.2s ease;
    
    ${BtnWrapper}.active & {
        color: #FFF;
    }
    ${BtnWrapper}:hover:not(.active) & {
        color: #0046FF;
    }
`

function TimeBtnGroup({ options, selectedValue, onSelect }) {
  return (
    <TimeBtnWrapper>
      {options.map((option) => (
        <BtnWrapper 
          key={option}
          onClick={() => onSelect(option)} 
          className={selectedValue === option ? 'active' : ''}
        >
          <BtnText>
            {option}
          </BtnText>
        </BtnWrapper>
      ))}
    </TimeBtnWrapper>
  );
}

export default TimeBtnGroup;