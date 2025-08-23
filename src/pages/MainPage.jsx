// pages/MainPage.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Advertisement from "../components/MainC/Advertisement";
import BigCards from "../components/MainC/BigCards";
import SmallCards from "../components/MainC/SmallCards";

const Page = styled.div`
  margin: auto;
  display: flex;
  width: 1200px;
  flex-direction: column;
  height: 1238px;
  min-height: 100vh;
  align-items: flex-start;
`;

const HelloText = styled.div`
  width: 751px;
  height: 150px;
  margin: 48px auto;
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 60px;
`;

const Orange = styled.span`
  color: #ff9762;
`;

const Blue = styled.span`
  color: #759afc;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
  height: 418px;
`;

function MainPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(`${backendUrl}/main/me`, {
          withCredentials: true, // 쿠키 기반 인증일 경우 필요
        });
            console.log("me response:", response.data); // <- 여기 추가

        setUsername(response.data.username); // me 안의 ownerName 사용
      } catch (error) {
        console.error("Failed to fetch me:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [backendUrl]);

  if (loading) return <Page>Loading...</Page>;

  return (
    <Page>
      <HelloText>
        안녕하세요 {username} <Blue>사장님</Blue> <br />
        리뷰를 <Orange>분석</Orange>하고 이번주 <Orange>보고서</Orange>를
        확인해보세요!
      </HelloText>
      <CardWrapper>
        <BigCards />
        <Advertisement />
        <SmallCards />
      </CardWrapper>
    </Page>
  );
}

export default MainPage;
