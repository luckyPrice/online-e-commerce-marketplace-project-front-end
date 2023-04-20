import React, { useEffect, useState} from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DaumPostcode from 'react-daum-postcode'; 
import DaumPostcodeEmbed from 'react-daum-postcode';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode"
import {useCookies} from "react-cookie";
import styled from "styled-components";
import SockJS from 'sockjs-client';
import Stomp, {over} from "stompjs";
import TradePage from "./TradePage.js";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Header from "../Components/header/Header";
import Navbar from "../Components/navbar/Navbar";
import Grid from "@mui/material/Grid";
var client = null;
const BuyPage = () => {
    
    let nickname =""
    const [click, setClick] = useState(true);
    const navigate = useNavigate();
    const [order, setOrder] = useState(true);
   
    
    let { id } = useParams();
    const [itemDetail, setitemDetail] = useState(null);
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState(null);
    const [cookies, setCookies] = useCookies();
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
      const [itemId, setitemId] = useState({
        itemid: id,
        currentuser : nickname
      });
    useEffect(() => {
        axios
          .post("http://localhost:8080/api/load/showDetail", itemId)
          .then((response) => {
            console.log("good");
            console.log(response.data);
            setitemDetail(response.data);
            
            console.log(itemDetail);
          })
          .catch((error) => {
            console.log(error.message);
          });
          let nick = {
            nickname : nickname
        }
          axios
          .post("http://localhost:8080/api/auth/getAuth", nick)
          .then((response) => {
            console.log(response.data);
            setUserData(response.data);
            
            
          })
          .catch((error) => {
            console.log(error.message);
          });
          
          start();
      }, []);

    const toggleOrder = () => {
        if(userData.cash > itemDetail.itemprice){
            let cashupdate = {
                nickname : itemDetail.memberid,
                cash : itemDetail.itemprice
            }
            axios
              .post("http://localhost:8080/api/auth/UpdateCash", cashupdate)
              .then((response) => {
                
                console.log(userData);
              })
              .catch((error) => {
                console.log(error.message);
              });
            let cashreduce = {
                nickname : nickname,
                cash : itemDetail.itemprice
            }
            axios
              .post("http://localhost:8080/api/auth/ReduceCash", cashreduce)
              .then((response) => {
                
                console.log(userData);
              })
              .catch((error) => {
                console.log(error.message);
              });
              let changestatus = {
                itemid : itemDetail.itemid,
                currentuser : "거래중" // 변수 이름만 currentuser
            }
            axios
              .post("http://localhost:8080/api/load/changeStatus", changestatus)
              .then((response) => {
                
                console.log(userData);
              })
              .catch((error) => {
                console.log(error.message);
              });
            setOrder(!order);
            sendMessage();
        }
        else{
            return alert('잔액이 부족해요');
        }
        
    }

    const chatsavedb = () => {
        let ChatMessage={
            senduser : nickname,
            receiveuser : itemDetail.memberid,
            chattitle : itemDetail.title,
            message: "물건이 판매되었습니다.",
            date: "",
            type:"trade"
        };
        axios.post('http://localhost:8080/room/create', ChatMessage)
        .then((response) =>{})
        .catch((error) => {})
    }

    const sendMessage = () => {
        console.log(client);
        if(client){
            let ChatMessage={
                senduser : nickname,
                receiveuser : itemDetail.memberid,
                chattitle : itemDetail.title,
                message: "물건이 판매되었습니다.",
                date: ""
            };
            console.log(ChatMessage);
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb();
            let orderinfo = {
                buyer: nickname,
                seller: itemDetail.memberid,
                object : itemDetail.itemname,
                price : itemDetail.itemprice,
                url : itemDetail.url,
                address : ""
            }
            console.log(orderinfo);
            axios.post("http://localhost:8080/api/order/ordercreate", orderinfo)
            .then((response) =>{})
            .catch((error) => {})
            
        }
        else{
            console.log("error");
        }
    }

    
    
    const start = () => { // 샀다는 알림을 보내기 위해
        let sock = new SockJS('http://localhost:8080/ws')
        client = over(sock);
        client.connect({}, () =>{client.subscribe("/private/message/" + nickname);});
        console.log("?")
        
    }

    const test = () =>{
        navigate(`/TradePage?receiveuser=${itemDetail.memberid}&chattitle=${itemDetail.itemname}`)
    }
    

return(
    order ? 
    <Grid padding="60px 0 0 0" max_width="950px" margin="0 auto">
      <Header />
      <Navbar />
    
    <Box
            sx={{
                marginTop: 14,
                width: 300,
                height: 300,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
        >
            <h3>주문자 입력</h3>
    <TextField fullWidth label = "이름" type="name" variant="standard" />
    <TextField fullWidth label = "주소" type="name" variant="standard" onChange={(event) => setAddress(event.target.value
            )}/>
    <Button type='button' onClick={() => navigate("/Address")}>배송지 검색</Button>

    <div>
        <p>결제 가격 : {itemDetail && itemDetail.itemprice}</p>
        <p>결제 후 금액 : {itemDetail && ( userData && userData.cash - itemDetail.itemprice)}</p>
    </div>
    <Button type='button' variant="outlined" onClick={toggleOrder}>주문</Button>
    
    </Box>
    </Grid> 
    :
    <>
    <Grid padding="60px 0 0 0" max_width="950px" margin="0 auto">
      <Header />
      <Navbar />
    <h2>주문이 완료되었습니다.</h2>
    <FormBox>
        <img src={itemDetail&&itemDetail.url} alt="items" width="50px" height="50px" />
        {itemDetail&& itemDetail.title}
        <Button type='button' variant="outlined" onClick={test}>주문상세</Button>
    </FormBox>
    </Grid> 
    </>
    
    
        
        
     
)

}

const FormBox = styled.div`
border:solid;
height:100px;

`;

export default BuyPage;