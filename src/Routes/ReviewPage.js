import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ReviewData from "./Reviewdata";
import Modal from 'react-bootstrap/Modal';
import { useNavigate} from "react-router-dom";
function ReviewPage(props) {
  let [Reviewdata] = useState(ReviewData);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  return (
    <div>
     <h3>ReviewPage</h3> 
      
      
      {Reviewdata.map(function (RD, id) {
      
           return(
           
           <div key={id}>
           <p>구매자:{RD.customer}</p>
           <p>상품평:{RD.level}</p>
           <p>별점:{RD.star}</p><br/><br/>
           </div>)
             
          })}
    <Button onClick={handleShow}>+리뷰등록</Button>
  
    <Modal show={show} onHide={handleClose}>
    <Modal.Header>
        <Modal.Title>리뷰</Modal.Title>
    </Modal.Header>
    <Modal.Body>리뷰를 등록해주세요!</Modal.Body>
    <div class="mb-3">
            <label>Review</label>
            <input type="review" class="form-control"/>
      </div>
    <Modal.Footer>
    <Button variant="outlined">
          등록
    </Button>
    <Button variant="outlined" onClick={handleClose}>
           취소
    </Button>
       
    </Modal.Footer>
</Modal>

    </div>
  );
}

export default ReviewPage;