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
import { FaStar } from "react-icons/fa";
//import ReviewData from "./Reviewdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function MyPage(id) {
 const [cookies] = useCookies();
 const navigate = useNavigate();
  let [Product] = useState(Products);
  const [requestResult, setRequestResult] = useState("");
  const [inputData, setInputData] = useState([]);
  const [reviewData, setReviewData] = useState([]);


  let nickname = "";
  if (cookies.token) {
    nickname = jwt_decode(cookies.token).sub;
  }
  else{
    navigate("/");
  }

  const [favorData, setFavorData] = useState([]);

  const deleteListener = (id, e) => {
  
  

    const itemId = {
      itemid : id,
      currentuser : nickname
    }

    console.log(itemId)
    axios.post('http://localhost:8080/api/load/delete', itemId).then(
      window.location.replace('/')
    )
  }

  

  





  useEffect(() => {

    
    axios.get('http://localhost:8080/api/load/UploadShow')
                    .then((response) =>{
                      
                      console.log(response.data);
                      setInputData(response.data);
                      console.log(inputData)
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
                      
                      console.log(response.data);
                      setFavorData(response.data);
                      console.log(favorData)
                      setRequestResult('Success!!');
                    })
                    .catch((error) => {
                    console.log(error.message);
                    
                    setRequestResult('Failed!!');
                    })
                    const getreview = {
                      nickname : nickname
                    }
                    axios.post('http://localhost:8080/api/forum/getreview', getreview)
                    .then((response) =>{
  
                      setReviewData(response.data);
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
      <ArrowBackIcon onClick={() => navigate('/')} />
        <br />
        <br />
      <FontAwesomeIcon icon={faCircleUser} size="10x"/>
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
        <Obj onClick={() => navigate('/DetailPage/' + RD.itemid)} >{RD.title}
        <Icondiv><ArrowForwardIosIcon/></Icondiv>
        </Obj>
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
      <Tab eventKey="follower" title="팔로워">
      
      </Tab>
      <Tab eventKey="following" title="팔로잉">
      
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
`;

const Obj = styled.div`
display: flex;
border:solid 1px;
width:200px;
`;

const Icondiv = styled.div`
margin-left : 150px;

text-align: right;
`;

const Comment = styled.div`
margin-top : 10px;
`;

export default MyPage;