// pages/CoworkPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoreList from "../components/CoworkC/StoreList";
import CoworkPopup from "../components/CoworkC/CoworkPopup";
import StoreListPopup from "../components/CoworkC/StoreListPopup.jsx";
import RequestPopup from "../components/CoworkC/RequestPopup.jsx";
import CoworkUnavailable from "../components/CoworkC/CoworkUnavailable.jsx";
import Map from "../components/CoworkC/CoworkMap.jsx";
import axios from "axios";

const Page = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  padding: 24px;
`;
const ListBox = styled.div`
  display: flex;
  width: 1123px;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
`;
function CoworkPage({ storeId = "1" }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const [popup, setPopup] = useState({ type: null, store: null });

  const [isWilling, setIsWilling] = useState(true); // 협업 가능 여부

  const [collaborateStores, setCollaborateStores] = useState([]); // 협업 중인 가게
  const [requestStores, setRequestStores] = useState([]); // 협업 요청받은 가게
  const [requestSentStores, setRequestSentStores] = useState([]); // 협업 요청한 가게

  // 팝업 관리------------------------------------------------------
  // type: 'cowork' | 'request' | 'list' | null
  const handleStoreClick = (store, type) => {
    console.log("클릭된 가게 정보:", store);
    console.log("팝업 타입:", type);
    setPopup({ type, store });
  };
  const handleClosePopup = () => {
    setPopup({ type: null, store: null });
  };
  // 팝업 관리------------------------------------------------------

  useEffect(() => {
    if (!storeId) return;

    const fetchData = async () => {
      try {
        //  협업 가능 여부 확인
        const storeRes = await axios.get(
          `${backendUrl}main/stores/${storeId}`,
          { headers: { Authorization: `Bearer ${secretKey}` } }
        );
        const isWilling = storeRes.data.isWillingCollaborate;
        console.log("협업 가능 여부:", isWilling);
        setIsWilling(isWilling);

        //  나머지 세 요청 병렬 처리
        const [activeRes, responseRes, requestRes] = await Promise.all([
          axios.get(`${backendUrl}collaboration/active/${storeId}`, {
            headers: { Authorization: `Bearer ${secretKey}` },
          }),
          axios.get(`${backendUrl}collaboration/response/${storeId}`, {
            headers: { Authorization: `Bearer ${secretKey}` },
          }),
          axios.get(`${backendUrl}collaboration/request/${storeId}`, {
            headers: { Authorization: `Bearer ${secretKey}` },
          }),
        ]);

        // 협업 중인 가게
        // console.log("activeRes", activeRes.data);
        setCollaborateStores(
          activeRes.data.data.collaborateStores.map(
            (item) => item.collaborateStore
          )
        );
        console.log("협업 중인 가게 배열:", collaborateStores);

        // 협업 요청받은 가게
        // console.log("responseRes", responseRes.data);
        setRequestStores(
          responseRes.data.data.responsetStores.map(
            (item) => item.responseStore
          )
        );
        console.log("협업 요청받은 가게 배열:", requestStores);

        // 협업 요청한 가게
        // console.log("requestRes", requestRes.data);
        setRequestSentStores(
          requestRes.data.data.requestStores.map((item) => item.responseStore)
        );
        console.log("협업 요청한 가게 배열:", requestSentStores);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [storeId]);

  if (!isWilling) {
    return <CoworkUnavailable />; // unavailable 페이지 띄우기
  }
  return (
    <Page>
      <Map onStoreClick={(store) => handleStoreClick(store, "request")} />

      {/* 팝업 렌더링 */}
      {popup.type === "request" && (
        <RequestPopup store={popup.store} onClose={handleClosePopup} />
      )}
      {popup.type === "cowork" && (
        <CoworkPopup
          storeName="아코 헤어"
          storeType="생활 서비스 - 미용실"
          requestContent="안녕하세요 사장님 각자 가게 영수증 가지고 가면 10% 할인해주는 이벤트 어떠세요?"
          onClose={handleClosePopup}
        />
      )}
      {popup.type === "list" && (
        <StoreListPopup onClose={handleClosePopup} storeName="하얀집 3호점" />
      )}

      <ListBox>
        <StoreList
          title="협업 요청받은 가게"
          storeNames={requestStores}
          nothing="아직 협업을 요청한 가게가 없어요"
          onClick={(store) => handleStoreClick(store, "cowork")}
        />
        <StoreList
          title="협업 요청한 가게"
          storeName="하얀집 3호점"
          nothing="아직 협업 요청을 보내지 않으셨어요"
        />
        <StoreList
          title="협업 중인 가게"
          storeNames={collaborateStores}
          nothing="아직 협업 중인 가게가 없어요"
          onClick={(store) => handleStoreClick(store, "list")}
        />
      </ListBox>
    </Page>
  );
}

export default CoworkPage;
