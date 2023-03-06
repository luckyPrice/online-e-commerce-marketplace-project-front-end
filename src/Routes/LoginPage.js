import React, { useEffect, useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useStore1} from "./Stores/useStore";
import jwt_decode from "jwt-decode"




export default function SignIn() {
    const navigate = useNavigate();
    const [requestResult, setRequestResult] = useState("");
    const [value, setValue] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useStore1();

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
                            
                            navigate('/mainPage');
                        


                        
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
            >
              로그인
            </Button>
            
              <Grid item>
                <Link href="/AuthCreatePage" variant="body2">
                  {"아이디가 없으신가요? 회원가입하기"}
                </Link>
              </Grid>
            </Box>
      </>      
  );
}