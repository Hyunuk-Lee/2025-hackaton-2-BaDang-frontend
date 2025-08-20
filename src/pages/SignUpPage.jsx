// pages/SignUpPage.jsx
import React, { useState } from "react";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import SignUpStep4 from "./SignUpStep4";

export default function SignUpPage() {
  const [data, setData] = useState({});
  const [step, setStep] = useState(1);

  if (step === 1) {
    return (
      <SignUpStep1
        defaultValues={data}
        onNext={(d) => {
          setData((prev) => ({ ...prev, ...d }));
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <SignUpStep2
        defaultValues={data}
        onNext={(d) => {
          setData((prev) => ({ ...prev, ...d }));
          setStep(3);
        }}
      />
    );
  }

  if (step === 3) {
    return (
      <SignUpStep3
        defaultValues={data}
        onNext={(d) => {
          setData((prev) => ({ ...prev, ...d }));
          setStep(4);
        }}
      />
    );
  }

  if (step === 4) {
    return (
      <SignUpStep4
        defaultValues={data}
        onComplete={(d) => {
          // 필요하면 서버 전송 전에 모아둔 값 갱신
          setData((prev) => ({ ...prev, ...d }));
          // Step4 내부에서 navigate('/')를 이미 수행한다면 여기선 추가 작업 불필요
        }}
      />
    );
  }

  return null;
}
