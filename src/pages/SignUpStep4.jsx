// pages/SignUpStep4.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Robot from "../assets/Icons/WelcomeRobotIcon.svg";

const GENDER_OPTIONS = ["남자", "여자"];
const AGE_OPTIONS = ["청소년", "청년", "중년층", "노년층", "외국인"];
const CONSENT_OPTIONS = ["동의", "비동의"];

export default function SignUpStep4({ defaultValues, onComplete }) {
  const navigate = useNavigate();

  const [gender, setGender] = useState(defaultValues?.gender ?? "");
  const [ages, setAges] = useState(new Set(defaultValues?.ages ?? []));
  const [consent, setConsent] = useState(defaultValues?.consent ?? "");
  const [note, setNote] = useState(defaultValues?.note ?? "");

  const isValid = useMemo(
    () => !!gender && ages.size > 0 && !!consent,
    [gender, ages, consent]
  );

  const toggleAge = (label) => {
    setAges((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      gender,
      ages: Array.from(ages),
      consent,
      note: note.trim(),
    };
    
    // ❌ 임시 로그인 처리 및 페이지 이동 코드 제거
    // localStorage.setItem("isAuthed", "1");
    // navigate("/");

    // ✅ 부모 컴포넌트에 데이터만 전달하는 역할만 수행
    onComplete?.(payload);
  };

  return (
    <Page>
      <Card>
        <Header>
          <h1>바당 시작하기</h1>
          <RobotImg src={Robot} alt="" />
        </Header>

        <Form onSubmit={handleSubmit}>
          {/* 성별 */}
          <Field>
            <FieldLabel>주요 고객 성별</FieldLabel>
            <ChipsRow>
              {GENDER_OPTIONS.map((g) => (
                <Chip
                  key={g}
                  type="button"
                  active={gender === g}
                  onClick={() => setGender(g)}
                >
                  {g}
                </Chip>
              ))}
            </ChipsRow>
          </Field>

          {/* 나이대 (다중선택) */}
          <Field>
            <FieldLabel>주요 고객 나이대</FieldLabel>
            <ChipsRow>
              {AGE_OPTIONS.map((a) => (
                <Chip
                  key={a}
                  type="button"
                  active={ages.has(a)}
                  onClick={() => toggleAge(a)}
                >
                  {a}
                </Chip>
              ))}
            </ChipsRow>
          </Field>

          {/* 협업 기능 동의 여부 + 툴팁 */}
          <Field>
            <LabelWithHelp>
              협업 기능 동의 여부
              <Help>
                ?
                <Tooltip style={{ width: 240 }}>
                  다른 사장님들에게 가게가 보이고
                  <br />
                  협업 기능을 이용할 수 있어요
                </Tooltip>
              </Help>
            </LabelWithHelp>

            <ChipsRow>
              {CONSENT_OPTIONS.map((c) => (
                <Chip
                  key={c}
                  type="button"
                  active={consent === c}
                  onClick={() => setConsent(c)}
                >
                  {c}
                </Chip>
              ))}
            </ChipsRow>
          </Field>

          {/* 기타 정보 + 툴팁 (선택) */}
          <Field>
            <LabelWithHelp>
              기타 정보
              <Help>
                ?
                <Tooltip style={{ width: 240 }}>
                  가게 인테리어, 분위기같은
                  <br />
                  기타 특이 사항들을 입력하면
                  <br />
                  더 맞춤화된 뉴스를 제작해드려요
                </Tooltip>
              </Help>
            </LabelWithHelp>

            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="기타 정보를 입력해주세요"
              rows={6}
            />
          </Field>

          <Footer>
            <SubmitButton type="submit" disabled={!isValid}>
              완료
            </SubmitButton>
          </Footer>
        </Form>
      </Card>
    </Page>
  );
}

/* ---------- styled ---------- */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  background: #ebeeff;
`;

const Card = styled.section`
  width: 960px;
  border-radius: 20px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  background: #fff;
`;

const Header = styled.header`
  position: relative;
  background: #494954;
  padding: 32px 32px;
  display: flex;
  justify-content: center;

  h1 {
    color: #fff;
    font-weight: 800;
    font-size: 36px;
    line-height: 1.2;
  }
`;

const RobotImg = styled.img`
  position: absolute;
  right: 28px;
  top: -1px;
  transform: rotate(-20.611deg);
  width: 120px;
  height: auto;
  pointer-events: none;
`;

const Form = styled.form`
  padding: 32px 144px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldLabel = styled.label`
  font-weight: 800;
  color: #17171b;
  font-size: 18px;
`;

const LabelWithHelp = styled(FieldLabel)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Help = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #2f3137;
  color: #fff;
  font-size: 12px;
  cursor: default;

  &:hover > div {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, 6px);
  opacity: 0;
  pointer-events: none;

  padding: 10px 12px;
  border-radius: 8px;
  background: #2f3137;
  color: #fff;
  font-size: 13px;
  line-height: 1.35;
  white-space: pre-line;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: all 0.15s ease;
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Chip = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${p => (p.active ? "#759afc" : "#e5e7eb")};
  background: ${p => (p.active ? "#759afc" : "#fff")};
  color: ${p => (p.active ? "#fff" : "#17171b")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #759afc;
    color: ${p => (p.active ? "#fff" : "#759afc")};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 14px 16px;
  font-size: 16px;
  resize: vertical;
  min-height: 160px;

  &::placeholder {
    color: #98a2b3;
  }

  &:focus {
    border-color: #759afc;
    box-shadow: 0 0 0 3px rgba(117, 154, 252, 0.2);
    outline: none;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  width: 70%;
  height: 56px;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  background: #0046ff;
  transition: transform 0.03s ease;
  cursor: pointer;

  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;
