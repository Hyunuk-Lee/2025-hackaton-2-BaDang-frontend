// pages/ProfileEditPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignUpStep3 from "./SignUpStep3"; // 1단계 UI로 재사용
import SignUpStep4 from "./SignUpStep4"; // 2단계 UI로 재사용

// API 응답(숫자)을 프론트엔드(문자열)로 변환하기 위한 역매핑
const REVERSE_CATEGORY_MAIN_MAP = { 1: "음식", 2: "소매", 3: "생활서비스", 4: "교육", 5: "숙박", 6: "오락/여가", 7: "의료/건강", 8: "운송/자동차", 9: "제조/생산", 10: "기타" };
const REVERSE_CATEGORY_SUB_MAP = { 1: "한식", 2: "카페" /* Add all others... */ };
const REVERSE_AGE_MAP = { 0: "청소년", 1: "청년", 2: "중년층", 3: "노년층", 4: "외국인" };

// API 요청 데이터 변환 맵 (SignUpPage에서 복사)
const CATEGORY_MAIN_MAP = { "음식": 1, "소매": 2, "생활서비스": 3, "교육": 4, "숙박": 5, "오락/여가": 6, "의료/건강": 7, "운송/자동차": 8, "제조/생산": 9, "기타": 10 };
const CATEGORY_SUB_MAP = { "한식": 1, "카페": 2 /* Add all other sub-categories... */ };
const AGE_MAP = {"청소년": 0, "청년": 1, "중년층": 2, "노년층": 3, "외국인": 4};

export default function ProfileEditPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [originalData, setOriginalData] = useState(null); // 원본 데이터 (변경 여부 비교용)
    const [formData, setFormData] = useState({}); // 수정 중인 데이터
    const navigate = useNavigate();

    // 1. 페이지 로드 시, 서버에서 현재 사용자/가게 정보 가져오기
    useEffect(() => {
        const fetchCurrentData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/me/`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new Error("사용자 정보를 불러오는데 실패했습니다.");
                
                const apiData = await response.json();
    
                // ✅ 1. store 데이터가 없을 경우를 대비하여 빈 객체를 기본값으로 설정
                const store = apiData.stores?.[0] || {}; 
                
                // ✅ 2. visitor 객체도 없을 수 있으므로 기본값 설정
                const visitor = store.visitor || {};
    
                // API 데이터를 프론트엔드 state 형식으로 변환
                const initialFormData = {
                    main: REVERSE_CATEGORY_MAIN_MAP[store.type] || "",
                    sub: REVERSE_CATEGORY_SUB_MAP[store.category] || "",
                    items: store.menus && store.menus.length > 0 ? store.menus : [{ name: "", price: "" }],
                    gender: visitor.gender === "M" ? "남자" : visitor.gender === "F" ? "여자" : "",
                    // ✅ visitor.age_group이 없을 경우를 대비
                    ages: new Set(visitor.age_group?.map(age => REVERSE_AGE_MAP[age]) || []),
                    consent: store.isWillingCollaborate ? "동의" : "비동의",
                    note: store.storeContent || "",
                };
    
                setFormData(initialFormData);
                setOriginalData(initialFormData);
            } catch (error) {
                console.error(error);
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentData();
    }, []);

    // 2. 변경 여부 감지 (완료 버튼 활성화용)
    const isChanged = useMemo(() => {
        if (!originalData) return false;
        // Set 객체는 JSON.stringify로 직접 비교가 어려우므로 배열로 변환 후 비교
        const original = { ...originalData, ages: Array.from(originalData.ages) };
        const current = { ...formData, ages: Array.from(formData.ages) };
        return JSON.stringify(original) !== JSON.stringify(current);
    }, [originalData, formData]);


    const handleNext = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    // 3. 최종 '완료' 버튼 클릭 시 실행될 함수
    const handleComplete = async (step4Data) => {
        const finalData = { ...formData, ...step4Data };
        setLoading(true);

        // 프론트엔드 state를 API가 요구하는 형식으로 변환
        const payload = {
            type: CATEGORY_MAIN_MAP[finalData.main],
            category: CATEGORY_SUB_MAP[finalData.sub],
            visitor: {
                gender: finalData.gender === "남자" ? "M" : "F",
                age_group: Array.from(finalData.ages).map(age => AGE_MAP[age]),
                is_foreign: finalData.ages.has("외국인"),
            },
            isWillingCollaborate: finalData.consent === "동의",
            storeContent: finalData.note,
            menus: finalData.items.map(item => ({ name: item.name, price: Number(item.price) })),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/stores`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });
      
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || '정보 수정에 실패했습니다.');
            }
      
            alert("정보가 성공적으로 수정되었습니다!");
            navigate("/");
      
        } catch (error) {
            console.error("API Error:", error);
            alert(`오류가 발생했습니다: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <Page><p>정보를 불러오는 중입니다...</p></Page>;

    const steps = [
        <SignUpStep3 defaultValues={formData} onNext={handleNext} />,
        <SignUpStep4 defaultValues={formData} onComplete={handleComplete} onBack={handleBack} isChanged={isChanged} />,
    ];

    return steps[step - 1] || null;
}

// SignUpPage와 유사한 스타일
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  background: #ebeeff;
`;