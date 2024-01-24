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
  const pageRef = useRef(null);

  const handleSaveClick = () => {
    if (pageRef.current) {
      html2canvas(pageRef.current, {
        width: pageRef.current.offsetWidth,
        height: pageRef.current.offsetHeight,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "page_screenshot.jpeg";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }, "image/jpeg");
      });
    }
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
    <div className="resultPage" ref={pageRef}>
      {!isImgLoaded && <LoadingPage />}
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
          onClick={() => handleCopyClipBoard(`${baseUrl}`)}
        >
          공유링크
        </button>
        <button className="retry-btn" onClick={handleSaveClick}>
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
