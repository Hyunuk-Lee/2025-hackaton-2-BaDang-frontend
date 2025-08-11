import React, {useState} from 'react';
import TimeBtn from '../components/TimeBtn';
import styled from 'styled-components';

const TimeBtnWrapper=styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
`

function OnlineReviewPage() {
const [selectedRange, setSelectedRange] = useState("전체");
  return (
    <div>
      <TimeBtnWrapper>
        <TimeBtn
          range="전체"
          isActive={selectedRange === "전체"}
          onClick={() => setSelectedRange("전체")}
        />
        <TimeBtn
          range="한 달"
          isActive={selectedRange === "한 달"}
          onClick={() => setSelectedRange("한 달")}
        />
        <TimeBtn
          range="일주일"
          isActive={selectedRange === "일주일"}
          onClick={() => setSelectedRange("일주일")}
        />
      </TimeBtnWrapper>

    </div>
  );
}

export default OnlineReviewPage;
