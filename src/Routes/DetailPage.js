import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from 'react-bootstrap/Alert';
import ReactDOM from "react-dom";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import {
  faHeart,
  faHeartCircleCheck,
  faComment,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode"
import {useCookies} from "react-cookie";

import Header from "../Components/header/Header";
import Navbar from "../Components/navbar/Navbar";

// /DetailPage/상품번호"로 접근하여 상품상세페이지를 보여줌


function DetailPage(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let nickname =""


  const [Heart, setHeart] = useState(false);
  const [cookies, setCookies] = useCookies();
  const handleHeart = () => {
    axios.post('http://localhost:8080/api/load/favor', favorsend)
    .then((response) =>{
                      console.log("ok");
                      setHeart(!Heart);
      
    })
    .catch((error) => {
    console.log(error.message);
    
    
    })
  };
  let { id } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.id == id;
  });

   if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }

  const [itemId, setitemId] = useState({
    itemid: id,
    currentuser : nickname
  });

  const [favorsend, Setfavorsend] = useState({
    nickname : nickname,
    itemid : id

});
  const [itemDetail, setitemDetail] = useState(null);
  const [purpose, setPurpose] = React.useState('Sell');

  const handleChange = (event) => {
        setPurpose(event.target.value);
      };

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/load/showDetail", itemId)
      .then((response) => {
        console.log("good");
        console.log(response.data);
        setitemDetail(response.data);
        setHeart(response.data.favorcheck);  
        console.log(itemDetail);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);



  return (
    <Grid padding="60px 0 0 0" max_width="950px" margin="0 auto">
      <Header />
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          gap: "50px",
        }}
      >
        <br />
        <br />
        <img src={itemDetail&&itemDetail.url} alt="items" position="absolute" width="500px" height="500px" />
        <br />

        <Grid is_flex="true">
          <h4 className="pt-5">상품명:{itemDetail && itemDetail.itemname}</h4>
          <br />
          <h5>판매자: {itemDetail && itemDetail.memberid}</h5>
          <br />
          <b>가격:{itemDetail && itemDetail.itemprice}</b>원<br />
       
          <Button variant="outlined" onClick={handleShow}>
            <FontAwesomeIcon icon={faCartShopping} />
            즉시 구매
          </Button>
          <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>장바구니에 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>장바구니로 이동하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="outlined" onClick={() => navigate("/Cart")}>
                       OK!
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                       아니요
                </Button>
                   
                </Modal.Footer>
            </Modal>
            
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/ChatPage?receiveuser=${itemDetail.memberid}&chattitle=${itemDetail.title}`
              )
            }
          >
            <FontAwesomeIcon icon={faComment} />
            채팅
          </Button>
          <Button>
            <FontAwesomeIcon
              onClick={handleHeart}
              icon={Heart ? faHeartCircleCheck : faHeart}
              style={{ color: "red" }}
            />
            찜
          </Button>
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={() => navigate("/SellerPage/" + setProduct.seller)}
          >
            <FontAwesomeIcon icon={faUser} />{" "}
            {itemDetail && itemDetail.memberid}님
          </Button>
        </Grid>
      </div>

      <b>상품설명:{itemDetail && itemDetail.maintext}</b>
    </Grid>
  );
}

export default DetailPage;