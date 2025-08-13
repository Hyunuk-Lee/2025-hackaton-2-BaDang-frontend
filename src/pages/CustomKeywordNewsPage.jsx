// pages/CustomKeywordNewsPage.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import NewsCard from "../components/NewsCard"; // ✅ 실제로 존재하는 파일만 import

/** ===== 임시 Placeholder 컴포넌트들 ===== */
const Placeholder = styled.div`
  background: #fff;
  border: 1px dashed #c8cbd1;
  border-radius: 8px;
  padding: 16px;
  color: #667085;
  font-size: 14px;
`;
function SearchBar({ value, onChange }) {
  return (
    <Placeholder>
      SearchBar Placeholder — 검색어:{" "}
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="키워드를 입력하세요"
        style={{ marginLeft: 8 }}
      />
    </Placeholder>
  );
}
function KeywordRequestBox() {
  return <Placeholder>“원하는 키워드가 없다면?” Placeholder</Placeholder>;
}
function CategoryTabs({ categories, value, onChange }) {
  return (
    <Placeholder>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange?.(c)}
          style={{
            marginRight: 8,
            padding: "6px 10px",
            borderRadius: 6,
            border: value === c ? "2px solid #0046FF" : "1px solid #D0D5DD",
            background: value === c ? "#E8F0FF" : "#FFF",
            cursor: "pointer",
          }}
        >
          {c}
        </button>
      ))}
    </Placeholder>
  );
}
function FavoritePanel() {
  return <Placeholder>찜한 뉴스 패널 Placeholder</Placeholder>;
}
function Pagination({ current, total, onChange }) {
  return (
    <Placeholder>
      페이지네이션 Placeholder —
      {Array.from({ length: total }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onChange?.(p)}
            style={{
              marginLeft: 6,
              padding: "4px 8px",
              borderRadius: 6,
              border: current === p ? "2px solid #0046FF" : "1px solid #D0D5DD",
              background: current === p ? "#E8F0FF" : "#FFF",
              cursor: "pointer",
            }}
          >
            {p}
          </button>
        );
      })}
    </Placeholder>
  );
}
/** ===== /Placeholder ===== */

const Page = styled.div`
  min-height: 100vh;
  background: #f6f7fb;
`;
const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Row = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 320px;
    align-items: start;
  }
`;
const CardsGrid = styled.section`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 384px);
    justify-content: space-between;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 384px);
    justify-content: space-between;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 데이터 (예시)
const CATEGORIES = ["전체", "바당이 만든 뉴스", "직접 만든 뉴스"];
const MOCK_NEWS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title:
    "폭폭 찌는 더운 날씨, 사람들의 마음을 사로잡을 수 있는 가게 운영 방법은?",
  keyword: i % 3 === 0 ? "민생 회복 소비쿠폰" : "환경",
  date: "00년 0월 0주차",
  imageUrl: "https://picsum.photos/seed/" + (i + 1) + "/384/288",
  isOrange: i % 3 === 0,
  category:
    i % 3 === 0
      ? "바당이 만든 뉴스"
      : i % 3 === 1
      ? "직접 만든 뉴스"
      : "전체",
}));
const PAGE_SIZE = 9;

export default function CustomKeywordNewsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let base = MOCK_NEWS;
    if (selectedCategory !== "전체") {
      base = base.filter((n) => n.category === selectedCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      base = base.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.keyword.toLowerCase().includes(q)
      );
    }
    return base;
  }, [query, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Page>
      <Main>
        {/* 상단 검색 + 키워드 요청 */}
        <Section>
          <SearchBar value={query} onChange={(t) => { setQuery(t); setCurrentPage(1); }} />
          <KeywordRequestBox />
        </Section>

        {/* 본문: 좌(카드) / 우(찜) */}
        <Row>
          <Section>
            <CategoryTabs
              categories={CATEGORIES}
              value={selectedCategory}
              onChange={(c) => { setSelectedCategory(c); setCurrentPage(1); }}
            />
            <CardsGrid>
              {pageSlice.map((item) => (
                <NewsCard
                  key={item.id}
                  title={item.title}
                  keyword={item.keyword}
                  date={item.date}
                  imageUrl={item.imageUrl}
                  isOrange={item.isOrange}
                />
              ))}
            </CardsGrid>
          </Section>

          <FavoritePanel />
        </Row>

        {/* 하단 페이지네이션 */}
        <Section style={{ alignItems: "center" }}>
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </Section>
      </Main>
    </Page>
  );
}
