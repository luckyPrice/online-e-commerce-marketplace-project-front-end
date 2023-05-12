import React, { useEffect, useState} from "react";
import axios from "axios"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


export default function AuthCreatePage(){
const [requestResult, setRequestResult] = useState("");
const [name, setName] = useState("");
const [id, setId] = useState("");
const [password, setPassword] = useState("");
const [passwordcheck, setPasswordCheck] = useState("");
const [nickname, setNickname] = useState("");
const [phonenumber, setPhonenumber] = useState("");
const [sex, setSex] = React.useState('female');
const [address, setAddress] = useState("");
const navigate = useNavigate();

const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  

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
            navigate('/LoginPage');
        })
        .catch((error) => {
            setRequestResult('Failed!!');
            alert('다시 확인해주세요');
        })
    }

    const handleChange = (event) => {
        setSex(event.target.value);
      };

      

   
      

    return(
    <div>
        <ArrowBackIcon onClick={() => navigate('/LoginPage')} />
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
            
            <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={sex}
            onChange={handleChange}
            >
               
    <FormControlLabel value="female" control={<Radio />} label="여자" />
    <FormControlLabel value="male" control={<Radio />} label="남자" />
  </RadioGroup>
  
            <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="주소"
                        aria-label="주소"
                        aria-describedby="basic-addon2"
                        value={address}
                    />
                    <Button onClick={handleClick} variant="outline-secondary" >
                        등록
                    </Button>
                </InputGroup>

        
        
        
        <Button component="span" onClick={() => signUpHandler()}
        sx ={{
            top : 10,
        }}
         variant="contained">회원가입</Button>
        </Box>
        
    </div>
    );

}