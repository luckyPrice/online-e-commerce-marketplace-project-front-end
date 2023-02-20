import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

// /DetailPage/상품번호"로 접근하여 상품상세페이지를 보여줌

function DetailPage(props) {
  const navigate = useNavigate();

  let { id } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.id == id;
  });

  const ImgUrl = "/images/img" + setProduct.id + ".jpg";

  return (
    <div className="container" >
        <div className="row">
        <div className="col-md-6">
      <br/><br/>
     
      <img src={ImgUrl} width="500px" height="500px"/>
      </div>
      <div className="col-md-6">
      <h4 className="pt-5">상품명:{setProduct.name}</h4><br/>
      <h5>판매자: {setProduct.seller}</h5><br/>
      <li><b>가격:{setProduct.price}</b>원<br/></li>
      <li><b>배송비:{setProduct.deliverycharge}</b><br/></li>
      <li><b>제품상태:{setProduct.condition}</b><br/></li>
      <li><b>상품설명:{setProduct.content}</b><br/></li>
    
      <Button
        variant="success"
        onClick={() => alert("선택하신 상품이 장바구니에 추가되었습니다!\n")}
      >
        장바구니
      </Button>
      <Button variant="info" onClick={() => navigate("/BuyPage")}>
        바로구매
      </Button>
      <Button variant="warning">찜</Button>
    </div>
    </div>
    </div>
  
  );
}

export default DetailPage;