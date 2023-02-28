import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Products from "./data";
import Item from "./Products";
import SellerData from "./Sellerdata";
import { Nav } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReviewPage from'./ReviewPage';


function SellerPage(props) {
  let [tab, setTab] = useState(0);

  let [Product] = useState(Products);
  let { seller } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.seller === seller;
  });
 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <br />
          <br />

          <img src="/icon/person-circle.svg" width="150px" height="150px" />
        </div>
        <h3>SellerPage {setProduct.seller}</h3> <br />
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
        <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link
              eventKey="link-0"
              onClick={() => {
                setTab(0);
              }}
            >
              상품
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                setTab(1);
              }}
            >
              리뷰
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab} />
      </div>
    </div>
  );
  function TabContent(props) {

    
    if (props.tab === 0) {
      return (
        
        <div className="pt-4"> 
       
        {Product.map(function (product, id) {
            if (product.seller == seller)
              return <Item product={Product[id]} i={id} key={id} />;
          })}</div>
         
       
      );
    } else if (props.tab === 1) {
      return <div><ReviewPage/></div>
    }
  }

}

export default SellerPage;