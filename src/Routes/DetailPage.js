import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Swal from "sweetalert2";
import {
  faHeart,
  faComment,
  faCartShopping,
  faUser,
  faCircleCheck,
  faMagnifyingGlass,
  faShop
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart, faSquarePlus} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode"
import { useCookies } from "react-cookie";
import Header from "../Components/header/Header";
import Navbar from "../Components/navbar/Navbar";
import Recommend from "../Components/Recommend";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DeleteIcon from '@mui/icons-material/Delete';


// /DetailPage/상품번호"로 접근하여 상품상세페이지를 보여줌


function DetailPage(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  

  let nickname = ""
  const [Follower, setFollower] = useState(false);
  const [Heart, setHeart] = useState(false);
  const [cookies, setCookies] = useCookies();
  const handleHeart = () => {
    axios.post('http://localhost:8080/api/load/favor', favorsend)
      .then((response) => {
        console.log("ok");
        setHeart(!Heart);

      })
      .catch((error) => {
        console.log(error.message);


      })
  };

  const handleFollwer = () => {

    setFollower(!Follower);

  };
  let { id } = useParams();
  let setProduct = props.Product.find(function (product) {
    return product.id == id;
  });

  if (cookies.token) {
    nickname = jwt_decode(cookies.token).sub;
  }

  const [itemId, setitemId] = useState({
    itemid: id,
    currentuser: nickname
  });

  const [favorsend, Setfavorsend] = useState({
    nickname: nickname,
    itemid: id

  });
  const [itemDetail, setitemDetail] = useState(null);

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

  const changeListener = (id, e) => {
  
  

    const itemId = {
      itemid : id,
      currentuser : nickname
    }

    console.log(itemId)
    axios.post('http://localhost:8080/api/load/delete', itemId).then(
      window.location.replace('/')
    )
  }

  const setStatus = () => {
    let changestatus = {
      itemid : itemDetail.itemid,
      currentuser : "판매 완료" // 변수 이름만 currentuser
  }
  console.log(itemDetail.itemid);
  axios
    .post("http://localhost:8080/api/load/changeStatus", changestatus)
    .then((response) => {
      
      
    })
    .catch((error) => {
      console.log(error.message);
    });
  }


  return (
    <Grid padding="0px 40px 40px 40px" max_width="950px" margin="0 auto">
      <Grid padding="0px 40px 40px 40px">
        <Header />
        <Navbar />
      </Grid>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          gap: "50px",
        }}
      >
        <Grid padding="0px 40px 40px 40px" >
        
        <h6> <FontAwesomeIcon icon={faMagnifyingGlass} size="2x"/> 
        마우스 휠을 스크롤하여 원하는 위치에서 이미지를 확대해 보세요!</h6>
          <TransformWrapper initialScale={1} minScale={1} maxScale={20} >
            <TransformComponent >
              <figure>
                <img src={itemDetail && itemDetail.url} alt="items" position="absolute" width="500px" height="500px" />
              </figure>
            </TransformComponent>
          </TransformWrapper>
          <br />
          <b>상품설명:{itemDetail && itemDetail.maintext}</b>
        </Grid>

        <Grid padding="0px 40px 40px 40px">
          <h4 className="pt-5">상품명:{itemDetail && itemDetail.itemname}</h4>
          <br />
          <h5>판매자: {itemDetail && itemDetail.memberid}</h5>
          <br />
          <b>가격:{itemDetail && itemDetail.itemprice}</b>원<br />
          { itemDetail &&(itemDetail.memberid !== nickname && itemDetail.status === "판매중" ? (
       <>
          
            
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/MyChat?receiveuser=${itemDetail.memberid}&chattitle=${itemDetail.title}`
              )
            }
          >
            <FontAwesomeIcon icon={faComment} />
            채팅
          </Button>
          <Button variant="outlined"
            onClick={() =>
              Swal.fire({
                title: itemDetail && itemDetail.itemname + " 구매하기",
                text: "다음 상품을 구매하시겠습니까??",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "결제 페이지로",
                cancelButtonText: "계속 쇼핑하기",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/PayPage/"+ id);
                }
              })
            }
          >
            바로 구매
          </Button>
          <Button >

            <FontAwesomeIcon size="2x"
              onClick={handleHeart}
              icon={Heart ? faHeart : emptyHeart}
              style={{ color: "red" }}
            />  찜
          </Button>
          </>
          
          )
          :
          <>
          {itemDetail.status === "판매중" && <Button variant="outlined" onClick={setStatus}>판매완료</Button>}
          {itemDetail.status === "판매중" && <Button variant="outlined" onClick={ (e) => {deleteListener(itemDetail.itemid, e)}} startIcon={<DeleteIcon />}>
             삭제
            </Button>}
            {itemDetail.status === "판매중" && <Button variant="outlined" onClick={ (e) => {changeListener(itemDetail.itemid, e)}} startIcon={<DeleteIcon />}>
             가격 수정
            </Button>}
          </>
           )}
           
          
          {itemDetail && (itemDetail.status === "판매 완료" && <h4>판매 완료된 상품입니다.</h4>)}
          <br />
          <br />

          <p>상점 정보</p>
          <Button
            variant="outlined"
            onClick={() => navigate("/SellerPage/" + itemDetail.memberid)}
          >
            <FontAwesomeIcon icon={faShop} />{" "}
            {itemDetail && itemDetail.memberid}님 상점 바로가기
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/SellerPage/" + itemDetail.memberid)}
          >상품 더 보기</Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/SellerPage/" + itemDetail.memberid)}
          >상점 후기</Button>
          <br />
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/ChatPage?receiveuser=${itemDetail.memberid}&chattitle=${itemDetail.title}`
              )
            }
          >

            <FontAwesomeIcon icon={faComment} />
            {itemDetail && itemDetail.memberid}님과 채팅하기
          </Button>
          <br />
          

        </Grid>
      </div>
      <Grid padding="0px 40px 40px 40px">
      {itemDetail && <Recommend id={id} category={itemDetail.category}/>}
      </Grid>
      <Grid padding="0px 40px 40px 40px">
        <h5>상품정보</h5>
        <b>#카테고리 : {itemDetail && itemDetail.category}</b><br />
        
        <br /><br />
      </Grid>
  


    </Grid>

  );

}

export default DetailPage;