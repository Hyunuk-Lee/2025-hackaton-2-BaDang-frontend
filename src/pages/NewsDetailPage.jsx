import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import Advertisement from "../components/Advertisement2";
import NoHeart from "../assets/NoHeart.svg";
import YesHeart from "../assets/YesHeart.svg";
import { useFavorites } from "../context/FavoritesContext";
import { useGetNewsletterDetail } from "../hooks/queries/useGetNewsletterDetail";

export default function NewsDetailPage() {
  const { id } = useParams();
  const { isLiked, toggleLike } = useFavorites();

  const { data: newsletter, loading, error } = useGetNewsletterDetail(id);
  console.log(newsletter);

  const liked = isLiked(id);

  return (
    <Page>
      <Article>
        <IssueBadge>{id}</IssueBadge>

        {loading && <div>불러오는 중...</div>}
        {error && <div>데이터 로드 실패: {String(error)}</div>}
        {!loading && !error && (
          <>
            <Title>{newsletter?.title}</Title>

            <MetaRow>
              <ChipPrimary>{newsletter?.keywords[0].keywordName}</ChipPrimary>
              <ChipLine>{newsletter?.createdAt}</ChipLine>
              <LikeBtn type="button" onClick={() => toggleLike(id)}>
                찜하기
                <HeartIcon src={liked ? YesHeart : NoHeart} alt="" />
              </LikeBtn>
            </MetaRow>

            <Hero
              src={
                newsletter?.keywords?.[0]?.keywordImageUrl ||
                newsletter?.thumbnail ||
                newsletter?.imageUrl ||
                ""
              }
              alt="뉴스레터 썸네일"
            />

            {/* 썸네일 여기에 넣어야 함....!*/}

            {/* 본문 */}
            <Paragraph>{newsletter?.firstContent}</Paragraph>
            <Paragraph>{newsletter?.secondContent}</Paragraph>

            <Advertisement />
          </>
        )}
      </Article>
    </Page>
  );
}

/* ===== styled ===== */
const Page = styled.div`
  min-height: 100vh;
`;

const Article = styled.main`
  max-width: 768px; /* 좌우 324px 여백 느낌 */
  margin: 48px auto 48px; /* 상단 여유 */
  padding: 0 16px; /* 모바일 대비 내부 여백 */
`;

const IssueBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #FF9762;

color: var(--Typo-White01, #FAF9F6);
text-align: center;
font-family: NanumSquareOTF;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const Title = styled.h1`
  color: var(--Primary-Black01, #17171b);
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
height: 63px;
display: flex;
padding: 20px 15px;
justify-content: center;
align-items: center;
gap: 10px;
text-align: center;
font-family: NanumSquareOTF;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const ChipPrimary = styled(ChipBase)`
 border-radius: 20px;
background:  #759AFC;
color:  #FAF9F6;

`;

const ChipLine = styled(ChipBase)`
  border-radius: 20px;
border: 1.5px solid #759AFC;
background: #FFF;
color:  #494954;

`;

const LikeBtn = styled.button`
all: unset; 

color: var(--Typo-Black01, #494954);
text-align: center;
font-family: NanumSquareOTF;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
display: flex;
padding: 20px 16px;
align-items: center;
gap: 10px;
border-radius: 20px;
border: 1px solid var(--Primary-gray2, #D8D8D8);
background: var(--Background-White, #FFF);

/* button shadow */
box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
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
  color: var(--Primary-Black01, #17171b);
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 37px; /* 148% */
  margin: 25px 0;
`;
