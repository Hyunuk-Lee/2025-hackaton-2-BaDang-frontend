// components/CategoryTabs.jsx
import React, { useRef } from "react";
import styled from "styled-components";

export default function CategoryTabs({ options = [], value, onChange }) {
  const btnRefs = useRef([]);

  const focusAt = (i) => btnRefs.current[i]?.focus();

  // 키보드 내비게이션(←/→, Enter/Space)
  const handleKeyDown = (e, i, opt) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % options.length;
      focusAt(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + options.length) % options.length;
      focusAt(prev);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange?.(opt);
    }
  };

  return (
    <Group role="tablist" aria-label="뉴스 구분">
      {options.map((opt, i) => {
        const active = value === opt;
        return (
          <TabBtn
            key={opt}
            ref={(el) => (btnRefs.current[i] = el)}
            className={active ? "active" : ""}
            onClick={() => onChange?.(opt)}
            onKeyDown={(e) => handleKeyDown(e, i, opt)}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
          >
            {opt}
          </TabBtn>
        );
      })}
    </Group>
  );
}

/* ===== styled ===== */
const Group = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 295px;
`;

const TabBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border: none;
  background: transparent;
  color: #494954;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    background: #759AFC;    /* 브랜드 블루 */
    color: #fff;
  }
  &:hover:not(.active) {
    color: #759afc;
  }
  &:focus-visible {
    outline: 2px solid #759AFC;
    outline-offset: 2px;
  }
`;
