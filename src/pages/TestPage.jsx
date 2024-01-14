import { useEffect } from "react";
import "../TestPage.css";
import questionData from "../data/questions.json";
import React, { useState } from "react";

function TestPage() {
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
  const [result, setResult] = useState("");

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
      setResult(`테스트 완료, 당신의 MBTI 유형은: ${mbtiType}`);
      console.log(mbtiType);
    }
  };
  return (
    <>
      <div className="progressBar">
        <div className="progressInner"></div>
      </div>
      <div className="testContent">
        <div className="qustionWrap">
          <img
            className="textWrap"
            src="/images/icon/Union.png"
            alt="logo image"
          />
          <p className="qna">{questionData[currentIndex].question}</p>
        </div>
        <div className="mb-8">
          <div className="answerWrap">
            {questionData[currentIndex].options.map((option, index) => (
              <button
                className="answerbtn"
                key={index}
                onClick={() => handleOptionSelect(option.type)}
              >
                {option.answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TestPage;
