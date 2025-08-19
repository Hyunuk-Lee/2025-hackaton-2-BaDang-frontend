// components/CoworkC/StoreList.jsx
import React from 'react';
import styled from 'styled-components';
import StoreBtn from './StoreBtn'
const Box=styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`
const Title= styled.div`
    color:#17171B;
    text-align: center;
    height: 31px;
    font-family: SUIT;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const List=styled.div`
display: flex;
flex-direction: row;
    gap: 24px;
`
function StoreList({title, storeNames=[], onClick}) {
  return (
    <Box>
        <Title>{title}</Title>
        <List>
          {storeNames.length > 0 ? (
          storeNames.map((name, idx) => (
            <StoreBtn key={idx} storeName={name} onClick={onClick} />
          ))
        ) : (
          <StoreBtn storeName="없음" onClick={() => {}} /> // 클릭해도 아무 동작 없음
        )}
        </List>


    </Box>

  );
}

export default StoreList;