import React, { useEffect, useState} from "react";
import axios from "axios";
import {useStore1} from "./Stores/useStore";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import './Chat.css'
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MyChat(){
    const [cookies, setCookies] = useCookies();
    const [mychat, setMychat] = useState([]);
    const navigate = useNavigate();


    const nickname = jwt_decode(cookies.token).sub;
    

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
                유저 : {chatname.nickname}, 거래제목: {chatname.chattitle}
            </Link>
        </div>
    })

    

    return(
        <>
            <h2>내 채팅목록</h2>
                <ArrowBackIcon onClick={() => navigate('/MainPage')} />
            <div>
                {mychat && resultchecking}
            </div>
        </>
    )


}

