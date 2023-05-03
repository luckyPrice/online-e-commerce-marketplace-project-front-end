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
import './Header.css'

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

        <StyledBtnWrapper>
        {/* <Link to="/UploadPage">글쓰기</Link>
        <Link to="/MyPage">마이 페이지</Link> */}
        {/* <Badge badgeContent={chatcount} color="primary">
    <Link to="/MyChat">대화창</Link>
      </Badge> */}
          
          <p className='nickname'>{nickname ? nickname : "Guest"} 님 환영합니다.</p> 
            <p> {login ? <button onClick={logOutHandler} className='button1'>로그아웃</button> : <button onClick={logInHandler} className='button1'>로그인</button>}</p>
            
            
        </StyledBtnWrapper>
        
        

      <Link to="/MainPage"><h1 className='logo'>중고 마켓</h1></Link>
    </StyledContainer>
     
) 
};



const StyledBtnWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledContainer = styled.div`
  position: relative;
  padding: 30px 0;
  height: 15vh;
`;

export default Header;