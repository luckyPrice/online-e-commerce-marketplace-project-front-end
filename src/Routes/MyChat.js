import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import './Chat.css'
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import styled from "styled-components";
import SockJS from 'sockjs-client';
import Stomp, {over} from "stompjs";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Header from "../Components/header/Header";
import Navbar from "../Components/navbar/Navbar";
import Grid from "@mui/material/Grid";

var client = null;
const MyChat = () =>{
    let nickname="";
    const [cookies, setCookies] = useCookies();
    const [mychat, setMychat] = useState([]);
    const navigate = useNavigate();
    const [message1, setMessage] = useState([]);
    const [currentuser, setCurrentuser] = useState(null);
    const [currenttitle, setCurrenttitle] = useState(null);
    const [Chats, setChats] = useState(new Map());  
    const [userData, setuserData] = useState({
        senduser: nickname,
        receiveuser: "",
        chattitle : "",
        message:"",
        date:"?"
    });
    const [layer, setLayer] = useState(null);
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
    

    useEffect(() => {
        const nicknamesend = {
            nickname : nickname
        }
        axios.post('http://localhost:8080/room/getchatroom', nicknamesend)
            .then((response) =>{
                setMychat(response.data);   
            })
            .catch((error) => {})
    },[]);

    const getMessage = (chatname, idx, e) => {
        console.log(chatname.nickname);
        console.log(idx);
        let chatData = {
        senduser: nickname,
        receiveuser: chatname.nickname,
        chattitle : chatname.chattitle,
        message:"",
        date:"?",
        type:"message"
        }
        axios.post('http://localhost:8080/room/getmessage', chatData)
                .then((response) =>{
                    setMessage(response.data);
                    console.log(response.data);
                })
                .catch((error) => {})   
            start();
    }

    const start = () => {
        setChats(new Map());
        let sock = new SockJS('http://localhost:8080/ws')
        client = over(sock);
        client.connect({}, () =>{client.subscribe("/private/message/" + nickname, onReceived);})
    }

    const onReceived = async (chat) => {
        let chatData = JSON.parse(chat.body)
        if(Chats.get(chatData.senduser)){
            await Chats.get(chatData.senduser).push(chatData);
            setChats(new Map(Chats));
        }
        else{
            let list = [];
            list.push(chatData);
            Chats.set(chatData.senduser, list);
            setChats(new Map(Chats));
        }
    }

    
    const resultchecking =   
        mychat.map((chatname, idx) => {
        return <><div className="chatRoom">
            <div onClick={(e) => {getMessage(chatname, idx, e)}}>
                 <PersonIcon fontSize="medium"></PersonIcon>{chatname.nickname}
                 <ChatInfo>
                 <ChatTitle>{chatname.chattitle} </ChatTitle>
                 <Checkcount><Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24}}>{chatname.notread}</Avatar></Checkcount>
                 </ChatInfo>
            </div>
            
        </div>
        
        </>
    })

    const handleMessage =(event) =>{
        const {value} = event.target;
        setuserData({...userData, "message" : value});
    }

    const chatsavedb = () => {
        console.log(userData);
        axios.post('http://localhost:8080/room/create', userData)
        .then((response) =>{})
        .catch((error) => {})
    }


    const sendMessage = () => {
        if(client){
            let ChatMessage={
                senduser : userData.senduser,
                receiveuser : userData.receiveuser,
                chattitle : userData.chattitle,
                message: userData.message,
                date: ""
            };
            if(userData.senduser !== userData.receiveuser){
                if(Chats.get(userData.receiveuser)){
                    Chats.get(userData.receiveuser).push(ChatMessage);
                setChats(new Map(Chats));
                }
                else{
                    let list = [];
                list.push(ChatMessage);
                Chats.set(userData.receiveuser, list);
                setChats(new Map(Chats));
                }
                
            }
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb();
            setuserData({...userData, "message" : ""})
        }
        else{
            console.log("error");
        }
    }
    

    return(
        <>
        <Grid padding="60px 0 0 0" max_width="950px" margin="0 auto">
      <Header />
      <Navbar />
            
                <ArrowBackIcon onClick={() => navigate('/MainPage')} />
            <ChatForm>
            <LeftForm>
            <Title><h2>전체 대화</h2></Title>
                {mychat && resultchecking}
            </LeftForm>
            <RightForm>
                
            <div class="container2">
                    <div class="chat_wr">
                        {message1 && [...message1].map((mes) => (
                            mes.senduser == nickname ? 
                            <div class="chat_row right">
                                {mes.type === "message" ? (
                                <div class="chat_right chat">
                                {mes.message}
                                 </div>)
                                 :
                                 (
                                <div class="chat_right_big chat">
                                {mes.message}
                                <Button variant="contained" onClick={() => navigate(`/TradePage?receiveuser=${mes.receiveuser}&chattitle=${mes.chattitle}`)}>주문 내역</Button>
                                 </div>)
                                }
                                
                            <div className="empty"></div>
                            </div>
                            :
                            <div class="chat_row left">
                            <div class="chat_left chat">
                                {mes.message}

                            </div>
                            <div className="empty"></div>
                            </div>    
                        ))}
                        {Chats.get(userData.receiveuser) && [...Chats.get(userData.receiveuser)].map((chat, index) => (
                            chat.senduser == nickname ? 
                            <div class="chat_row right">
                                <div class="chat_right chat">
                                {chat.message}
                            </div>
                            <div className="empty"></div>
                            </div>
                            :
                            <div class="chat_row left">
                            <div class="chat_left chat">
                                {chat.message}
                            </div>
                            <div className="empty"></div>
                            </div>
                        ))}
                    </div>
                    <div className ="chatbottom">
                        <TextField fullWidth type='text' value={userData.message}
                            onChange={handleMessage}/>
                       <Button variant="contained" onClick={sendMessage} endIcon={<SendIcon />}>Send</Button>
                    </div>
                </div>
            </RightForm>
            </ChatForm>
            </Grid>
        </>
    )


}

const Checkcount = styled.div`

position:relative;
display:flex;
margin-left: auto;

color: red;
text-align: right;
`;

const Title = styled.div`
text-align:center;
`;

const LeftForm = styled.div`

background-color:pink;
  width:450px;
  height: 500px;
  right:700px;
  overflow-y:scroll;
  
     
    `;

const ChatForm = styled.div`
    


margin-left : 350px;
border:solid;
    width:860px;
  height: 520px;
  display: flex;
  position:relative;
  flex-direction : row;
  flex-wrap : nowrap;
     
    `;

const RightForm = styled.div`
    


        

height: 100px;
width:350px;
      
     
    `;

const ChatTitle = styled.div`
display: fixed;
justify-content: flex-start;
font-size : 20px;
`;

const ChatInfo = styled.div`
display: fixed;
flex-direction : row;

`;


export default MyChat;


