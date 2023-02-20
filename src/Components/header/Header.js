import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import {useStore1} from "../../Routes/Stores/useStore";

const Header = (props) => {
    const [cookies, setCookies] = useCookies();
    const {user, removeUser} = useStore1();
    const navigate = useNavigate();

    useEffect(() => {
        const token = cookies.token;
        
    },[])

    const logOutHandler = () => {
        setCookies('token', '', {expires: new Date()});
        removeUser();
        navigate('/');
    }



  return (
    <StyledContainer>
      <StyledBtnContainer>
        <StyledBtnWrapper>
          <Link to="/ChatPage">마이페이지</Link>
          <button onClick={logOutHandler}>로그아웃</button>
        </StyledBtnWrapper>
        <p>{user ? user.nickname : "Guest"} 님 환영합니다.</p>
      </StyledBtnContainer>
      <h1>중고 마켓</h1>
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