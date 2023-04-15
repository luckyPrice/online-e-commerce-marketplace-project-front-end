import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import jwt_decode from "jwt-decode"
import {useCookies} from "react-cookie";

function CashPage() {
    let nickname =""
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();
    const [userData, setUserData] = useState(null);
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
    
    useEffect(() => {
        let nick = {
            nickname : nickname
        }
        axios
          .post("http://localhost:8080/api/auth/getAuth", nick)
          .then((response) => {
            console.log(response.data);
            setUserData(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }, []);


return(
    <>
    <ArrowBackIcon onClick={() => navigate('/MainPage')} />
        <Box
            sx={{
                marginTop: 14,
                width: 300,
                height: 300,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'solid gray',
              }}
        >
            보유캐시 : {userData && userData.cash}
            </Box>
            </>
)
}

export default CashPage;