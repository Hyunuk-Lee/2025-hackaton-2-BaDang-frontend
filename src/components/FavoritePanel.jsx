// components/FavoritePanel.jsx
import React from "react";
import styled from "styled-components";
import NoHeart from "../assets/NoHeart.svg";
import YesHeart from "../assets/YesHeart.svg";

export default function FavoritePanel({ active = false, count = 0, onToggle }) {
  return (
    <Wrap>
      <Pill type="button" onClick={onToggle} aria-pressed={active}>
        <Label>찜한 뉴스</Label>
        <Icon src={active ? YesHeart : NoHeart} alt="" />
        {count > 0 && <Badge>{count}</Badge>}
      </Pill>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Pill = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 28px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  cursor: pointer;

  &:hover { background: #f9fafb; }
`;

const Label = styled.span`
  font-size: 18px;
  color: #17171b;
  font-weight: 600;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  opacity: 0.9;
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff6a3d;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  font-weight: 700;
`;
