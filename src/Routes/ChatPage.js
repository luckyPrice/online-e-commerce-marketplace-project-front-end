import { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import {useStore1} from "./Stores/useStore";
import SockJS from 'sockjs-client';
import {useCookies} from "react-cookie";
import Stomp, {over} from "stompjs";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import './Chat.css'
import jwt_decode from "jwt-decode"
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import ScrollToBottom from 'react-scroll-to-bottom'

var client = null;
const ChatPage =() => {
    var count = 0;
    const [Chats, setChats] = useState(new Map());
    const {user, setUser} = useStore1();
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();
    
    const [message1, setMessage] = useState([]);
    let nickname = "";
    if(cookies.token){
      nickname = jwt_decode(cookies.token).sub;
    }
    
    const [searchParams, setSearchParams] = useSearchParams();
    
    const receiveuser = searchParams.get('receiveuser');
    const chattitle = searchParams.get('chattitle');
    const [userData, setuserData] = useState({
        senduser: nickname,
        receiveuser: receiveuser,
        chattitle : chattitle,
        message:"",
        date:"?"
    });

    useEffect(() => {
        
        if(!cookies.token){
            navigate('/');
        }
        else{
            nickname =jwt_decode(cookies.token).sub;
        }

        
        
            
            
                
                axios.post('http://localhost:8080/room/getmessage', userData)
                .then((response) =>{
                    setMessage(response.data);
                    console.log(response.data);
                })
                .catch((error) => {  
                })   

            start();

    },[]);

    const chatsavedb = () => {
        console.log(userData);
        axios.post('http://localhost:8080/room/create', userData)
        .then((response) =>{})
        .catch((error) => {})
    }
  
    const start = () => {
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
    const handleMessage =(event) =>{
        const {value} = event.target;
        setuserData({...userData, "message" : value});
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

    const onGo = () => {
        navigate('/MyChat');
    }
    
    

  
//추후에 함수로 뺄 예정
    return(
        <>
            <button onClick ={onGo}>myChat</button>
            <Load>
                <div class="container1">
                    <div class="chat_wr">
                        {message1 && [...message1].map((mes) => (
                            mes.senduser == nickname ? 
                            <div class="chat_row right">
                                <div class="chat_right chat">
                                {mes.message}

                            </div>
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
                        <Button type='button' onClick={sendMessage}>SEND</Button>
                    </div>
                </div>
            </Load>
        </>
    )
    }

    const Load = styled.div`
    
      bottom: 0;
      width: 100%;
      
     
    `;


export default ChatPage;