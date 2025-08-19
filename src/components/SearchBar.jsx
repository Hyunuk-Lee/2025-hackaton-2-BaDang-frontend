// components/SearchBar.jsx
import React from "react";
import styled from "styled-components";

const Wrap = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #0046ff;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  width: 620px;
  height: 69px;
  padding-left: 12px;
`;

const Icon = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #17171b;
  background: transparent;

  ::placeholder {
    color: #98a2b3;
  }
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClearBtn = styled.button`
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  border: none;
  background: #0046ff;
  color: #fff;
  border-radius: 0 80px 80px 0;
  padding: 8px 14px;
  height: 69px;
  width: 70px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

export default function SearchBar({
  value = "",
  onChange,
  onSearch,
  placeholder = "키워드를 입력하세요",
  autoFocus = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <Wrap onSubmit={handleSubmit}>
      <Icon aria-hidden>🔍</Icon>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      <Btns>
        {value && (
          <ClearBtn type="button" onClick={() => onChange?.("")}>
            X
          </ClearBtn>
        )}
        <SearchBtn type="submit">검색</SearchBtn>
      </Btns>
    </Wrap>
  );
}
