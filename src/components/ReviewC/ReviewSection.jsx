import React, { useState } from 'react';
import styled from 'styled-components';
import SmallQ from '../../assets/Popups/SmallQ.svg';

const Section = styled.div`
  position: relative;
   display: flex;
   flex-direction: column;
  padding: 16px;
  border-radius: 20px;
  min-height: 132px;
  border: 1px solid #D8D8D8;
  background: #FFF;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

const SectionTitleWrapper = styled.div`
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionTitle = styled.div`
  margin: 0;
  color:#17171B;
  text-align: center;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
    color: #17171B; 
    
`;

const SectionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SmallQIcon = styled.img`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const PopupIcon = styled.img`
  position: absolute;
  bottom: 34px;
  right: -40px;
  width: 380px;
  height: auto;
  z-index: 10;
`;

const SectionContent = styled.div`
  display: flex;
  text-align: start;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  padding: 13px 0px;
  color: #494954;
font-family: SUIT;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 28px; /* 140% */
`;

const RatioText = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  text-align: center;
  font-family: NanumSquareOTF;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const RatioItem = styled.div`
  color: ${props => props.color};
`;

function ReviewSection({ title, icon, showSmallQ = true, className, ratios, popupImage, children }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Section className={className}>
      <SectionTitleWrapper>
        <SectionTitle>{title}</SectionTitle>
        {icon && <SectionIcon src={icon} alt="icon" />}
      </SectionTitleWrapper>


      {showSmallQ && (
        <>
          <SmallQIcon 
            src={SmallQ} 
            alt="SmallQ" 
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          />
          {showPopup && popupImage && <PopupIcon src={popupImage} alt="Popup" />}
        </>
      )}
      {/* 콘텐츠를 children 프롭스로 받아오는 구조라 해당 부분 추가 */}
      <SectionContent>
        {typeof children !== 'undefined' ? children : null}
      </SectionContent>

      {ratios && (
        <RatioText>
          <RatioItem color="#759AFC">긍정 {ratios.goodPercentage}%</RatioItem>
          <RatioItem color="#494954">중립 {ratios.middlePercentage}%</RatioItem>
          <RatioItem color="#FF9762">부정 {ratios.badPercentage}%</RatioItem>
        </RatioText>
      )}
    </Section>
  );
}

export default ReviewSection;
