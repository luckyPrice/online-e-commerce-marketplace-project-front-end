import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SellerData from "./Sellerdata";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShop} from "@fortawesome/free-solid-svg-icons";
function SellerPage(props) {
  const navigate = useNavigate();
  let { seller } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.seller === seller;
  });
  const [inputData, setInputData] = useState([]);
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

},[])

 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <br />
          <br />

         
        </div>
        <FontAwesomeIcon icon={faShop} size="10x"/>
        <h3>{setProduct.seller}님의 상점</h3> <br />
        {SellerData.map(function (SD, k) {
          if (setProduct.seller == SD.name) {
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
           if (setProduct.seller == product.memberid)
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

export default SellerPage;