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
  margin: 0 auto;
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

function CoworkPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [popup, setPopup] = useState({ type: null, store: null });
  const [isWilling, setIsWilling] = useState(null); // 협업 가능 여부
  const [storeId, setStoreId] = useState(null); // 가게 번호

  const [loading, setLoading] = useState(true);

  const [collaborateStores, setCollaborateStores] = useState([]); // 협업 중인 가게
  const [requestStores, setRequestStores] = useState([]); // 협업 요청받은 가게
  const [requestSentStores, setRequestSentStores] = useState([]); // 협업 요청한 가게

  // me 엔드포인트에서 협업 가능 여부 가져오기
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(`${backendUrl}/main/me`, {
          withCredentials: true,
        });
        // console.log("me response:", response.data);
        const id = response.data.stores[0]?.id;
        setStoreId(id);
        setIsWilling(response.data.isWillingCollaborate);
      } catch (error) {
        console.error("Failed to fetch me:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [backendUrl]);

  // 협업 관련 데이터 가져오기
  useEffect(() => {
    if (!storeId) return;
    const fetchData = async () => {
      try {
        // 협업 데이터 3개 병렬 요청
        const [activeRes, responseRes, requestRes] = await Promise.all([
          // 중인
          axios.get(`${backendUrl}/collaboration/active`, {
            withCredentials: true,
          }),
          // 요청받은
          axios.get(`${backendUrl}/collaboration/response`, {
            withCredentials: true,
          }),
          // 요청한
          axios.get(`${backendUrl}/collaboration/request`, {
            withCredentials: true,
          }),
        ]);
        console.log(
          "협업 신청 보낸 가게 (response)",
          responseRes.data.data.responseStores
        );

        setRequestStores(
          responseRes.data.data.responseStores.map((item) => ({
            allData: item.requestStore,
            collaborateId: item.collaborateId,
            initialMemo: item.initialMemo,
          }))
        );

        setRequestSentStores(
          requestRes.data.data.requestStores.map((item) => ({
            allData: item.responseStore,
            collaborateId: item.collaborateId,
            initialMemo: item.initialMemo,
          }))
        );

        setCollaborateStores(
          activeRes.data.data.collaborateStores.map(
            (item) => item.collaborateStore
          )
        );
      } catch (err) {
        console.error("협업 데이터 불러오기 실패:", err);
      }
    };
    // console.log("가게 목록", requestStores);
    fetchData();
  }, [storeId, backendUrl]);

  // 팝업 열기/닫기 핸들러
  const handleStoreClick = (storeItem, type) => {
    // storeItem은 이미 { allData, collaborateId, initialMemo } 형태
    setPopup({ type, store: storeItem });
  };

  const handleClosePopup = () => {
    setPopup({ type: null, store: null });
  };

  if (loading) return <div>불러오는 중...</div>;

  // 협업 불가능 상태면 안내 페이지
  if (isWilling === false) {
    return <CoworkUnavailable />;
  }

  return (
    <Page>
      {/* <div>
  <h3>requestStores 확인</h3>
  <pre>{JSON.stringify(requestStores, null, 2)}</pre>
</div> */}

      <Map
        storeId={storeId}
        onStoreClick={(store) => handleStoreClick(store, "request")}
      />

      {/* 팝업 렌더링 */}
      {popup.type === "request" && (
        <RequestPopup store={popup.store} onClose={handleClosePopup} />
      )}

      {/* 요청받은 */}
      {popup.type === "cowork" && popup.store && (
        <>
          <CoworkPopup
            storeName={popup.store.allData.name} // allData 안 필드 사용
            storeType={popup.store.allData.type} // 필요 시 allData.type
            requestContent={popup.store.initialMemo || ""}
            collaborateId={popup.store.collaborateId}
            onClose={handleClosePopup}
          />
        {console.log("모든 정보",popup.store.allData)}
        </>
      )}
      {/*  */}
      {popup.type === "list" && popup.store && (
        <StoreListPopup
          onClose={handleClosePopup}
          storeName={popup.store.name}
          storeType={popup.store.type}
          phoneNumber={popup.store.phoneNumber}
          requestContent={popup.store.memo || ""}
          collaborateId={popup.store.collaborateId}
        />
      )}

      {/* 협업 리스트 */}
      <ListBox>
        <StoreList
          title="협업 요청받은 가게"
          stores={requestStores}
          nothing="아직 협업을 요청한 가게가 없어요"
          onClick={(storeItem) => handleStoreClick(storeItem, "cowork")}
        />
        <StoreList
          title="협업 요청한 가게"
          stores={requestSentStores}
          nothing="아직 협업 요청을 보내지 않으셨어요"
          // onClick={(storeItem) => handleStoreClick(storeItem, "list")}
        />
        <StoreList
          title="협업 중인 가게"
          stores={collaborateStores}
          nothing="아직 협업 중인 가게가 없어요"
          onClick={(store) => handleStoreClick(store, "list")}
        />
      </ListBox>
    </Page>
  );
}

export default CoworkPage;
