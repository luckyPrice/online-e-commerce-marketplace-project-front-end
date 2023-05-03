import React from "react";
import "./Hero.css";
import "../../static/fonts/font.css";
import { useNavigate } from "react-router-dom";

const Hero = ({ imageSrc }) => {

  const navigate = useNavigate();
  return (

    <div className="hero">
      <img src={imageSrc} alt="Travel" className="hero__image" />
    <h1 className="animate-charcter">바쁜 현대인을 위한 최고의 거래사이트</h1>

    <button className="start_button" onClick={() => navigate("/MainPage")}>시작하기</button>
    </div>
  );
};

export default Hero;
