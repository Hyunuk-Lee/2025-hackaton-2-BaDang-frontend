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
function CoworkPage({ is_willing_collaborate, storeId = "1" }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  //협업 불가 시
  //    if (!is_willing_collaborate) {
  //    return <CoworkUnavailable />;
  //  }

  // 팝업 관리------------------------------------------------------
  const [popup, setPopup] = useState({ type: null, store: null });
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

  //리스트 관리---------------------------------------------
  const [collaborateStores, setCollaborateStores] = useState([]); // 협업 중인 가게
  const [requestStores, setRequestStores] = useState([]); // 협업 요청받은 가게

  useEffect(() => {
    if (!storeId) return; // storeId 없으면 호출 안 함

    axios
      .get(`${backendUrl}collaboration/active/${storeId}`, {
        headers: { Authorization: `Bearer ${secretKey}` },
      })
      .then((res) => {
        const data = res.data.data;

        // 협업 중인 가게 이름
        const collaborateNames = data.collaborateStores.flatMap((store) => {
          if (store.collaborateStore) {
            return store.collaborateStore.map((s) => s.collaborateStoreName);
          } else if (store.requestStore) {
            return store.requestStore.map((s) => s.requestStoreName);
          }
          return [];
        });
        setCollaborateStores(collaborateNames);

        // 협업 요청받은 가게 이름
        const requestNames =
          data.requestStores?.map((s) => s.responseStore.storeName) || [];
        setRequestStores(requestNames);
      })
      .catch((err) => console.error(err));
  }, [storeId]);
  // 리스트 관리---------------------------------------------

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
          onClick={(store) => handleStoreClick(store, "cowork")}
        />
        <StoreList title="협업 요청한 가게" storeName="하얀집 3호점" />
        <StoreList
          title="협업 중인 가게"
          storeNames={collaborateStores}
          onClick={(store) => handleStoreClick(store, "list")}
        />
      </ListBox>
    </Page>
  );
}

export default CoworkPage;
