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

export default function MyChat(){
    let nickname="";
    const [cookies, setCookies] = useCookies();
    const [mychat, setMychat] = useState([]);
    const navigate = useNavigate();


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

    
    const resultchecking =   
        mychat.map(chatname => {
        return <div className="chatRoom">
            <Link to={`/ChatPage?receiveuser=${chatname.nickname}&chattitle=${chatname.chattitle}`}>
            <p><PersonIcon fontSize="large"></PersonIcon>{chatname.nickname}</p>
                 <ChatTitle>{chatname.chattitle} </ChatTitle>
                 <Checkcount>{chatname.notread}</Checkcount>
            </Link>
        </div>
    })

    

    return(
        <>
            <h2>내 채팅목록</h2>
                <ArrowBackIcon onClick={() => navigate('/MainPage/all')} />
            <div>
                {mychat && resultchecking}
            </div>
        </>
    )


}

const Checkcount = styled.div`
display: flex;
justify-content: flex-end;
color: red;
`;

const ChatTitle = styled.div`
display: flex;
justify-content: flex-start;
font-size : 20px;
`;

