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
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ListItemIcon from '@mui/material/ListItemIcon';

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
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };   

    const handleClose = () => {
      setAnchorEl(null);
    };

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

  const [alarm, setAlarm] = useState([]);

  useEffect(() => {
    if(!cookies.token){
      //alert('로그인해주세요');
        //navigate('/');
    }
    else{
      console.log(nickname);
    const nick = {
      nickname:nickname
    }
    axios.post('http://localhost:8080/room/getalarm', nick)
    .then((response) =>{
      console.log(response.data);
      setAlarm(response.data);
  })
  .catch((error) => {})
}
  },[]);
 
    



  return (
    
    <StyledContainer2>

        <StyledBtnWrapper>
        {/* <Link to="/UploadPage">글쓰기</Link>
        <Link to="/MyPage">마이 페이지</Link> */}
        {/* <Badge badgeContent={chatcount} color="primary">
    <Link to="/MyChat">대화창</Link>
      </Badge> */}
          
          <p className='nickname'>{nickname ? nickname : "Guest"} 님 환영합니다.</p> 
          <p className='notification'>
          <Badge badgeContent={chatcount ? chatcount : 0} color="primary">
          <NotificationsIcon
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          
          />
          </Badge>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

          {alarm && [...alarm].map((v, idx) => {
            return(
            <p>
            
            <ListItemIcon>
            <PriorityHighIcon fontSize="small" />
            
            {v.type === "message" ? (
            <>
            <MenuItem onClick={() => navigate(`/MyChat?receiveuser=${v.senduser}&chattitle=${v.chattitle}`)}><p>{v.senduser} 님이 채팅을 보냈습니다.</p><br></br>
            <p>내용 : {v.message}</p></MenuItem>
            </>)
            :
            (<>
          <MenuItem onClick={() => navigate(`/DetailPayPage?buyer=${v.senduser}&seller=${v.receiveuser}&object=${v.chattitle}`)}>거래현황 알림 :  {v.message}({v.senduser})</MenuItem>
          </>)
          }
            </ListItemIcon>
            </p>
            )
          })}


        
      </Menu>
          
          
          </p>
          <p> {login ? <button onClick={logOutHandler} className='button1'>로그아웃</button> : <button onClick={logInHandler} className='button1'>로그인</button>}</p>
            
            
        </StyledBtnWrapper>
        
        

      <Link to="/MainPage"><h1 className='logo'>중고 마켓</h1></Link>
    </StyledContainer2>
     
) 
};



const StyledBtnWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledContainer2 = styled.div`
  position: relative;
  padding: 30px 0;
  height: 15vh;
`;

export default Header;