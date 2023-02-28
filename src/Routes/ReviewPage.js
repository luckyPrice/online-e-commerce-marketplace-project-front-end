import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ReviewData from "./Reviewdata";

import { useNavigate, useParams } from "react-router-dom";
function ReviewPag(props) {
  let [Reviewdata] = useState(ReviewData);
 
    const navigate = useNavigate();
  return (
    <div>
     <h3>ReviewPage</h3> 
      
      
      {Reviewdata.map(function (RD, id) {
      
           return(
           
           <div key={id}>
           <p>이름:{RD.name}</p>
           <p>상품평:{RD.level}</p>
           <p>별점:{RD.star}</p><br/><br/>
           </div>)
             
          })}
    <Button onClick={() => navigate('/ReviewAdd/')}>+리뷰등록</Button>
    </div>
  );
}

export default ReviewPag;