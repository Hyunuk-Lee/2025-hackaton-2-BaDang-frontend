// components/KeywordRequestBox.jsx
import React from "react";
import styled from "styled-components";

export default function KeywordRequestBox({
  recent = [],                 // string[]
  onSelect,                    // (keyword) => void
  onRemove,                    // (keyword) => void   ✅ 추가
  onMakeReport,                // () => void
}) {
  // 키보드 접근성(Enter/Space로 chip 선택)
  const handleKey = (e, kw) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(kw);
    }
  };

  return (
    <Wrap>
      <ChipsRow>
        {recent.map((kw) => (
          <Chip
            key={kw}
            role="button"
            tabIndex={0}
            onClick={() => onSelect?.(kw)}
            onKeyDown={(e) => handleKey(e, kw)}
            aria-label={`${kw} 검색`}
          >
            <span>{kw}</span>
            <RemoveBtn
              type="button"
              aria-label={`${kw} 삭제`}
              onClick={(e) => {
                e.stopPropagation();      // ✅ 칩 선택과 분리
                onRemove?.(kw);
              }}
              title="최근 검색어에서 제거"
            >
              ×
            </RemoveBtn>
          </Chip>
        ))}
      </ChipsRow>

      <ReportButton type="button" onClick={onMakeReport}>
        <ReportText>
          <Accent>보고서</Accent> 직접 만들기
        </ReportText>
        <Arrow aria-hidden>→</Arrow>
      </ReportButton>
    </Wrap>
  );
}

/** ===== styled ===== */
const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;      /* 한 줄 유지 */
`;

const ChipsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  white-space: nowrap;    /* 줄바꿈 방지 */
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #17171b;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);

  &:hover { background: #f9fafb; }
  &:focus-visible { outline: 2px solid #0046ff; outline-offset: 2px; }
`;

const RemoveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #667085;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;

  &:hover { background: #f2f4f7; }
`;

const ReportButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px 16px 24px;
  border-radius: 28px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  height: 53px;

  &:hover { background: #f9fafb; }
`;

const ReportText = styled.span`
  font-size: 18px;
  color: #17171b;
`;

const Accent = styled.span`
  color: #ff8040;
  font-weight: 700;
  margin-right: 4px;
`;

const Arrow = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #2f3137;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

