// components/CoworkC/CoworkPopup.jsx
import React from 'react';
import styled from 'styled-components';
import Btn from '../CoworkC/PopupButton.jsx';
import Close from '../../assets/Icons/XIcon.svg'; // 엑스 아이콘

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
const PopupBox=styled.div`
    display: flex;
    flex-direction: column;
width: 623px;
height: 357px;
padding: 24px 16px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 20px;
background: #FFF;
gap: 48px;
  position: relative;

`
const TextWrapper=styled.div`
    display: flex;
    width: 467px;
    flex-direction: column;
    align-items: center;
    gap: 48px;
`
const Title=styled.div`
    color: #17171B;
    text-align: center;

    font-family: SUIT;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const CloseBtn=styled.img`
    position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`
const ContentWrapper=styled.div`
    gap: 8px;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;`

const Content=styled.div`
    color:#494954;
    text-align: center;
    font-family: SUIT;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; 

`
const BtnWrapper=styled.div`
    width: 591px;
    height: 59px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    align-items: center;
`

function CoworkPopup({ storeName, storeType, requestContent, collaborateId, onClose }) {
const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleDecision = async (isAccepted) => {
    try {
console.log("가게이름",storeName)
      
const response = await fetch(`${backendUrl}/collaboration/accept`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', 
  body: JSON.stringify({
    collaborateId: collaborateId,
    isAccepted: isAccepted,
  }),
});

      if (!response.ok) {
        console.error('서버 오류:', response.status);
        return;
      }

      const result = await response.json();
      console.log(result); // { status:200, message:"수락/거절 결정완료" }

      onClose(); // 팝업 닫기
    } catch (err) {
      console.error('요청 실패:', err);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopupBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={Close} alt="닫기" onClick={onClose} />
        <TextWrapper>
          <Title>
            {storeName}의 <br /> 협업 요청을 수락할까요?
          </Title>
          <ContentWrapper>
            <Content>{storeName} : {storeType}</Content>
            <Content>요청 내용 : {requestContent}</Content>
          </ContentWrapper>
        </TextWrapper>
        <BtnWrapper>
          <Btn btnName='수락하기' color='#759AFC' width="221px" 
               onClick={() => handleDecision('ACCEPTED')} />
          <Btn btnName='거절하기' color='#FF9762' width="221px" 
               onClick={() => handleDecision('REJECTED')} />
        </BtnWrapper>
      </PopupBox>
    </Overlay>
  );
}

export default CoworkPopup;
