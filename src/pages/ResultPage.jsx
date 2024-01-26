import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiData from "../data/nctMembers.json";
import "../styles/ResultPage.css";
import LoadingPage from "./LoadingPage";
import CryptoJS from "crypto-js";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const pageRef = useRef(null);

  const encryptedMbtiType = query.get("mbtiType");
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [mbtiType, setMbtiType] = useState("");
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const mbtiInfo = mbtiType ? mbtiData[mbtiType] : null;
  const compatibleMember = mbtiInfo?.compatibleTypes[0].description;
  const name = mbtiInfo?.compatibleTypes[0].name;
  const memberImg = mbtiInfo?.member[0].memberImg;
  const currentUrl = window.location.href;
  const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
  console.log(kakaoApiKey);
  useEffect(() => {
    if (encryptedMbtiType && secretKey) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedMbtiType, secretKey);
        const decryptedMbtiType = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedMbtiType) {
          throw new Error("복호화 실패");
        }
        setMbtiType(decryptedMbtiType);
      } catch (error) {
        console.error("복호화에 실패했습니다:", error);
      }
    }
  }, [encryptedMbtiType, secretKey]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "MBTI 결과 공유",
          text: "나와 NCT 멤버의 궁합 결과를 확인해보세요!",
        })
        .then(() => console.log("공유 성공!"))
        .catch((error) => console.log("공유에 실패했습니다", error));
    } else {
      alert("이 기능을 지원하지 않는 브라우저입니다.");
    }
  };

  const handleTwitterShare = () => {
    const tweetText = "나와 NCT 멤버의 궁합 결과를 확인해보세요!";
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleKakaoShare = async () => {
    if (window.Kakao) {
      window.Kakao.init(kakaoApiKey);
      try {
        await window.Kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title: "NCT MBTI TEST !",
            description: "나와 NCT 멤버의 궁합 결과를 확인해보세요!",
            imageUrl: window.location.origin + "/main_img.webp",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
          buttons: [
            {
              title: "결과 보러가기",
              link: {
                mobileWebUrl: currentUrl,
                webUrl: currentUrl,
              },
            },
          ],
        });
      } catch (error) {
        console.error("카카오 공유에 실패했습니다:", error);
      }
    } else {
      alert("카카오톡 앱이 설치되어 있지 않습니다.");
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
        <button onClick={handleTwitterShare}>
          <img
            className="btn-img"
            src="../images/icon/twitter.png"
            alt="카카오공유 버튼"
          />
        </button>
        <button onClick={handleKakaoShare}>
          <img
            className="btn-img"
            src="../images/icon/kakao.png"
            alt="트위터공유 버튼"
          />
        </button>
        <button onClick={handleShare}>
          <img
            className="btn-img"
            src="../images/icon/link.png"
            alt="공유링크 버튼"
          />
        </button>
        <button className="retry-btn" onClick={() => navigate("/")}>
          다시하기
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
