import React, { useEffect, useState} from "react";
import axios from "axios"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function AuthCreatePage(){
const [requestResult, setRequestResult] = useState("");
const [name, setName] = useState("");
const [id, setId] = useState("");
const [password, setPassword] = useState("");
const [passwordcheck, setPasswordCheck] = useState("");
const [nickname, setNickname] = useState("");
const [phonenumber, setPhonenumber] = useState("");
const [sex, setSex] = useState("");
const [address, setAddress] = useState("");
const navigate = useNavigate();



        // 임시(회원가입), jwt 토큰을 이용해 만들 예정입니다.
    const signUpHandler = () => {
    
    const data = {
        username : name,
        id : id,
        pwd : password,
        passwordcheck : passwordcheck,
        nickname: nickname,
        phonenumber : phonenumber,
        sex : sex,
        address : address
    }
        axios.post('http://localhost:8080/api/auth/signUp', data)
        .then((response) =>{
            console.log(response.data);
            setRequestResult('Success!!');
            if(!response.data.result){
                alert('다시 확인해주세요');
                return;
            }
            navigate('/');
        })
        .catch((error) => {
            setRequestResult('Failed!!');
            alert('다시 확인해주세요');
        })
    }

   
      

    return(
    <div>
        <ArrowBackIcon onClick={() => navigate('/')} />
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
            <TextField fullWidth label = "이름" type="name" variant="standard" onChange={(event) => setName(event.target.value
            )}/>
            <TextField fullWidth label = "아이디" type="id" variant="standard" onChange={(event) => setId(event.target.value
            )}/>
            <TextField fullWidth label = "패스워드" type="password" variant="standard" onChange={(event) => setPassword(event.target.value
            )}/>
            <TextField fullWidth label = "패스워드확인" type="passwordcheck" variant="standard" onChange={(event) => setPasswordCheck(event.target.value
            )}/>
            <TextField fullWidth label = "닉네임" type="nickname" variant="standard" onChange={(event) => setNickname(event.target.value
            )}/>
            <TextField fullWidth label = "핸드폰 번호" type="phonenumber" variant="standard" onChange={(event) => setPhonenumber(event.target.value
            )}/>
            <TextField fullWidth label = "성별" type="sex" variant="standard" onChange={(event) => setSex(event.target.value
            )}/>
            <TextField fullWidth label = "주소" type="address" variant="standard" onChange={(event) => setAddress(event.target.value
            )}/>
        
        
        <Button component="span" onClick={() => signUpHandler()}
        sx ={{
            top : 10,
        }}
         variant="contained">회원가입</Button>
        </Box>
        
    </div>
    );

}