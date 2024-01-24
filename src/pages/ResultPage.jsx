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

    // 버튼을 제외한 내용을 복제하여 이미지로 저장
    const clonedElement = element.cloneNode(true);
    const buttons = clonedElement.querySelectorAll(".btn-box");
    buttons.forEach((button) => {
      button.style.display = "none"; // 버튼 숨김
    });

    const canvas = await html2canvas(clonedElement, {
      useCORS: true, // 외부 이미지(CORS 정책) 문제 해결을 위해 추가
      windowWidth: clonedElement.scrollWidth,
      windowHeight: clonedElement.scrollHeight,
    }); // 클론된 요소를 캔버스로 변환
    const image = canvas.toDataURL("image/png"); // 캔버스를 이미지(PNG 형식)로 변환

    // 모바일 브라우저에서는 window.open을 사용하여 이미지를 새 탭에서 열기
    const newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${image}" style="width: 100%;" />`; // 새 탭에서 이미지를 표시
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
