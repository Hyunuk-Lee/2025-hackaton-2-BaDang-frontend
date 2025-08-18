// pages/CustomKeywordNewsPage.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import KeywordRequestBox from "../components/KeywordRequestBox";
import CategoryTabs from "../components/CategoryTabs";
import FavoritePanel from "../components/FavoritePanel";
import Pagination from "../components/Pagination";
import NoResult from "../components/NoResult";

/** ===== 레이아웃 ===== */
const Page = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* 상단(검색바 + 최근검색/보고서)만 중앙 고정 폭 */
const SearchSection = styled.section`
  width: 100%;
  max-width: 670px;
  margin: 0 auto;
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

/* 컨트롤 줄: 카테고리 탭(좌) + 찜 패널(우) */
const ControlsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* 본문 섹션 */
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

  // 카테고리/페이지
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  // ❤️ 좋아요 상태 + 찜 필터 토글
  const [likedIds, setLikedIds] = useState(new Set());
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  // 최근 검색어 삭제
  const handleRemoveRecent = (kw) => {
    setRecent((prev) => prev.filter((x) => x !== kw));
  };

  // 카드 하트 토글
  const handleToggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 결과 필터링
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
    if (favoriteOnly) {
      base = base.filter((n) => likedIds.has(n.id));
    }
    return base;
  }, [query, selectedCategory, favoriteOnly, likedIds]);

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

  const handleMakeReport = () => {
    // TODO: 라우팅/모달 연결
    console.log("보고서 만들러 가기 클릭");
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
            onMakeReport={handleMakeReport}
          />
        </SearchSection>

        {/* 컨트롤 줄: 탭 ↔︎ 찜 패널 */}
        <ControlsRow>
          <CategoryTabs
            options={CATEGORIES}
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <FavoritePanel
            active={favoriteOnly}
            count={likedIds.size}
            onToggle={() => {
              setFavoriteOnly((v) => !v);
              setCurrentPage(1);
            }}
          />
        </ControlsRow>

        {/* 카드 영역 (없으면 NoResult 표시) */}
        <Section>
          {pageSlice.length === 0 ? (
            <NoResult onMakeReport={handleMakeReport} />
          ) : (
            <CardsGrid>
              {pageSlice.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  keyword={item.keyword}
                  date={item.date}
                  imageUrl={item.imageUrl}
                  isOrange={item.isOrange}
                  liked={likedIds.has(item.id)}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </CardsGrid>
          )}
        </Section>

        {/* 하단 페이지네이션: 결과 없을 땐 숨김 */}
        {pageSlice.length > 0 && (
          <Section style={{ alignItems: "center" }}>
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
          </Section>
        )}
      </Main>
    </Page>
  );
}



