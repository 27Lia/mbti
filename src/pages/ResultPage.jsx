import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiData from "../data/nctMembers.json";

function ResultPage() {
  const location = useLocation();
  const mbtiType = location.state?.mbtiType;
  const navigate = useNavigate();
  // 사용자의 mbti 데이터를 가져옴
  const mbtiInfo = mbtiData[mbtiType];

  // 사용자의 mbti 데이터에서 compatibleTypes을 추출
  const compatibleMemberTypes = mbtiInfo.compatibleTypes;

  // 추출한 compatibleMember를 mbtidata에서 찾아내어 추출
  const compatibleMembers = [];

  Object.keys(mbtiData).forEach((key) => {
    if (compatibleMemberTypes.includes(key)) {
      compatibleMembers.push(mbtiData[key]);
    }
  });
  const compatibleMember = compatibleMembers[0].member[0].description;

  return (
    <div>
      {mbtiType ? (
        <div>
          <h1>당신의 유형은 {mbtiInfo.member[0].member}입니다.</h1>
          <div>{mbtiInfo.member[0].description}</div>
          <h2>당신과 어울리는 NCT 멤버는 다음과 같습니다:</h2>
          {compatibleMember}
        </div>
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
