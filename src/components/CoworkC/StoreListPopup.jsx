// components/CoworkC/StoreListPopup.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Btn from "../CoworkC/PopupButton.jsx";
import Close from "../../assets/Icons/XIcon.svg"; // 엑스 아이콘
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.53);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const PopupBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 623px;
  padding: 24px 16px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  gap: 48px;
  position: relative;
`;
const TextWrapper = styled.div`
  display: flex;
  width: 467px;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;
const Title = styled.div`
  color: #17171b;
  text-align: center;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const CloseBtn = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  gap: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Content = styled.div`
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;
const BtnWrapper = styled.div`
  width: 591px;
  height: 59px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  align-items: center;
`;
const TextBox = styled.textarea`
  resize: none;
  display: flex;
  padding: 16px 16px 112px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid #759afc;
  background: #fff;
  color: #494954;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function StoreListPopup({
  storeName,
  storeType,
  phoneNumber,
  requestContent,
  collaborateId,
  onClose,
}) {
  const [content, setContent] = useState(requestContent);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(collaborateId);
  // 메모 수정
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${backendUrl}/collaboration/memo`,
        { collaborateId, memo: content },
        {
          withCredentials: true, // 수정 위치
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert(response.data.message);
      onClose();
    } catch (err) {
      console.error("메모 수정 실패:", err);
      alert("메모 수정에 실패했습니다.");
    }
  };

  // 협업 종료
  const handleEndCollaboration = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/collaboration/${collaborateId}`,
        {
          withCredentials: true, // 수정 위치
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("협업 종료 완료");
        onClose();
      } else {
        alert("협업 종료 실패");
      }
    } catch (err) {
      console.error("협업 종료 실패:", err);
      alert("서버 오류로 협업 종료에 실패했습니다.");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopupBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={Close} alt="닫기" onClick={onClose} />
        <TextWrapper>
          <Title>{storeName}</Title>
          <ContentWrapper>
            <Content>
              {storeName} : {storeType}
            </Content>
            <Content>전화 번호 : {phoneNumber}</Content>
            <Content>협업 내용</Content>
            <TextBox
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ContentWrapper>
        </TextWrapper>
        <BtnWrapper>
          <Btn
            btnName="수정완료"
            width="221px"
            color="#9D9D9D"
            onClick={handleSave}
          />
          <Btn
            btnName="협업종료"
            width="221px"
            color="#FF9762"
            onClick={handleEndCollaboration}
          />
        </BtnWrapper>
      </PopupBox>
    </Overlay>
  );
}

export default StoreListPopup;
