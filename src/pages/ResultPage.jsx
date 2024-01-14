import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const mbtiType = location.state?.mbtiType;
  const navigate = useNavigate();

  return (
    <div>
      {mbtiType ? (
        <h1>당신의 MBTI 유형은 {mbtiType}입니다.</h1>
      ) : (
        <p>MBTI 유형이 제공되지 않았습니다.</p>
      )}
      <button className="answerbtn" onClick={() => navigate("/")}>
        다시하기
      </button>
    </div>
  );
}

export default ResultPage;
