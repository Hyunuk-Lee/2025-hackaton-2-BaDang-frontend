import React, {useState} from 'react';
import TimeBtnGroup from '../components/TimeBtnGroup';
import ReviewSection from '../components/ReviewSection';
import PieChart from '../components/PieChart';
import styled from 'styled-components';
import BigQ from '../assets/BigQ.svg';
import GoodIcon from '../assets/GoodIcon.svg';
import BadIcon from '../assets/BadIcon.svg';
import Popup1 from '../assets/Popup1.svg';
import Popup2 from '../assets/Popup2.svg';
import Popup3 from '../assets/Popup3.svg';
import Popup4 from '../assets/Popup4.svg';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px ;
  width: 1200px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
`;

const Title = styled.div`
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const TitleLarge = styled.span``;

const TitleSmall = styled.span``;

const QIcon = styled.img`
  width: 27.6px;
  height: 27.6px;
  cursor: pointer;
`;

const BigQPopup = styled.img`
  position: absolute;
  top: 0;
  left: 44px;
  width: 200px;
  height: auto;
  z-index: 10;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 132px 169px 170px 159px;
  gap: 24px;
  padding: 36px 120px;
`;

const StyledReviewSection = styled(ReviewSection)`
  &.section-1 {
    height: 132px;
    width: 588px;
  }
  
  &.section-2 {
    height: 132px;
    width: 587px;

  }
  
  &.section-3 {
    grid-row: 2 / 4;
    height: 363px;
    width: 588px;

  }
    &.section-4 {
    height: 169px;
    width: 588px;
  }
      &.section-5 {
    height: 170px;
  }
  &.section-6 {
    grid-column: 1 / 3;
    height: 159px;
    width: 100%;
  }
`;

const PageContainer = styled.div`
  display: flex;
width: 1440px;
padding-bottom: 70px;
flex-direction: column;
align-items: center;
margin: auto;
`;

function OnlineReviewPage() {
  const [selectedRange, setSelectedRange] = useState("전체");
  const [showBigQPopup, setShowBigQPopup] = useState(false);
  const options = ["전체", "한 달", "일주일"];
  
  return (
    <PageContainer>
      <Header>
        <TitleSection>
          <Title>
            <TitleLarge>지점</TitleLarge>
            <TitleSmall>의 전체 리뷰 분석</TitleSmall>
          </Title>
          <QIcon 
            src={BigQ} 
            alt="BigQ" 
            onMouseEnter={() => setShowBigQPopup(true)}
            onMouseLeave={() => setShowBigQPopup(false)}
          />
          {showBigQPopup && <BigQPopup src={Popup1} alt="Popup1" />}
        </TitleSection>
        <TimeBtnGroup 
          options={options}
          selectedValue={selectedRange}
          onSelect={setSelectedRange}
        />
      </Header>
      
      <GridContainer>
        <StyledReviewSection 
          title="좋았어요" 
          icon={GoodIcon} 
          className="section-1" 
          showSmallQ={false}
        />
        <StyledReviewSection 
          title="아쉬워요" 
          icon={BadIcon} 
          className="section-2" 
          showSmallQ={false}

        />
        <StyledReviewSection 
          title="긍·부정 비율" 
          showSmallQ={false}
          className="section-3"
          ratios={{ positive: 60, neutral: 25, negative: 15 }}
        >
          <PieChart positive={60} neutral={25} negative={15} />
        </StyledReviewSection>
        <StyledReviewSection 
          title="키워드 분석" 
          className="section-4"
          popupImage={Popup2}
        />
        <StyledReviewSection 
          title="리뷰 기반 개선점"
          className="section-5"
          popupImage={Popup3}
        />
        <StyledReviewSection 
          title="사장님을 위한 제안" 
          className="section-6"
          popupImage={Popup4}
        />
      </GridContainer>
    </PageContainer>
  );
}

export default OnlineReviewPage;
