import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiData from "../data/nctMembers.json";
import "../styles/ResultPage.css";
import LoadingPage from "./LoadingPage";
import html2canvas from "html2canvas";

function ResultPage() {
  const location = useLocation();
  const mbtiType = location.state?.mbtiType;
  const navigate = useNavigate();
  const mbtiInfo = mbtiData[mbtiType];
  const compatibleMember = mbtiInfo.compatibleTypes[0].description;
  const name = mbtiInfo.compatibleTypes[0].name;
  const baseUrl = "https://nctmbti.vercel.app";
  const memberImg = mbtiInfo.member[0].memberImg;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const resultPageRef = useRef();

  const handleSaveAsImage = async () => {
    const element = resultPageRef.current; // 현재 페이지의 DOM 요소
    const canvas = await html2canvas(element); // 해당 요소를 캔버스로 변환
    const image = canvas.toDataURL("image/png"); // 캔버스를 이미지(PNG 형식)로 변환
    const link = document.createElement("a"); // 새로운 링크(a 태그)를 생성
    link.href = image; // 링크의 href 속성을 이미지 URL로 설정
    link.download = "result-page.png"; // 다운로드될 때 기본 파일 이름 설정
    document.body.appendChild(link); // 생성한 링크를 body에 추가
    link.click(); // 링크를 클릭하면 이미지 다운로드 시작
    document.body.removeChild(link); // 사용이 끝난 링크를 body에서 제거
  };

  useEffect(() => {
    const imgElement = new Image();
    imgElement.src = memberImg;
    imgElement.onload = () => {
      setIsImgLoaded(true);
      setTimeout(() => {
        setIsImgLoaded(true);
      }, 3000);
    };

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
    <div className="resultPage" ref={resultPageRef}>
      {!isImgLoaded && <LoadingPage />}{" "}
      {isImgLoaded && mbtiType ? (
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
      <div className="btn-box">
        <button
          className="retry-btn"
          onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
        >
          공유링크
        </button>
        <button className="retry-btn" onClick={handleSaveAsImage}>
          저장
        </button>
        <button className="retry-btn" onClick={() => navigate("/")}>
          다시하기
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
