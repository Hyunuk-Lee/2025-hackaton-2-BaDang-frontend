// pages/CustomKeywordNewsPage.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import KeywordRequestBox from "../components/KeywordRequestBox";

/** ===== 임시 Placeholder들 (필요한 것만 유지) ===== */
const Placeholder = styled.div`
  background: #fff;
  border: 1px dashed #c8cbd1;
  border-radius: 8px;
  padding: 16px;
  color: #667085;
  font-size: 14px;
`;
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

/** ===== 레이아웃 ===== */
const Page = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1200px;      /* 페이지 전체 컨테이너 폭 */
  margin: 0 auto;         /* 가운데 정렬 */
  padding: 24px 16px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* 상단(검색바 + 최근검색/보고서)만 중앙 고정 폭 */
const SearchSection = styled.section`
  width: 100%;
  max-width: 670px;       /* 필요시 840~960 사이로 조절 */
  margin: 0 auto;         /* 가운데 정렬 */
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* 검색바를 648px로 쓰고 있어서 한 번 더 감싸 중앙 정렬 */
const CenterLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Row = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 320px; /* 좌 컨텐츠 / 우 찜 패널 */
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

/* 일반 섹션: 폭 100%, 중앙으로 잘 들어오게 */
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/** ===== 데이터(예시) ===== */
const CATEGORIES = ["전체", "바당이 만든 뉴스", "직접 만든 뉴스"];
const MOCK_NEWS = Array.from({ length: 27 }).map((_, i) => ({
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

/** ===== 페이지 ===== */
export default function CustomKeywordNewsPage() {
  // 검색 입력값 vs 실제 적용된 쿼리
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  // 최근 검색어(최대 3개, 최신 우선, 중복 제거)
  const [recent, setRecent] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  // 최근 검색어 삭제
  const handleRemoveRecent = (kw) => {
    setRecent((prev) => prev.filter((x) => x !== kw));
  };

  // 필터링
  const filtered = useMemo(() => {
    let base = MOCK_NEWS;
    if (selectedCategory !== "전체") {
      base = base.filter((n) => n.category === selectedCategory);
    }
    if (query) {
      const q = query.toLowerCase();
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

  // 최근검색 업데이트
  const pushRecent = (term) => {
    if (!term) return;
    setRecent((prev) => {
      const next = [term, ...prev.filter((x) => x !== term)];
      return next.slice(0, 3);
    });
  };

  const handleSearch = () => {
    const term = searchInput.trim();
    setQuery(term);
    setCurrentPage(1);
    pushRecent(term);
  };

  const handleSelectRecent = (kw) => {
    setSearchInput(kw);
    setQuery(kw);
    setCurrentPage(1);
    pushRecent(kw);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <Page>
      <Main>
        {/* 상단: 중앙 고정 폭 */}
        <SearchSection>
          <CenterLine>
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              placeholder="찾으시는 단어를 입력하세요"
            />
          </CenterLine>

          <KeywordRequestBox
            recent={recent}
            onSelect={handleSelectRecent}
            onRemove={handleRemoveRecent} 
            onMakeReport={() => {
              console.log("보고서 직접 만들기 클릭");
            }}
          />
        </SearchSection>

        {/* 본문: 그리드(좌 컨텐츠 / 우 찜) */}
        <Row>
          <Section>
            <CategoryTabs
              categories={CATEGORIES}
              value={selectedCategory}
              onChange={handleCategoryChange}
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

