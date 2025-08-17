// pages/CoworkPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import StoreList from '../components/CoworkC/StoreList';
import Popup from '../components/CoworkC/CoworkPopup';
import Map from '../components/CoworkC/CoworkMap.jsx'
const Page=styled.div`
  display: flex;
width: 1200px;
flex-direction: column;
align-items: flex-start;
gap: 36px;
padding: 24px ;
`
const ListBox =styled.div`
  display: flex;
  width: 1123px;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
`
function CoworkPage() {

  const [showPopup, setShowPopup] = useState(true);
  return (

    <Page>

    <Map/>
    {showPopup && (
        <Popup
          storeName="아코 헤어"
          storeType="생활 서비스 - 미용실"
          requestContent="안녕하세요 사장님 각자 가게 영수증 가지고 가면 10% 할인해주는 이벤트 어떠세요?"
          onClose={() => setShowPopup(false)}
        />
      )}
      <ListBox>
      <StoreList title="협업 요청받은 가게" storeName="하얀집 3호점"/>
      <StoreList title="협업 요청한 가게" storeName="하얀집 3호점"/>
      <StoreList title="협업 중인 가게" storeName="하얀집 3호점"/>

      </ListBox>

    </Page>
  );
}

export default CoworkPage;
