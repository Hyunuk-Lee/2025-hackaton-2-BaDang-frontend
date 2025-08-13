import React, {useState} from 'react';
import TimeBtnGroup from '../components/TimeBtnGroup';
import ReviewSection from '../components/ReviewSection';
import PieChart from '../components/PieChart';
import styled from 'styled-components';
import BigQ from '../assets/BigQ.svg';
import GoodIcon from '../assets/GoodIcon.svg';
import BadIcon from '../assets/BadIcon.svg';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  gap: 8px;
  padding: 8px 20px 20px 20px;
`;

const StyledReviewSection = styled(ReviewSection)`
  &.section-3 {
    grid-row: 2 / 4;
  }
  
  &.section-6 {
    grid-column: 1 / 3;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
`;

function OnlineReviewPage() {
  const [selectedRange, setSelectedRange] = useState("전체");
  const options = ["전체", "한 달", "일주일"];
  
  return (
    <PageContainer>
      <Header>
        <TitleSection>
          <Title>
            <TitleLarge>지점</TitleLarge>
            <TitleSmall>의 전체 리뷰 분석</TitleSmall>
          </Title>
          <QIcon src={BigQ} alt="BigQ" />
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
          
        />
        <StyledReviewSection 
          title="아쉬워요" 
          icon={BadIcon} 
          className="section-2" 
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
        />
        <StyledReviewSection 
          title="리뷰 기반 개선점" 
        />
        <StyledReviewSection 
          title="사장님을 위한 제안" 
          className="section-6" 
        />
      </GridContainer>
    </PageContainer>
  );
}

export default OnlineReviewPage;
