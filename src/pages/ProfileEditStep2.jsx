import React, { useEffect, useMemo, useState } from "react"; // ✅ useEffect 추가
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// ... (나머지 import 및 상수 선언은 동일)
const GENDER_OPTIONS = ["남자", "여자"];
const AGE_OPTIONS = ["청소년", "청년", "중년층", "노년층", "외국인"];
const CONSENT_OPTIONS = ["동의", "비동의"];

// ✅ Set과 Array를 비교하기 위한 헬퍼 함수
const areSetsEqual = (setA, setB) => {
  if (setA.size !== setB.size) return false;
  for (const item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
};

export default function ProfileEditStep2({ defaultValues, onComplete, onBack }) { // ❌ isChanged prop 제거
  const navigate = useNavigate();

  const [gender, setGender] = useState(defaultValues?.gender ?? "");
  const [age, setAge] = useState(defaultValues?.ages?.[0] ?? "");  // Set에서 string으로 변경
  const [consent, setConsent] = useState(defaultValues?.consent ?? "");
  const [note, setNote] = useState(defaultValues?.note ?? "");

  // ✅ 변경 여부를 추적하는 내부 상태 추가
  const [isChanged, setIsChanged] = useState(false);

  const isValid = useMemo(
    () => !!gender && !!age && !!consent,  // age는 단일 선택 값
    [gender, age, consent]
  );

  // ✅ useEffect를 사용해 현재 상태가 defaultValues와 다른지 감지
  useEffect(() => {
    const changed =
      gender !== (defaultValues?.gender ?? "") ||
      age !== (defaultValues?.ages?.[0] ?? "") ||  // 단일 선택으로 변경된 나이대 비교
      consent !== (defaultValues?.consent ?? "") ||
      note !== (defaultValues?.note ?? "");
      
    setIsChanged(changed);
  }, [gender, age, consent, note, defaultValues]);

  const handleAgeSelect = (label) => {
    setAge(label);  // 단일 선택으로 설정
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      gender,
      ages: [age],  // 단일 값 배열로 전달
      consent,
      note: note.trim(),
    };
    
    onComplete?.(payload);
  };

  return (
    <Page>
      <Card>

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

          {/* 나이대 (단일선택) */}
          <Field>
            <FieldLabel>주요 고객 나이대</FieldLabel>
            <ChipsRow>
              {AGE_OPTIONS.map((a) => (
                <Chip
                  key={a}
                  type="button"
                  active={age === a}  // 단일 선택 값
                  onClick={() => handleAgeSelect(a)}  // 클릭 시 해당 나이대만 선택
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
            {onBack && (
              <BackButton type="button" onClick={onBack}>
                이전
              </BackButton>
            )}
            {/* ✅ 이제 내부 isChanged 상태를 사용합니다. */}
            <SubmitButton type="submit" disabled={!isValid || !isChanged}>
              완료
            </SubmitButton>
          </Footer>
        </Form>
      </Card>
    </Page>
  );
}

/* ---------- styled-components 코드는 기존과 동일 ---------- */
// ... (Page, Card, Header, Form, Field 등 모든 스타일 컴포넌트)
const Page = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
`;

const Card = styled.section`
  width: 960px;
  border-radius: 20px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  background: #fff;
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
`;

const SubmitButton = styled.button`
  flex: 1; /* 너비를 유연하게 조절 */
  max-width: 520px;
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

const BackButton = styled.button`
  height: 56px;
  padding: 0 24px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #17171b;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  &:hover { background: #f9fafb; }
`;