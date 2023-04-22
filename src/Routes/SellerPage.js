import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SellerData from "./Sellerdata";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShop} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa";
function SellerPage(props) {
  const navigate = useNavigate();
  let { seller } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.seller === seller;
  });
  const [inputData, setInputData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [requestResult, setRequestResult] = useState("");
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

                    const getreview = {
                      nickname : seller
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
          <br />
          <br />

         
        </div>
        <FontAwesomeIcon icon={faShop} size="10x"/>
        <h3>{seller}님의 상점</h3> <br />
        {SellerData.map(function (SD, k) {
          if (seller == SD.name) {
            return (
              <div className="col-md-6" key={k}>
                <li>
                  <b>상점오픈: {SD.opendate}일 전</b>
                </li>
                <li>
                  <b>방문자:{SD.visitor}</b>명<br />
                </li>
                <li>
                  <b>본인인증:{SD.verification}</b>
                  <br />
                </li>
                <li>
                  <b>거래 수:{SD.deal}회</b>
                  <br />
                </li>
              </div>
            );
          }
        })}
        <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="products" title="상품">
      {inputData.map(function (product, id) {
         const gotoDetail = () => {
          navigate('/DetailPage/' + product.itemid);
      }
           if (product.memberid == seller)
              return (        
              <div key={id} onClick={gotoDetail} >
              <img src={product.url} alt="items" position="absolute" width="300px" height="300px" />
              <p>판매자:{product.memberid}</p>
              <p>{product.itemprice}원</p>
     
              
              </div>
              )
              
          })}
      </Tab>
      <Tab eventKey="review" title="상점 후기">
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
      <Tab eventKey="follower" title="팔로워">
      
      </Tab>
      <Tab eventKey="following" title="팔로잉">
      
      </Tab>
    </Tabs>
      </div>
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

export default SellerPage;