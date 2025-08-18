// components/CoworkC/CoworkPopup.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Btn from "../CoworkC/PopupButton.jsx";
import Close from "../../assets/Icons/XIcon.svg"; // 엑스 아이콘
import axios from "axios";

const Overlay = styled.div`
  position: fixed; /* 화면 전체 덮기 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.53); /* 반투명 검정 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위에 표시 */
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
  onClose,
}) {
  const [content, setContent] = useState(requestContent);
  const handleSave = () => {
    console.log("수정된 내용:", content);
    // 여기서 API 호출로 저장하면 됨
    onClose();
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
          <Btn btnName="수정완료" width="221px" color="#9D9D9D" onClick={handleSave} />
          <Btn btnName="협업종료"  width="221px" color="#FF9762"/>
        </BtnWrapper>
      </PopupBox>
    </Overlay>
  );
}

export default StoreListPopup;
