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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
var client = null;
const TradePage = () => {
    const [cookies, setCookies] = useCookies();
    const [seller, setSeller] = useState(true);
    const navigate = useNavigate();
    let nickname =""
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
      const [searchParams, setSearchParams] = useSearchParams();
    const receiveuser = searchParams.get('receiveuser');
    const chattitle = searchParams.get('chattitle');
    


    const [item, setItem] = useState({
        buyer : nickname,
        seller : receiveuser,
        object : chattitle
    })

    const [itemDetail, setitemDetail] = useState(null);

    useEffect(() => {
        console.log(item)
        axios
        .post("http://localhost:8080/api/order/orderget", item)
        .then((response) => {
        console.log(response.data);
        
        console.log(item);
      })
      .catch((error) => {
        console.log(error.message);
      });
      start();
    },[]);


    useEffect(() => {
        console.log(item)
        axios
        .post("http://localhost:8080/api/load/orderDetail", item)
        .then((response) => {
        console.log(response.data);
        console.log(response.data.memberid);
        if(response.data.memberid != nickname){
            setSeller(false);
        }
        setitemDetail(response.data);
        console.log(item);
      })
      .catch((error) => {
        console.log(error.message);
      });
    },[]);
    const BuyerAct = () => {
        axios.post('http://localhost:8080/order/finishBuyer', item)
                .then((response) =>{
                    
                })
                .catch((error) => {})
    }

    const SellerAct = () => {
        
        
        axios.post('http://localhost:8080/order/finishSeller', item)
                .then((response) =>{
                    
                })
                .catch((error) => {})
    }

    const chatsavedb = () => {
        if(itemDetail.memberid == nickname){
            // 판매자일 경우
            let ChatMessage={
                senduser : nickname,
                receiveuser : receiveuser,
                chattitle : chattitle,
                message: "물건이 전달되었습니다.",
                date: ""
            };
            console.log(ChatMessage);
            axios.post('http://localhost:8080/room/create', ChatMessage)
            .then((response) =>{})
            .catch((error) => {})
        }
        else{
            let ChatMessage={
                senduser : nickname,
                receiveuser : receiveuser,
                chattitle : chattitle,
                message: "물건을 전달받았습니다.",
                date: ""
            };
            console.log(ChatMessage);
            axios.post('http://localhost:8080/room/create', ChatMessage)
            .then((response) =>{})
            .catch((error) => {})
        }
        
    }

    const sendMessage = () => {
        console.log(client);
        if(client){
            if(itemDetail.memberid == nickname){
                // 판매자일 경우
                let ChatMessage={
                    senduser : nickname,
                    receiveuser : receiveuser,
                    chattitle : chattitle,
                    message: "물건이 전달되었습니다.",
                    date: ""
                };
                console.log(ChatMessage);
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb();
            }
            else{
                let ChatMessage={
                    senduser : nickname,
                    receiveuser : receiveuser,
                    chattitle : chattitle,
                    message: "물건을 전달받았습니다.",
                    date: ""
                };
                console.log(ChatMessage);
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb();
            }
            
            
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


    return(

        seller ? 
        <>
        <ArrowBackIcon onClick={() => navigate('/MainPage')} />
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
        
        <img src={itemDetail&&itemDetail.url} alt="items" width="150px" height="150px" />
        
        
        <Button type='button' onClick={SellerAct}>전달 완료</Button>
        </Box>
        </>
        :
        <>
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
        
        <img src={itemDetail&&itemDetail.url} alt="items" width="150px" height="150px" />
        
        
        <Button type='button' onClick={BuyerAct}>수령 완료</Button>
        </Box>
        
        </>
    );
}

const FormBox = styled.div`
border:solid;
height:100px;

`;

export default TradePage;