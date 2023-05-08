import React from "react";
import "./Tiles.css";
import { useInView } from "react-intersection-observer";
import chat from "./icon/chat.png"
import money from "./icon/money.png"
import mypage from "./icon/mypage.png"
import post from "./icon/note.png"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Tile = ({}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  });

  const navigate = useNavigate();


  return (
    <div className="c">
    <div className="radio-tile-group">

      <div className="input-container">
        <input id="post" type="radio" name="radio" onClick={() => navigate("/UploadPage")}/>
        <div className="radio-tile">
        <img src={post} alt="buy" className="tile__image" />
          <label for="post">새글</label>
        </div>
      </div>

      <div className="input-container">
        <input id="bike" type="radio" name="radio" onClick={() => navigate("/MyPage")}/>
        <div className="radio-tile">
        <img src={mypage} alt="MyPage" className="tile__image" />
          <label for="MyPage">마이페이지</label>
        </div>
      </div>

      <div className="input-container">
        <input id="car" type="radio" name="radio" onClick={() => navigate("/MyChat")}/>
        <div className="radio-tile">
        <img src={chat} alt="chat" className="tile__image" />
          <label for="chat">채팅</label>
        </div>
      </div>

      <div className="input-container">
        <input id="fly" type="radio" name="radio" onClick={() => navigate("/CashPage")}/>
        <div className="radio-tile">
        <img src={money} alt="charge" className="tile__image" />
          <label for="charge">충전</label>
        </div>
      </div>

    </div>
  </div>
  );
};

export default Tile;
