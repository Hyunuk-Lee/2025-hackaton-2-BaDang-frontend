// pages/CoworkPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import StoreList from '../components/CoworkC/StoreList';
import CoworkPopup from '../components/CoworkC/CoworkPopup';
import StoreListPopup from '../components/CoworkC/StoreListPopup.jsx'
import RequestPopup from '../components/CoworkC/RequestPopup.jsx'
import CoworkUnavailable from '../components/CoworkC/CoworkUnavailable.jsx';
import Map from '../components/CoworkC/CoworkMap.jsx'
import axios from 'axios';

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
function CoworkPage({ is_willing_collaborate = false}) {

  const [showPopup, setShowPopup] = useState(true);
  const [showListPopup, setShowListPopup] = useState(false); 

     //협업 불가 시
    //    if (!is_willing_collaborate) {
    //    return <CoworkUnavailable />;
    //  }
    return (
    <Page>
    <Map/>
    {showPopup && (
        <CoworkPopup
          storeName="아코 헤어"
          storeType="생활 서비스 - 미용실"
          requestContent="안녕하세요 사장님 각자 가게 영수증 가지고 가면 10% 할인해주는 이벤트 어떠세요?"
          onClose={() => setShowPopup(false)}
        />
      )}

      {showListPopup && (
        <StoreListPopup
          onClose={() => setShowListPopup(false)}
          storeName="하얀집 3호점"
        />
      )}
      <ListBox>
      <StoreList title="협업 요청받은 가게" storeName="하얀집 3호점"onClick={() => setShowListPopup(true)}/>
      <StoreList title="협업 요청한 가게" storeName="하얀집 3호점"/>
      <StoreList title="협업 중인 가게" storeName="하얀집 3호점"/>
      </ListBox>
    </Page>
  );
}

export default CoworkPage;
