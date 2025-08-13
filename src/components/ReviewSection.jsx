// components/ReviewSection.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import SmallQ from '../assets/SmallQ.svg';

const Section = styled.div`
  background: #FFF;
  position: relative;
  padding: 16px;
  border-radius: 8px;
  min-height: 132px;
`;

const SectionTitleWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionTitle = styled.div`
  margin: 0;
  color: ${props => props.color || '#17171B'};
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
  right: 16px;
  width: 200px;
  height: auto;
  z-index: 10;
`;

const SectionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 40px;
`;

const RatioText = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 12px;
  line-height: 1.4;
  text-align: right;
`;

const RatioItem = styled.div`
  color: ${props => props.color};
`;

function ReviewSection({ title, icon, showSmallQ = true, className, children, ratios, titleColor, popupImage }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Section className={className}>
      <SectionTitleWrapper>
        <SectionTitle color={titleColor}>{title}</SectionTitle>
        {icon && <SectionIcon src={icon} alt="icon" />}
      </SectionTitleWrapper>
      {children && <SectionContent>{children}</SectionContent>}
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
      {ratios && (
        <RatioText>
          <RatioItem color="#0046FF">긍정 {ratios.positive}%</RatioItem>
          <RatioItem color="#17171B">중립 {ratios.neutral}%</RatioItem>
          <RatioItem color="#FF8040">부정 {ratios.negative}%</RatioItem>
        </RatioText>
      )}
    </Section>
  );
}

export default ReviewSection;