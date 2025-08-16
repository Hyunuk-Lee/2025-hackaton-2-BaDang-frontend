import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
  all: unset;                /* 기본 스타일 초기화 */
  box-sizing: border-box;    /* padding 포함 width/height 계산 */
  width: 100%;
  height: 100%;
  padding-left: 28px;        /* 텍스트 위치 조정 */
  font-size: 16px;
  line-height: 1.2;          /* 텍스트 수직 정렬 안정화 */
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
  background: ${(props) => (props.active ? "#759AFC" : "#9D9D9D")};
  color: #faf9f6;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
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

const ListBox = styled.div`
  width: 650px;
  height: 404px;
  overflow-y: auto;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  padding: 8px;
`;

const PlaceItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

// 카테고리별 소분류 옵션
const subCategoryOptions = {
  FD6: ["전체", "한식", "중식", "일식", "치킨", "분식"],
  CE7: ["전체", "스타벅스", "이디야", "투썸", "메가커피"],
  CS2: ["전체", "GS25", "CU", "세븐일레븐"],
  HP8: ["전체", "내과", "치과", "정형외과", "피부과"],
  BK9: ["전체", "국민은행", "신한은행", "우리은행", "하나은행"],
};

function CoworkMap() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [category, setCategory] = useState("FD6");
  const [subKeyword, setSubKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
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

  const handleSearch = () => {
    if (!map || !window.kakao) return;

    const ps = new window.kakao.maps.services.Places();

    const callback = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let result = data;

        if (subKeyword && subKeyword !== "전체") {
          result = result.filter((place) =>
            place.place_name.includes(subKeyword)
          );
        }

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
              active={keyword.trim() !== ""}
            >
              검색
            </SearchButton>
          </InputWrapper>

          <Title>업종</Title>
          <SelectWrapper>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubKeyword("");
                handleSearch();
              }}
            >
              <option value="FD6">음식점</option>
              <option value="CE7">카페</option>
              <option value="CS2">편의점</option>
              <option value="HP8">병원</option>
              <option value="BK9">은행</option>
            </Select>

            <Select
              value={subKeyword}
              onChange={(e) => {
                setSubKeyword(e.target.value);
                handleSearch();
              }}
            >
              {subCategoryOptions[category].map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </Select>
          </SelectWrapper>
        </Controls>

        <ListBox>
          {places.map((place, idx) => (
            <PlaceItem key={idx} onClick={() => moveToPlace(place)}>
              <b>{place.place_name}</b>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {place.road_address_name || place.address_name}
              </div>
            </PlaceItem>
          ))}
        </ListBox>
      </RightPanel>
    </Container>
  );
}

export default CoworkMap;
