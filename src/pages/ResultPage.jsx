import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiData from "../data/nctMembers.json";
import "../styles/ResultPage.css";
import LodingPage from "./LodingPage";

function ResultPage() {
  const location = useLocation();
  const mbtiType = location.state?.mbtiType;
  const navigate = useNavigate();
  const mbtiInfo = mbtiData[mbtiType];
  const compatibleMember = mbtiInfo.compatibleTypes[0].description;
  const name = mbtiInfo.compatibleTypes[0].name;
  const baseUrl = "https://mbti-one.vercel.app";
  const memberImg = mbtiInfo.member[0].memberImg;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // 이미지 로드 이벤트 리스너 등록
    const imgElement = new Image();
    imgElement.src = memberImg;
    imgElement.onload = () => {
      setIsImgLoaded(true);
      // After image loaded, wait for 5 seconds and then hide the loading page
      setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    };

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      imgElement.onload = null;
    };
  }, [memberImg]);

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="resultPage">
      {showLoading && <LodingPage />}
      {!showLoading && mbtiType ? (
        <div>
          <img
            key="loading-image"
            className="memberImg"
            src={memberImg}
            alt="멤버이미지"
            loading="lazy"
          ></img>

          <div className="resultText">
            <img
              className="heart"
              src="/images/icon/heart.webp"
              alt="하트이미지"
              loading="lazy"
            />
            <h1>
              당신의 유형은 <strong>{mbtiInfo.member[0].member} </strong>입니다.
            </h1>
            <br />
            <div>{mbtiInfo.member[0].description}</div>
            <br />
            <h2>
              당신과 어울리는 NCT 멤버는
              <br />
              <strong>{name}</strong>
              {compatibleMember}
            </h2>
          </div>
        </div>
      ) : (
        <p>MBTI 유형이 제공되지 않았습니다.</p>
      )}
      <br />
      <button
        className="retry-btn"
        onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
      >
        공유링크
      </button>
      <button className="retry-btn" onClick={() => navigate("/")}>
        다시하기
      </button>
    </div>
  );
}

export default ResultPage;
