import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import SellerData from "./Sellerdata";
import Grid from "@mui/material/Grid";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Products from "./data";
import Item from "./Products";
import ReviewData from "./Reviewdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

function MyPage(props) {
 const [cookies] = useCookies();
  let [Product] = useState(Products);
  let [Reviewdata] = useState(ReviewData);
  const [requestResult, setRequestResult] = useState("");
  const [inputData, setInputData] = useState([]);

  let nickname = "";
  if (cookies.token) {
    nickname = jwt_decode(cookies.token).sub;
  }

  useEffect(() => {

    
    axios.get('http://localhost:8080/api/load/UploadShow')
                    .then((response) =>{
                      
                      
                      setInputData(response.data);
                      console.log(inputData)
                      setRequestResult('Success!!');
                    })
                    .catch((error) => {
                    console.log(error.message);
                    
                    setRequestResult('Failed!!');
                    })

},[])


  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <br />
        <br />
      <FontAwesomeIcon icon={faStore} size="10x"/>
      <br />
      <p>{nickname}님의 My Page 입니다.</p>
      </div>
      {SellerData.map(function (SD, k) {
        if (nickname == SD.name) {
          return (
            <Grid is_flex="true">
              <b>상점오픈: {SD.opendate}일 전</b>
              <br/>
              <b>방문자:{SD.visitor}</b>명<br/>
              <b>본인인증:{SD.verification}</b>
              <br />
              <b>거래 수:{SD.deal}회</b>
              <br/>
              </Grid>
          );
        }
      })}
       
    </div>
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="올린 상품">
      {inputData.map(function (product, id) {
            if (nickname == product.memberid)
              return ( 
              <div key={id}>
              <img src={product.url} alt="items" position="absolute" width="300px" height="300px" />
              <p>판매자:{product.memberid}</p>
              <p>{product.itemprice}원</p>
              </div>)
              else 
              return (<p>{nickname}님이 올린 상품이 없습니다.</p>)
          })}
      </Tab>
      <Tab eventKey="review" title="내가 쓴 리뷰">
      {Reviewdata.map(function (RD, id) {
      if (nickname == RD.customer)
      return(
      
      <div key={id}>
      <p>판매자:{RD.seller}</p>
      <p>상품평:{RD.level}</p>
      <p>별점:{RD.star}</p><br/><br/>
      </div>)
        
     })}
      </Tab>
      <Tab eventKey="heart" title="찜한 상품">
       
      </Tab>
      <Tab eventKey="follower" title="팔로워">
      
      </Tab>
      <Tab eventKey="following" title="팔로잉">
      
      </Tab>
    </Tabs>
  </div>

  );
  
}

export default MyPage;