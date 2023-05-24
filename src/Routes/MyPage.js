import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Products from "./data";
import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './MyPage.css'
import Item from "../Components/item/item";


function MyPage(id) {
 const [cookies] = useCookies();
 const navigate = useNavigate();
  let [Product] = useState(Products);
  const [requestResult, setRequestResult] = useState("");
  const [inputData, setInputData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [ordercount, setOrderCount] = useState(0);

  let nickname = "";
  if (cookies.token) {
    nickname = jwt_decode(cookies.token).sub;
  }
  else{
    navigate("/MainPage");
  }

  const [favorData, setFavorData] = useState([]);
  const [time, setTime] = useState(null);
  const deleteListener = (id, e) => {
  
  

    const itemId = {
      itemid : id,
      currentuser : nickname
    }

    console.log(itemId)
    axios.post('http://localhost:8080/api/load/delete', itemId).then(
      window.location.replace('/MainPage')
    )
  }

  

  





  useEffect(() => {

    
    axios.get('http://localhost:8080/api/load/UploadShow')
                    .then((response) =>{
                      
                      setInputData(response.data);
                      setRequestResult('Success!!');
                    })
                    .catch((error) => {
                    console.log(error.message);
                    
                    setRequestResult('Failed!!');
                    })

                    const itemId = {
                    itemid : 0,
                    nickname : nickname
                    }
                    axios.post('http://localhost:8080/api/load/favorRequest', itemId)
                    .then((response) =>{
                      setFavorData(response.data);
                      setRequestResult('Success!!');
                    })
                    .catch((error) => {
                    console.log(error.message);
                    setRequestResult('Failed!!');
                    })
                    const nick = {
                      nickname : nickname
                    }
                    axios.post('http://localhost:8080/api/forum/getreview', nick)
                    .then((response) =>{
                      setReviewData(response.data);
                      setRequestResult('Success!!');
                    })
                    .catch((error) => {
                    console.log(error.message);
                    setRequestResult('Failed!!');
                    })
                    axios.post('http://localhost:8080/api/auth/createAuthtime', nick)
                    .then((response) => {
                      setTime(response.data);
                    })
                    .catch((error) => {})
                      axios.post('http://localhost:8080/api/order/ordercount', nick)
                    .then((response) => {
                      setOrderCount(response.data);
                    })
                    .catch((error) => {})

},[])




  return (
    
    <div className="container">
    <div className="row">
      <div className="col-md-6">
      <ArrowBackIcon onClick={() => navigate('/MainPage')} />
        <br />
        <br />
      <FontAwesomeIcon icon={faCircleUser} size="10x"/>
      <br />
      <p>{nickname}님의 My Page 입니다.</p>
      <Button type="button" class="btn btn-link" onClick={() => navigate('/DealPage/' + nickname)}>
            나의 거래내역</Button>
      </div>
      
        
              <Grid is_flex="true">
              <b>가입일 : {time && time}일전</b>
              <br/>
              
              <b>거래 수: {ordercount}회</b>
              <br/>
              </Grid>
    </div>
    
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="올린 상품">
      {inputData.map(function (product, id) {
          const gotoDetail = () => {
            navigate('/DetailPage/' + product.itemid);
        }
        
            if (nickname == product.memberid)
              return ( 
                <div key={id} onClick={gotoDetail}>
              <img src={product.url} alt="items" position="absolute" width="300px" height="300px" />
              <p>판매자:{product.memberid}</p>
              <p>{product.itemprice}원</p>
              <Button variant="outlined" onClick={ (e) => {deleteListener(product.itemid, e)}} startIcon={<DeleteIcon />}>
             Delete
            </Button>
              
            
              
            </div>)
              
          })}
      </Tab>
      <Tab eventKey="review" title="내가 쓴 리뷰">
      {reviewData && reviewData.map(function (RD, id) {
      
      return(
      
      <div key={id}>
      <Form>
      <FontAwesomeIcon icon={faCircleUser} size="2x"/>
      <ProfileForm>{RD.target}
      
      <p>{Array(RD.star).fill(RD.star).map((_, index) => {
          return (
            <FaStar
              key={index}
              size={10}
              
              color="#FFBA5A"
              style={{
                marginRight: 1,
                cursor: "pointer"
              }}
            />

          )
        })}</p></ProfileForm></Form>
        <p><Obj onClick={() => navigate('/DetailPage/' + RD.itemid)} >{RD.title}
        <Icondiv><ArrowForwardIosIcon/></Icondiv>
        </Obj></p>
        <Comment>
        <p>상품평:{RD.comment}</p>
        </Comment>
        <br/><br/>
      
      </div>)
        
     })}
     
      </Tab>
      <Tab eventKey="heart" title="찜한 상품">
      {favorData.map(function (product, id) {
          const gotoDetail = () => {
                navigate('/DetailPage/' + product.itemid);
            }
            
              return ( 
              <div key={id} onClick={gotoDetail}>
              <img src={product.url} alt="items" position="absolute" width="300px" height="300px" />
              <p>판매자:{product.memberid}</p>
              <p>{product.itemprice}원</p>
              
          </div>)
              
          })}
      </Tab>
      
    </Tabs>
  </div>

  );
  
}

const Form = styled.div`
display: flex;
  flex-direction : row;
  flex-wrap : nowrap;
`;

const ProfileForm = styled.div`
margin-left : 20px;
display:flex;
`;

const Obj = styled.div`
display: flex;
border:solid 1px;
width:200px;

`;

const Icondiv = styled.div`
position:relative;
left:130px;
`;

const Comment = styled.div`
margin-top : 10px;
`;

const Upload = styled.div`
border:solid 1px;
border-radius: 2px 2px 2px 2px;
width:30%;
`

export default MyPage;