// pages/NewsDetailPage.jsx
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import Advertisement from "../components/Advertisement2";
import NoHeart from "../assets/NoHeart.svg";
import YesHeart from "../assets/YesHeart.svg";
import { useFavorites } from "../context/FavoritesContext";

export default function NewsDetailPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const { isLiked, toggleLike } = useFavorites();

  // 목록에서 넘겨준 카드 데이터
  const item = state?.item;

  // Fallback: 직접 진입 시 임시 데이터(실서비스에선 id로 fetch)
  const fallback = useMemo(
    () => ({
      id,
      title: "“폭염도 녹이는 한 그릇, 모리짱 냉라멘의 시원한 유혹”",
      keyword: "폭염",
      date: "00년 0월 0주차",
      imageUrl: "https://picsum.photos/seed/newsdetail/720/480",
    }),
    [id]
  );
  const data = item ?? fallback;

  const liked = isLiked(id);

  return (
    <Page>
      <Article>
        <IssueBadge>{id}</IssueBadge>

        <Title>{data.title}</Title>

        <MetaRow>
          <ChipPrimary>{data.keyword}</ChipPrimary>
          <ChipLine>{data.date}</ChipLine>
          <LikeBtn type="button" onClick={() => toggleLike(id)}>
            찜하기
            <HeartIcon src={liked ? YesHeart : NoHeart} alt="" />
          </LikeBtn>
        </MetaRow>

        <Hero src={data.imageUrl} alt="" />

        {/* 본문 */}
        <Paragraph>사장님, 안녕하세요.</Paragraph>
        <Paragraph>
          이번 주도 무더운 폭염이 이어지고 있습니다. 서울은 낮 기온이 35도에 육박하고,
          체감 온도는 38도까지 치솟고 있습니다. 이렇게 더운 날씨에는 시원한 냉라면 한
          그릇이 절로 떠오르죠. 이번 주 온라인 키워드는 “폭염”입니다.
        </Paragraph>

        <Paragraph>
          폭염은 최근 7일간 전국 검색량이 급상승한 기상 키워드로, 특히 서울, 대구, 광주에서
          높은 관심을 보였어요. 관련 검색어로는 ‘폭염주의보’, ‘더위 피하는 법’, ‘여름 음식’,
          ‘냉라면’이 있습니다. 더운 날씨 속에서 시원한 메뉴를 찾는 소비 심리가 그대로 반영된
          결과입니다.
        </Paragraph>

        <Paragraph>
          모리짱은 지하에 위치해 있어 외부 햇빛과 더위를 피하기 좋고, 
          여름철에는 냉라멘과 탄탄멘이 특히 인기입니다. 블로그 리뷰에서는 냉라멘이 평점 9.0을 기록했으며, 
          육향이 좋은 부드러운 차슈와 시원한 면발이 특징으로 꼽혔습니다. 
          ‘탄탄멘’ 역시 깔끔하고 매콤한 맛으로 더운 날씨에 입맛을 돋우는 메뉴로 평가받았습니다.
        </Paragraph>

        <Paragraph>
          소비자 행동 분석에 따르면 폭염 시기에는 뜨거운 국물보다 시원하거나 매콤한 메뉴를 선호하는 경향이 두드러집니다. 
          사장님 가게에서는 여름 한정 메뉴를 적극적으로 홍보하시거나, 
          한낮 폭염 시간대(11~15시) 방문 고객에게 무료 토핑을 제공하는 등 프로모션을 진행하시면 재방문율을 높일 수 있습니다.
        </Paragraph>

        <Paragraph>
            추천드리는 액션으로는 가게 입구에 “시원한 냉라멘 있습니다” 문구를 부착하고, 
            SNS에 냉라멘의 시원함을 강조한 사진을 업로드하는 것입니다. 
            또한 실내 온도를 2도 정도 낮춰 고객이 ‘시원하다’는 체감을 하게 하고, 
            여름 한정 해시태그(#폭염타파모리짱)를 사용한 리뷰 이벤트를 진행하시면 
            온라인 입소문과 방문 유도를 동시에 기대할 수 있습니다.
        </Paragraph>

        <Advertisement />

      </Article>
    </Page>
  );
}

/* ===== styled ===== */
const Page = styled.div`
  min-height: 100vh;
`;

const Article = styled.main`
  max-width: 768px;                /* 좌우 324px 여백 느낌 */
  margin: 48px auto 48px;          /* 상단 여유 */
  padding: 0 16px;                 /* 모바일 대비 내부 여백 */
`;

const IssueBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #ff6a3d;
  color: #fff;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  color: var(--Primary-Black01, #17171B);
  font-family: SUIT;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const ChipBase = styled.span`
  display: inline-flex;
  align-items: center;
  height: 52px;
  padding: 0 12px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
`;

const ChipPrimary = styled(ChipBase)`
  color: #fff;
  background: #0046ff;
`;

const ChipLine = styled(ChipBase)`
  color: #17171b;
  border: 1px solid #e5e7eb;
  background: #fff;
`;

const LikeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 52px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #17171b;
  cursor: pointer;

  &:hover { background: #f9fafb; }
`;

const HeartIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const Hero = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  margin: 12px 0 20px;
  object-fit: cover;
`;

const Paragraph = styled.p`
  color: var(--Primary-Black01, #17171B);
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 37px; /* 148% */
  margin: 25px 0;
`;
