import React, { useEffect, useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useStore1, AuthCreate} from "./Stores/useStore";
import jwt_decode from "jwt-decode"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import video from '../static/back.mp4';
import './LoginPage.css'
import Modal from "./AuthCreatePage";




const LoginPage = () => {
  const [visibility, setVisibility] = useState(false);
    const navigate = useNavigate();
    const [requestResult, setRequestResult] = useState("");
    const [value, setValue] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useStore1();
    const {modal, setModal} = AuthCreate();
    const [boxs, setBoxs] = useState();
    //const [modal, setModal] = useState(false);

    const onClickmodal = (event) =>{
      setModal(true)
  };

  const onClickmodal_out = (event) =>{
    setModal(false)
};

    const onChange = (event) =>{
        const {target: {name, value}} = event;
        if(name === "id"){
            setId(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    useEffect(() => {
        if(user != null){
            console.log(user.userNickName);
        }
    },[])

    const logInHandler = () => {
        if(id.length === 0 || password.length === 0){
            alert('아이디와 비밀번호를 입력하세요.');
            return;
        }
       const data = {
            id : id,
            pwd : password
       }
            axios.post('http://localhost:8080/api/auth/signIn', data)
                    .then((response) =>{
                    console.log(response.data);
                    const responseData = response.data;
                        setRequestResult('Success!!');
                        
                        if(!responseData.result){
                            alert("아이디랑 비밀번호를 확인하세요.");
                            return;
                        }

                            
                            const {token, exprTime, user} = responseData.data;
                            const expires = new Date();
                            expires.setMilliseconds(expires.getMilliseconds + exprTime);

                            setCookies('token', token, {expires}, {path : '/'});
                            
                            
                            
                            console.log(token);
                            setUser(user);
                            
                            navigate(-1);
                        


                        
                    })
                    .catch((error) => {
                    console.log("no");
                    alert('로그인에 실패했습니다.');
                        setRequestResult('Failed!!');
                    })
            console.log(requestResult);
       };



  return (
    <>
    <div>
      

    <video src={video} autoPlay loop muted className="video"/>
    
    <div className="content1">
      <Box
            sx={{
              marginTop: 14,
              width: 300,
              height: 300,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
                      >
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                autoFocus
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={onChange}
              />
              
              <Button
              onClick={() => logInHandler()}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{width: 110, height: 50, backgroundColor: 'black', color: 'white', fontSize: '18px', fontWeight: 700}}
              >
                로그인
              </Button>
              
                <Grid item>
                  <Link onClick={() => onClickmodal()} variant="body2" style={{fontWeight: 800}}>
                    {"아이디가 없으신가요? 회원가입하기"}
                  </Link>
                </Grid>
              </Box>
            </div>
            
            <div className="content2">
            <StyledContainer>
            <Link to="/MainPage"><span className="content3">중고 마켓</span></Link>
            </StyledContainer>
            </div>

            {
              modal == true ? <Modal />: null
            }
            `{
              modal == true ? <div className="close_back"><div className="close" onClick={() => onClickmodal_out()}>X</div></div>: null
            }`





    
            
            
            </div>
      </>      
  );

  
}

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

export default LoginPage;