import React from "react";
import "../styles/LodingPage.css";

function LodingPage() {
  // 이미지 정보를 담은 배열
  const images = [
    { src: "/images/icon/heart.webp" },
    { src: "/images/icon/heart.webp" },
    { src: "/images/icon/heart.webp" },
  ];

  return (
    <div className="LodingPage">
      <div className="content">
        {images.map((image, index) => (
          <img
            key={index}
            className="LodingHeart"
            src={image.src}
            alt="icon"
            loading="lazy"
          />
        ))}
      </div>
      <p>나의 유형을 알아보고 있어요!</p>
    </div>
  );
}

export default LodingPage;
