import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import {useStore1} from "../../Routes/Stores/useStore";
import jwt_decode from "jwt-decode"
import Badge from '@mui/material/Badge';
import axios from "axios"
import MailIcon from '@mui/icons-material/Mail';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Header = (props) => {
    const [cookies, setCookies] = useCookies();
    const {user, removeUser} = useStore1();
    let login = false;
    const navigate = useNavigate();
    const [chatcount, setCount] = useState(null);
    let nickname = "";
    if(cookies.token){
      login = true;
      nickname = jwt_decode(cookies.token).sub;
    }
    
        

    const logOutHandler = () => {
        setCookies('token', '', {expires: new Date()});
        removeUser();
        login = false;
    }

    const logInHandler = () => {
        
        navigate('/LoginPage');
    }

    useEffect(() => {
      

    
      


      if(!cookies.token){
        //alert('로그인해주세요');
          //navigate('/');
      }
      else{
        console.log(nickname)
        const nick = {
          nickname:nickname
        }
        axios.post('http://localhost:8080/room/chatcount', nick)
        .then((response) =>{
          setCount(response.data);
      })
      .catch((error) => {}) 
      }
      
    
              
             

  },[chatcount]);

 
    



  return (
    
    <StyledContainer>
      <StyledBtnContainer>
        <StyledBtnWrapper>
        <Link to="/UploadPage">글쓰기</Link>
        <Link to="/MyPage">마이 페이지</Link>
        <Badge badgeContent={chatcount} color="primary">
    <Link to="/MyChat">대화창</Link>
      </Badge>
          
            {login ? <button onClick={logOutHandler}>로그아웃</button> : <button onClick={logInHandler}>로그인</button>}
            
            
          

        
        </StyledBtnWrapper>
        <p>{nickname ? nickname : "Guest"} 님 환영합니다.<MonetizationOnIcon onClick={() => navigate('/CashPage')} /></p>
        
      </StyledBtnContainer>
      <Link to="/"><h1>중고 마켓</h1></Link>
    </StyledContainer>
     
) 
};

const StyledBtnContainer = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  a,
  button {
    display: inline-block;
    padding: 6px 8px;
    border: 1px solid #141414;
    border-radius: 6px;
    color: #141414;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
  }
  a:hover,
  button:hover {
    background-color: #141414;
    color: #fff;
  }
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledContainer = styled.div`
  position: relative;
  padding: 30px 0;
  h1 {
    display: flex;
    justify-content: center;
    color: #141414;
    font-weight: bold;
  }
`;

export default Header;