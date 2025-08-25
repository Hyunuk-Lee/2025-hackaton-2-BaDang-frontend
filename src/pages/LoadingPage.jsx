import styled from "styled-components";
import { useState, useEffect } from "react";
import TypingRobot from "../assets/Icons/TypingRobotIcon.svg";
import RunningRobot from "../assets/Icons/RunningRobotIcon.svg";

const Page = styled.div`
  position: relative;
  margin: auto;
  width: 708px;
  height: 1024px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Text = styled.div`
  width: 100%;
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 30px;
  font-weight: 700;
  line-height: 45px;
`;

const Fade = styled.div`
  position: absolute;
  width: 507px;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const steps = [
  { img: RunningRobot, text: "바당이 분석에 필요한 정보를 모으고 있어요" },
  { img: TypingRobot, text: "바당이 사장님을 위한 분석을 진행 중이에요" },
];

function LoadingPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
      setRepeatCount((prev) => (prev + 1) % (steps.length * 5)); // 5번 반복
    }, 3000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  return (
    <Page>
      {steps.map((step, index) => (
        <Fade key={index} show={index === stepIndex}>
          <img src={step.img} alt="로봇 이미지" />
          <Text>{step.text}</Text>
        </Fade>
      ))}
    </Page>
  );
}

export default LoadingPage;
