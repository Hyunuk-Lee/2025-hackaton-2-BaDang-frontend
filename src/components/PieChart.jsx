// components/PieChart.jsx
import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
width: 334px;
height: 334px;
`;

const SVG = styled.svg`
  transform: rotate(-90deg);
`;

const DonutSegment = styled.circle`
  fill: none;
  stroke-width: 40;
  stroke: ${props => props.color};
  stroke-dasharray: ${props => props.dashArray};
  stroke-dashoffset: ${props => props.dashOffset};
  transition: all 0.5s ease;
`;

function PieChart({ positive = 50, neutral = 30, negative = 20 }) {
  const size = 200;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  
  const total = positive + neutral + negative;
  const positivePercent = (positive / total) * 100;
  const neutralPercent = (neutral / total) * 100;
  const negativePercent = (negative / total) * 100;
  
  const positiveDash = (positivePercent / 100) * circumference;
  const neutralDash = (neutralPercent / 100) * circumference;
  const negativeDash = (negativePercent / 100) * circumference;
  
  const positiveOffset = 0;
  const neutralOffset = -positiveDash;
  const negativeOffset = -(positiveDash + neutralDash);

  return (
    <ChartContainer>
      <SVG width={size} height={size}>
        <DonutSegment
          cx={size / 2}
          cy={size / 2}
          r={radius}
          color="#0046FF"
          dashArray={`${positiveDash} ${circumference}`}
          dashOffset={positiveOffset}
        />
        <DonutSegment
          cx={size / 2}
          cy={size / 2}
          r={radius}
          color="#17171B"
          dashArray={`${neutralDash} ${circumference}`}
          dashOffset={neutralOffset}
        />
        <DonutSegment
          cx={size / 2}
          cy={size / 2}
          r={radius}
          color="#FF8040"
          dashArray={`${negativeDash} ${circumference}`}
          dashOffset={negativeOffset}
        />
      </SVG>
    </ChartContainer>
  );
}

export default PieChart;