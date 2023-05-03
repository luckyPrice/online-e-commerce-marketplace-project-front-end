import React from "react";
import "./Tiles2.css";
import { useInView } from "react-intersection-observer";
import buy from "./icon/buy-icon.png"
import sell from "./icon/sell.png"
import free from "./icon/free.png"
import { useNavigate } from "react-router-dom";
import {useStore2, useStore3, useStore4} from "../../../Routes/Stores/useStore";
import { Link } from 'react-router-dom';
const Tile2 = ({}) => {
  const {purpose, setPurpose} = useStore2();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  });

  const sellPurpose = () => {
    console.log(purpose);
    setPurpose("sell");
    console.log(purpose);
  }
  const purchasePurpose = () => {
    console.log(purpose);
    setPurpose("purchase");
    console.log(purpose);
  }
  const donatePurpose = () => {
    console.log(purpose);
    setPurpose("donate");
    console.log(purpose);
  }


  const navigate = useNavigate();


  return (
    <div className="c2">
    <div className="r2">

      <div className="i2">
        <input id="sell" type="radio" name="radio" onClick={sellPurpose}/>
        <div className="re2">
          
          <img src={sell} alt="sell" className="t2" />
          <label for="sell">판매</label>
        </div>
      </div>

      <div className="i2">
        <input id="buy" type="radio" name="radio" onClick={purchasePurpose}/>
        <div className="re2">
        <img src={buy} alt="buy" className="t2" />
          <label for="buy">구매</label>
        </div>
      </div>

      <div className="i2">
        <input id="free" type="radio" name="radio" onClick={donatePurpose}/>
        <div className="re2">
        <img src={free} alt="free" className="t2" />
          <label for="free">무료나눔</label>
        </div>
      </div>

    </div>
  </div>
  );
};

export default Tile2;
