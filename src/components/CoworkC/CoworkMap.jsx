import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StoreBtn from "../CoworkC/StoreBtn";
const Container = styled.div`
  display: flex;
  width: 1200px;
  height: 416px;
  gap: 57px;
  margin: auto;
`;

const MapBox = styled.div`
  width: 494px;
  height: 404px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 645px;
  height: 70px;
`;

const Input = styled.input`
  all: unset; /* 기본 스타일 초기화 */
  box-sizing: border-box; /* padding 포함 width/height 계산 */
  width: 100%;
  height: 100%;
  padding-left: 28px; /* 텍스트 위치 조정 */
  font-size: 16px;
  line-height: 1.2; /* 텍스트 수직 정렬 안정화 */
  border-radius: 53px;
  border: 1.5px solid #9d9d9d;
  background: #fff;
`;

const SearchButton = styled.button`
  all: unset;
  position: absolute;
  right: 0;
  top: 0;
  width: 90px;
  height: 100%;
  background: ${(props) => (props.$active ? "#759AFC" : "#9D9D9D")};
  color: #faf9f6;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$active ? "pointer" : "default")};
  border-radius: 0 53px 53px 0;
`;

const Title = styled.div`
  color: #494954;
  font-family: SUIT;
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 649px;
  align-items: center;
  gap: 24px;
`;

const Select = styled.select`
  display: flex;
  width: 312.5px;
  height: 73px;
  padding: 23px 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  background: #fff;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 649px;
`;

// 카테고리별 소분류 옵션
const subCategoryOptions = {
  음식: [
    "한식",
    "중식",
    "일식",
    "서양식",
    "기타외국식",
    "분식",
    "패스트푸드",
    "제과제빵",
    "카페",
  ],
  소매: [
    "슈퍼마켓",
    "편의점",
    "전통시장",
    "농축수산물",
    "건강식품",
    "의류",
    "패션잡화",
    "생활잡화",
    "가전제품",
    "서적/문구",
    "애완용품",
  ],
  생활서비스: [
    "미용실",
    "네일숍",
    "피부관리",
    "세탁소",
    "수선/수리",
    "사진관",
    "예식/행사",
    "인테리어",
  ],
  교육: [
    "입시/보습학원",
    "외국어학원",
    "예체능학원",
    "컴퓨터/IT교육",
    "평생교육",
  ],
  숙박: ["호텔", "모텔", "게스트하우스", "펜션/민박"],
  "오락/여가": [
    "PC방",
    "노래방",
    "게임방",
    "스크린골프",
    "당구장",
    "헬스/요가/필라테스",
  ],
  "의료/건강": ["약국", "한의원", "병원", "안경점", "헬스용품"],
  "운송/자동차": ["주유소", "세차장", "자동차수리", "렌터카"],
  "제조/생산": ["식품제조", "의류제조", "가구제조", "인쇄/출판"],
  기타: ["부동산중개", "여행사", "종교단체", "비영리단체"],
};

function CoworkMap({ onStoreClick }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [categoryBig, setCategoryBig] = useState(""); // 대분류 초기값: 빈 문자열
  const [categorySub, setCategorySub] = useState(""); // 소분류 초기값: 빈 문자열
  const [keyword, setKeyword] = useState(""); // 검색어
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);

  useEffect(() => {
    const key = import.meta.env.VITE_REACT_APP_KAKAO_API_KEY;
    if (!key) {
      console.error("Kakao Map Key is undefined! Check your .env file.");
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.kakao) {
        console.error("Kakao object not found after SDK load!");
        return;
      }

      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 4,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };
  const getDistance = (lat1, lng1, lat2, lng2) => {
    return Math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2);
  };

  const handleSearch = () => {
    if (!map || !window.kakao) return;

    const ps = new window.kakao.maps.services.Places();
    const donggukLat = 37.5665;
    const donggukLng = 126.978;

    const callback = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let result = data;

        if (categorySub && categorySub !== "전체") {
          result = result.filter((place) =>
            place.place_name.includes(categorySub)
          );
        }
        result.sort(
          (a, b) =>
            getDistance(donggukLat, donggukLng, a.y, a.x) -
            getDistance(donggukLat, donggukLng, b.y, b.x)
        );
        result = result.slice(0, 8);

        if (result.length === 0) {
          alert("검색 결과가 없습니다.");
          return;
        }

        clearMarkers();

        const newMarkers = result.map((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
          });
          return marker;
        });

        markersRef.current = newMarkers;
        setPlaces(result);

        const first = result[0];
        map.setCenter(new window.kakao.maps.LatLng(first.y, first.x));
      }
    };

    if (keyword.trim() !== "") {
      ps.keywordSearch(keyword, callback, { useMapBounds: true });
    } else {
      ps.categorySearch(category, callback, { useMapBounds: true });
    }
  };
  if (categorySub) {
    result = result.filter((place) => place.place_name.includes(categorySub));
  }
  const moveToPlace = (place) => {
    if (!map) return;
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(position);

    clearMarkers();
    const marker = new window.kakao.maps.Marker({ map: map, position });
    markersRef.current = [marker];
  };

  return (
    <Container>
      <MapBox ref={mapRef} />
      <RightPanel>
        <Controls>
          <InputWrapper>
            <Input
              type="text"
              placeholder="찾으시는 가게명을 입력해주세요 (예: 스타벅스)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && keyword.trim() !== "") {
                  handleSearch();
                }
              }}
            />
            <SearchButton
              onClick={keyword.trim() !== "" ? handleSearch : undefined}
              $active={keyword.trim() !== ""}
            >
              검색
            </SearchButton>
          </InputWrapper>

          <Title>업종</Title>
          <SelectWrapper>
            <Select
              value={categoryBig}
              onChange={(e) => {
                setCategoryBig(e.target.value);
                setCategorySub(""); // 소분류 초기화
                handleSearch(); // 선택 바뀌면 검색
              }}
            >
              <option value="" disabled>
                대분류를 선택하세요
              </option>
              <option value="음식">음식점</option>
              <option value="소매">소매</option>
              <option value="생활서비스">생활서비스</option>
              <option value="교육">교육</option>
              <option value="숙박">숙박</option>
              <option value="오락/여가">오락/여가</option>
              <option value="의료/건강">의료/건강</option>
              <option value="운송/자동차">운송/자동차</option>
              <option value="제조/생산">제조/생산</option>
              <option value="기타">기타</option>
            </Select>

<Select
  value={categorySub}
  onChange={(e) => {
    setCategorySub(e.target.value);
    handleSearch(); // 소분류 선택 시 검색
  }}
  disabled={!categoryBig} // 대분류 선택 전에는 비활성화
>
  <option value="" disabled>
    소분류를 선택하세요
  </option>
  {categoryBig &&
    subCategoryOptions[categoryBig]?.map((sub, idx) => (
      <option key={idx} value={sub}>
        {sub}
      </option>
    ))}
</Select>

          </SelectWrapper>
        </Controls>

        <ButtonsBox>
          {places.map((place, idx) => (
            <StoreBtn
              key={idx}
              storeName={place.place_name}
              onClick={() => {
                moveToPlace(place);
                onStoreClick && onStoreClick(place);
              }} // 클릭 시 지도 중심 이동
            />
          ))}
        </ButtonsBox>
      </RightPanel>
    </Container>
  );
}

export default CoworkMap;
