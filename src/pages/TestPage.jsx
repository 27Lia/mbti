import "../styles/TestPage.css";
import { useNavigate } from "react-router-dom";
import questionData from "../data/questions.json";
import React, { useState } from "react";
import CryptoJS from "crypto-js";

function TestPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typeScores, setTypeScores] = useState({
    E: 0,
    N: 0,
    T: 0,
    J: 0,
    I: 0,
    S: 0,
    F: 0,
    P: 0,
  });

  const calculateMBTIType = () => {
    const type =
      (typeScores.E > typeScores.I ? "E" : "I") +
      (typeScores.N > typeScores.S ? "N" : "S") +
      (typeScores.T > typeScores.F ? "T" : "F") +
      (typeScores.J > typeScores.P ? "J" : "P");
    return type;
  };

  const handleOptionSelect = (type) => {
    setTypeScores((prevScores) => {
      return {
        ...prevScores,
        [type]: prevScores[type] + 1,
      };
    });

    if (currentIndex < questionData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const mbtiType = calculateMBTIType();
      const secretKey = process.env.REACT_APP_SECRET_KEY;
      const encryptedMbtiType = CryptoJS.AES.encrypt(
        mbtiType,
        secretKey
      ).toString();
      navigate(`/result?mbtiType=${encodeURIComponent(encryptedMbtiType)}`);
    }
  };
  const progressWidth = ((currentIndex + 1) / questionData.length) * 100;

  return (
    <div className="testPage">
      <div className="progressBar">
        <div
          className="progressInner"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <div className="testContent">
        <div className="qustionWrap">
          <img
            className="textWrap"
            src="/images/icon/question.webp"
            alt="logo_image"
          />
          <p className="qna">{questionData[currentIndex].question}</p>
        </div>
        <div className="mb-8">
          <div className="answerWrap">
            {questionData[currentIndex].options.map((option, index) => (
              <div
                className="answerbtn"
                key={index}
                onClick={() => handleOptionSelect(option.type)}
              >
                <p>{option.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
