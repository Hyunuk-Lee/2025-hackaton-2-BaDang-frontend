import styled from "styled-components";
import { useState, useEffect } from "react";
import NoReviewRobot from "../../assets/Icons/NoReviewRobotIcon.svg";

const Page = styled.div`
  position: relative; // Fade absolute의 기준
  margin: auto;
  width: 708px;
  height: 1024px; // Fade 겹침을 위한 높이
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
`;
const Icon=styled.div`
    
`
const Text = styled.div`
  width: 100%;
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 30px;
  font-weight: 700;
  line-height: 45px;
`;



function NoReview() {

  return (
    <Page>
        <Icon>
        <img src={NoReviewRobot} alt="로봇 이미지" />

        </Icon>
        <Text>해당 기간에는 리뷰가 없어 분석할 수 없어요<br/>손님들에게 리뷰를 부탁해보는 건 어떨까요?
        </Text>

   
    </Page>
  );
}

export default NoReview;  