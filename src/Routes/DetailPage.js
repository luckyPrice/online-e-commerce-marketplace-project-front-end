import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

// /DetailPage/상품번호"로 접근하여 상품상세페이지를 보여줌

function DetailPage(props) {
  const navigate = useNavigate();

  let { id } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.id == id;
  });

  const [itemId, setitemId] = useState({
    itemid : id
});
  const [itemDetail, setitemDetail] = useState(null);
  
  useEffect(() => {
    axios.post('http://localhost:8080/api/load/showDetail', itemId)
    .then((response) =>{
                      
      console.log("good");    
      console.log(response.data); 
      setitemDetail(response.data); 
         
      console.log(itemDetail);     
      
    })
    .catch((error) => {
    console.log(error.message);
    
    
    })


  }, [])


  


  const ImgUrl = "/images/img" + setProduct.id + ".jpg";

  return (
    
    <div className="container" >
        <div className="row">
        <div className="col-md-6">
      <br/><br/>
     
      <img src={ImgUrl} width="500px" height="500px"/>
      <br/>
      <b>상품설명:{itemDetail && itemDetail.maintext}</b>
      </div>
      <div className="col-md-6">
      <h4 className="pt-5">상품명:{itemDetail && itemDetail.itemname}</h4><br/>
      <h5>판매자: {itemDetail && itemDetail.memberid}</h5><br/>
      <li><b>가격:{itemDetail && itemDetail.itemprice}</b>원<br/></li>
   
    
      <Button
        variant="success"
        onClick={() => alert("선택하신 상품이 장바구니에 추가되었습니다!\n")}
      >
        장바구니
      </Button>
      <Button variant="info" onClick={() => navigate(`/ChatPage?receiveuser=${itemDetail.memberid}&chattitle=${itemDetail.title}`)}>
        바로구매
      </Button>
      <Button variant="warning">찜</Button>
      <br/><br/>
      <Button onClick={() => navigate('/SellerPage/'+setProduct.seller)}><img src="/icon/person-circle.svg"/>판매자{setProduct.seller}</Button>
    </div>
    </div>
    </div>
    
  
  );
}

export default DetailPage;