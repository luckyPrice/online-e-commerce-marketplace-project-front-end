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

var client = null;
const ChatPage =() => {
    var count = 0;
    const [Chats, setChats] = useState(new Map());
    const {user, setUser} = useStore1();
    const [userData, setuserData] = useState({
        senduser: "",
        receiveuser:"",
        message:"",
        date:"?"
    });
    const [message1, setMessage] = useState([]);
    var firstredirect = 1
    
    

    useEffect(() => {
        console.log(firstredirect);
        
            if(user.nickname == "jabin"){
                userData.senduser = "jabin"
                userData.receiveuser = "hi"
                
            }
            else if(user.nickname == "hi"){
                userData.senduser = "hi"
                userData.receiveuser = "jabin"
            }
            
                
                axios.post('http://localhost:8080/room/getmessage', userData)
                .then((response) =>{
                    setMessage(response.data);
                })
                .catch((error) => {  
                })   

            start();

    },[]);

    const chatsavedb = () => {
        
        axios.post('http://localhost:8080/room/create', userData)
        .then((response) =>{})
        .catch((error) => {})
    }
  
    const start = () => {
        let sock = new SockJS('http://localhost:8080/ws')
        client = over(sock);
        
        
        client.connect({}, () =>{client.subscribe("/private/message/" + user.nickname, onReceived);})

        
       
        
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
        
       
       
        <button onClick ={start}>start</button>
        <Box
            sx={{
                marginTop: 14,
                width: '100%',
                height: 300,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
        >
        <Load>
            
                {message1 && [...message1].map((mes) => (
                    mes.senduser == user.nickname ? 
                    <div className="messageBox">
                        <p className="justifyEnd">
                        {mes.message}

                    </p>
                    </div>
                    :
                    <div className="messageBox">
                    <p className="justifyStart">
                        {mes.message}

                    </p>
                    </div>
                    
                ))}
                
            
                {Chats.get(userData.receiveuser) && [...Chats.get(userData.receiveuser)].map((chat, index) => (
                    chat.senduser == user.nickname ? 
                    <div className="messageBox">
                    <p key={index} className="justifyEnd">
                        {chat.message}
                    </p>
                    </div>
                    :
                    <div className="messageBox">
                    <p key={index} className="justifyStart">
                        {chat.message}
                    </p>
                    </div>
                ))}
            
        
        
        
            <TextField fullWidth type='text' value={userData.message}
            onChange={handleMessage}/>
            <Button type='button' onClick={sendMessage}>SEND</Button>
            </Load>
            </Box>
        </>
    )
    }

    const Load = styled.div`
    position: absolute;
      bottom: 0;
      width: 70%;
    `;

    const Sendchat = styled.div`
    position: absoulte;
    bottom: 0;
    `;


export default ChatPage;