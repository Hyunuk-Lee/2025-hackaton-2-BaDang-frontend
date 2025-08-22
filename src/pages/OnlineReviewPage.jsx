// pages/OnlineReviewPage.jsx

import axios from "axios";
import React, { useState, useEffect } from "react";
import TimeBtnGroup from "../components/TimeBtnGroup";
import ReviewSection from "../components/ReviewC/ReviewSection";
import PieChart from "../components/ReviewC/PieChart";
import styled from "styled-components";
import BigQ from "../assets/Popups/BigQ.svg";
import GoodIcon from "../assets/Icons/GoodIcon.svg";
import BadIcon from "../assets/Icons/BadIcon.svg";
import Popup1 from "../assets/Popups/Popup1.svg";
import Popup2 from "../assets/Popups/Popup2.svg";
import Popup3 from "../assets/Popups/Popup3.svg";
import Popup4 from "../assets/Popups/Popup4.svg";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px;
  width: 1200px;
`;

const BigQPopup = styled.img`
  position: absolute;
  top: -50px;
  left: 20px;
  width: 568px;
  height: auto;
  z-index: 10;
  display: none;
`;

const QWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  &:hover ${BigQPopup} {
    display: block;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Title = styled.div`
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const TitleLarge = styled.span`
  color: #17171b;
  text-align: center;
  font-family: "NanumSquareOTF";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TitleSmall = styled.span`
  color: #17171b;
  font-family: "NanumSquareOTF";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const QIcon = styled.img`
  width: 27.6px;
  height: 27.6px;
  cursor: pointer;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 132px 169px 170px 159px;
  gap: 24px;
  padding: 36px 120px;
`;

const StyledReviewSection = styled(ReviewSection)`
  &.section-1 { height: 132px; width: 588px; }
  &.section-2 { height: 132px; width: 587px; }
  &.section-3 { grid-row: 2 / 4; height: 363px; width: 588px; }
  &.section-4 { height: 169px; width: 588px; }
  &.section-5 { height: 170px; }
  &.section-6 { grid-column: 1 / 3; height: 159px; width: 100%; }
`;

const PageContainer = styled.div`
  display: flex;
  width: 1440px;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

function OnlineReviewPage() {
  const options = ["전체", "한 달", "일주일"];
  const termMap = { 전체: 0, "한 달": 1, 일주일: 2 };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [selectedRange, setSelectedRange] = useState("전체");
  const [storeName, setStoreName] = useState("가게 이름 불러오는 중...");
  const [goodPoint, setGoodPoint] = useState("리뷰 데이터 불러오는 중...");
  const [badPoint, setBadPoint] = useState("리뷰 데이터 불러오는 중...");
  const [percentage, setPercentage] = useState({
    goodPercentage: 0,
    middlePercentage: 0,
    badPercentage: 0,
  });
  const [analysisKeyword, setAnalysisKeyword] = useState(
    "키워드 분석 데이터 불러오는 중..."
  );
  const [analysisProblem, setAnalysisProblem] = useState(
    "개선점 데이터 불러오는 중..."
  );
  const [analysisSolution, setAnalysisSolution] = useState(
    "제안 데이터 불러오는 중..."
  );

  // selectedRange가 바뀌면 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/review/analysis/`, {
          params: { term: termMap[selectedRange] ?? 0 },
        });

        const data = response.data.data; // 백엔드 Response 구조: { statusCode, message, data }

        setStoreName(data.storeName || "정보 없음");
        setGoodPoint(data.goodPoint || "데이터 없음");
        setBadPoint(data.badPoint || "데이터 없음");
        setPercentage(
          data.percentage || {
            goodPercentage: 0,
            middlePercentage: 0,
            badPercentage: 0,
          }
        );
        setAnalysisKeyword(data.analysisKeyword || "데이터 없음");
        setAnalysisProblem(data.analysisProblem || "데이터 없음");
        setAnalysisSolution(data.analysisSolution || "데이터 없음");
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setStoreName("에러 발생");
      }
    };

    fetchData();
  }, [selectedRange]);

  return (
    <PageContainer>
      <Header>
        <TitleSection>
          <Title>
            <TitleLarge>{storeName}</TitleLarge>
            <TitleSmall>의 전체 리뷰 분석</TitleSmall>
          </Title>
          <QWrapper>
            <QIcon src={BigQ} alt="BigQ" />
            <BigQPopup src={Popup1} alt="Popup1" />
          </QWrapper>
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
        >
          {goodPoint}
        </StyledReviewSection>

        <StyledReviewSection
          title="아쉬워요"
          icon={BadIcon}
          className="section-2"
          showSmallQ={false}
        >
          {badPoint}
        </StyledReviewSection>

        <StyledReviewSection
          title="긍·부정 비율"
          className="section-3"
          showSmallQ={false}
          ratios={percentage}
        >
          <PieChart
            positive={percentage.goodPercentage}
            neutral={percentage.middlePercentage}
            negative={percentage.badPercentage}
          />
        </StyledReviewSection>

        <StyledReviewSection
          title="키워드 분석"
          className="section-4"
          popupImage={Popup2}
        >
          {analysisKeyword}
        </StyledReviewSection>

        <StyledReviewSection
          title="리뷰 기반 개선점"
          className="section-5"
          popupImage={Popup3}
        >
          {analysisProblem}
        </StyledReviewSection>

        <StyledReviewSection
          title="사장님을 위한 제안"
          className="section-6"
          popupImage={Popup4}
        >
          {analysisSolution}
        </StyledReviewSection>
      </GridContainer>
    </PageContainer>
  );
}

export default OnlineReviewPage;