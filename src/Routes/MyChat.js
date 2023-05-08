import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate , useSearchParams } from "react-router-dom";
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
import Loading from '../Components/Loading';
import LoadingButton from '@mui/lab/LoadingButton';
import moment from 'moment';
import 'moment/locale/ko';


var client = null;
var i = 0;
const MyChat = () =>{
    let nickname="";
    const [searchParams, setSearchParams] = useSearchParams();
    const [cookies, setCookies] = useCookies();
    const [mychat, setMychat] = useState([]);
    const navigate = useNavigate();
    const [message1, setMessage] = useState([]);
    const [send, setSend] = useState(false);
    const [Chats, setChats] = useState(new Map());  
    var receiveuser = null;
    var chattitle = null;
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
    if(searchParams){
        
        receiveuser = searchParams.get('receiveuser');
        chattitle = searchParams.get('chattitle');
    }
    const [userData, setuserData] = useState({
        senduser: nickname,
        receiveuser: receiveuser,
        chattitle : chattitle,
        message:"",
        date:"?",
        type:"message"
    });
    const [load, setLoad] = useState(true);
    
    
    
    
    
    
      useEffect(() => {
        console.log(i);
        if(!cookies.token){
            navigate('/MainPage');
        }
        else{
            nickname =jwt_decode(cookies.token).sub;
        }
        if(i == 0){
            console.log(userData);
            console.log("input");
            i++;
            axios.post('http://localhost:8080/room/getmessage', userData)
            .then((response) =>{
                setMessage(response.data);
                console.log(response.data);
            })
            .catch((error) => {})   
            start(); 
        }
            
    },[]);


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
        setLoad(false);
        console.log(chatname.nickname);
        console.log(idx);
        console.log(userData);
        let chatData = {
        senduser: nickname,
        receiveuser: chatname.nickname,
        chattitle : chatname.chattitle,
        message:"",
        date:"?",
        type:"message"
        }
        setuserData({...userData, "receiveuser" : chatname.nickname, "chattitle" : chatname.chattitle, "senduser" : nickname});
       
        axios.post('http://localhost:8080/room/getmessage', chatData)
                .then((response) =>{
                    setMessage(response.data);
                    console.log(response.data);
                    setLoad(true);
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
        .then((response) =>{
            axios.post('http://localhost:8080/room/getmessage', userData)
                .then((response) =>{
                    setMessage(response.data);
                    console.log(response.data);
                    setLoad(true);
                })
                .catch((error) => {}) 
        })
        .catch((error) => {
            console.log("error");
        })
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
                
                console.log("1");
                }
                else{
                    let list = [];
                list.push(ChatMessage);
                Chats.set(userData.receiveuser, list);
                setChats(new Map(Chats));
                
                console.log("2");
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
            
                
            <ChatForm>
            <LeftForm>
            <Title><h2>전체 대화</h2></Title>
                {mychat && resultchecking}
            </LeftForm>
            <RightForm>
            <ChatBar><h3>현재 대화 : {userData && userData.chattitle}</h3></ChatBar>
            
            <div class="container2">
                    <div class="chat_wr">
                        
                    {load ?  
                    <>
                        {message1 && [...message1].map((mes, idx) => (
                            mes.senduser == nickname ? 
                            <>
                            {idx == 0 &&  "---" + mes.date.substring(0,10) + "---"}
                            {idx != 0 && (message1[idx-1].date.substring(0,10) != mes.date.substring(0,10) && "---" + mes.date.substring(0,10) + "---")}
                            
                                {mes.type === "message" ? (<>
                                <div class="chat_row right">
                                    <div>
                                    <br></br>
                                    <br></br>
                                    
                                <Date>{mes.date.slice(11)}</Date>
                                </div>
                                <div class="chat_right chat">
                                {mes.message}
                                 </div>
                                 
                            </div></>)
                                 :
                                 (
                                    <>
                                    
                                <div>
                                <div class="test">
                                <p>{mes.message}</p>{

                                    <Button variant="contained" onClick={() => navigate(`/DetailPayPage?buyer=${mes.senduser}&seller=${mes.receiveuser}&object=${mes.chattitle}`)}>주문 내역</Button>
                                }
                                
                                 </div>
                                 </div>
                                 </>)
                                }
                                </>
                            
                            :
                            <>
                            {idx == 0 &&  "---" + mes.date.substring(0,10) + "---"}
                            {idx != 0 && (message1[idx-1].date.substring(0,10) != mes.date.substring(0,10) && "---" + mes.date.substring(0,10) + "---")}
                                {mes.type === "message" ? (<>
                                <div class="chat_row left">
                                
                                <div class="chat_left chat">
                                {mes.message}
                                 </div>
                                 
                                 <div>
                                    <br></br>
                                    <br></br>
                                <Date>{mes.date.slice(11)}</Date>
                                </div>
                            </div></>)
                                 :
                                 (
                                    <>
                                <div>
                                <div class="test">
                                <p>{mes.message}</p>
                                {client &&
                                 <Button variant="contained" onClick={() => navigate(`/DetailPayPage?buyer=${mes.receiveuser}&seller=${mes.senduser}&object=${mes.chattitle}`)}>주문 내역</Button>
                                }
                                 </div>
                                 </div>
                                 </>)
                                }
                                </>    
                        ))}
                        
                        </>
                        :
                        <>
                <Loading />
                </>
                }
                    </div>
                    <div className ="chatbottom">
                        <TextField fullWidth type='text' value={userData.message}
                            onChange={handleMessage}/>
                       <LoadingButton variant="contained" onClick={sendMessage} loading={send}
                         loadingPosition="end" endIcon={<SendIcon />}>Send</LoadingButton>
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

const Date = styled.div`
display:flex;

font-size : 8px;
`

const LeftForm = styled.div`

background-color:pink;
  width:450px;
  height: 500px;
  right:700px;
  overflow-y:scroll;
  
     
    `;

    const ChatBar = styled.div`
    position:absolute;
  z-index: 1;
  background-color:skyblue;
  text-align:center;
  width:47.5%;
  height:20%;
  opacity: 0.5;
    `

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


