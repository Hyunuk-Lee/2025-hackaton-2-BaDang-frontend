// pages/ProfileEditPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignUpStep3 from "./SignUpStep3"; // 1단계 UI로 재사용
import SignUpStep4 from "./SignUpStep4"; // 2단계 UI로 재사용
import ProfileEditStep1 from "./ProfileEditStep1";
import ProfileEditStep2 from "./ProfileEditStep2";

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
    const [originalData, setOriginalData] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/me/`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new Error("사용자 정보를 불러오는데 실패했습니다.");
                
                const apiData = await response.json();
                const store = apiData.stores?.[0] || {};
                
                // ✅ 'visitor'가 ID(숫자)로 오는 경우, 상세 정보가 없으므로 기본값으로 처리합니다.
                //    백엔드 /me/ API가 visitor 객체를 포함하도록 수정하면 이 부분이 개선될 수 있습니다.
                const visitorData = typeof store.visitor === 'object' && store.visitor !== null ? store.visitor : {};

                // API 데이터를 프론트엔드 state 형식으로 변환
                const initialFormData = {
                    main: REVERSE_CATEGORY_MAIN_MAP[store.type] || "",
                    sub: REVERSE_CATEGORY_SUB_MAP[store.category] || "",
                    items: store.menus && store.menus.length > 0 ? store.menus : [{ name: "", price: "" }],
                    gender: visitorData.gender === "M" ? "남자" : visitorData.gender === "F" ? "여자" : "",
                    ages: new Set(visitorData.age_group?.map(age => REVERSE_AGE_MAP[age]) || []),
                    consent: store.isWillingCollaborate ? "동의" : "비동의",
                    // ✅ 백엔드 키 이름('content')에 맞게 수정
                    note: store.content || "",
                };

                setFormData(initialFormData);
                setOriginalData(JSON.parse(JSON.stringify(initialFormData))); // 깊은 복사로 원본 데이터 저장
            } catch (error) {
                console.error(error);
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentData();
    }, []);

    const isChanged = useMemo(() => {
        if (!originalData) return false;
        // Set 객체 비교를 위해 배열로 변환
        const originalForCompare = { ...originalData, ages: Array.from(originalData.ages || []) };
        const currentForCompare = { ...formData, ages: Array.from(formData.ages || []) };
        return JSON.stringify(originalForCompare) !== JSON.stringify(currentForCompare);
    }, [originalData, formData]);

    const handleNext = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleComplete = async (step4Data) => {
        const finalData = { ...formData, ...step4Data };
        setLoading(true);

        const payload = {
            type: CATEGORY_MAIN_MAP[finalData.main],
            category: CATEGORY_SUB_MAP[finalData.sub],
            isWillingCollaborate: finalData.consent === "동의",
            // ✅ 백엔드 키 이름('content')에 맞게 수정
            content: finalData.note,
            menus: finalData.items.filter(it => it.name.trim() && it.price).map(it => ({ name: it.name, price: Number(it.price) })),
            // ✅ visitor 정보는 PATCH 요청 시 별도로 보내거나, 백엔드 로직에 따라 포함/제외
            // 아래는 visitor 정보도 함께 업데이트하는 예시입니다.
            visitor: {
                gender: finalData.gender === "남자" ? "M" : "F",
                age_group: Array.from(finalData.ages).map(age => AGE_MAP[age]),
                is_foreign: finalData.ages.has("외국인"),
            },
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/stores/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });
      
            if (!response.ok) {
                const errorBody = await response.json();
                // 백엔드가 보내는 구체적인 오류 메시지를 표시
                const errorMessage = Object.values(errorBody).flat().join(' ');
                throw new Error(errorMessage || '정보 수정에 실패했습니다.');
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
    
    if (loading) return <Page><LoadingText>정보를 불러오는 중입니다...</LoadingText></Page>;

    // ✅ SignUp 컴포넌트를 그대로 재사용하되, props를 채워서 전달합니다.
    const steps = [
        <ProfileEditStep1
            title="가게 정보 수정" 
            defaultValues={formData} 
            onNext={handleNext} 
        />,
        <ProfileEditStep2
            title="고객 정보 수정" 
            defaultValues={formData} 
            onComplete={handleComplete} 
            onBack={handleBack} 
            isChanged={isChanged} 
        />,
    ];

    return steps[step - 1] || null;
}

// SignUpPage와 유사한 스타일
const Page = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
`;

const LoadingText = styled.p`
    font-size: 18px;
    color: #555;
`;