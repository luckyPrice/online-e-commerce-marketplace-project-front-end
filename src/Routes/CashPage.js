import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import jwt_decode from "jwt-decode"
import {useCookies} from "react-cookie";
import Button from '@mui/material/Button';
import styled from "styled-components";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Header from "../Components/header/Header";
import Navbar from "../Components/navbar/Navbar";
import Grid from "@mui/material/Grid";

function CashPage() {
    let nickname =""
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();
    const [userData, setUserData] = useState(null);
    const [cash, setCash] = useState(0);
    const [currentcash, setCurrentcash] = useState(0);
    const [cashinfo, setCashInfo] = useState([]);
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }

      const Cashfill = () => {
        let cashupdate = {
            nickname : nickname,
            cash : cash
        }
        axios
          .post("http://localhost:8080/api/auth/UpdateCash", cashupdate)
          .then((response) => {
            
            console.log(userData);
          })
          .catch((error) => {
            console.log(error.message);
          });
          let nick = {
            nickname : nickname
        }
        
        setCurrentcash(parseInt(currentcash) + parseInt(cash));
        alert("정상적으로 충전되었습니다.")
        navigate("/CashPage");
      }

      const handleChange = (event) => {
        setCash(event.target.value);
        console.log(cash);
      }
       useEffect(() => {
        let nick = {
          nickname : nickname
      }
        axios
        .post("http://localhost:8080/api/auth/getCashOrder", nick)
        .then((response) => {
          console.log(response.data);
          setCashInfo(response.data);
          
          
        })
        .catch((error) => {
          console.log(error.message);
        });
       }, []);
    
    useEffect(() => {
        let nick = {
            nickname : nickname
        }
        axios
          .post("http://localhost:8080/api/auth/getAuth", nick)
          .then((response) => {
            console.log(response.data);
            setUserData(response.data);
            setCurrentcash(response.data.cash);
            
          })
          .catch((error) => {
            console.log(error.message);
          });

          

      }, []);


return(
    <>
    <Grid padding="60px 0 0 0" max_width="950px" margin="0 auto">
      <Header />
      <Navbar />
    <ArrowBackIcon onClick={() => navigate('/MainPage')} />
        <Box
            sx={{
                
                width: 600,
                height: 400,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'solid gray',
              }}
        >
          <h3>캐시 충전하기</h3>
            <CashBox>
            보유캐시 : {userData && currentcash} {'>'} 충전후 :  {userData && parseInt(currentcash) + parseInt(cash)}
            </CashBox>
            <SelectBox>
            충전금액 선택
            <br></br>
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="1000"
            name="radio-buttons-group"
            value={cash}
            onChange={handleChange}
            >
            <FormControlLabel value="1000" control={<Radio />} label="1000" />
            <FormControlLabel value="5000" control={<Radio />} label="5000" />
            <FormControlLabel value="10000" control={<Radio />} label="10000" />
            <FormControlLabel value="50000" control={<Radio />} label="50000" />
            <FormControlLabel value="100000" control={<Radio />} label="100000" />
            
            </RadioGroup>
            </FormControl>
            <br></br>
            직접입력 : <input style={{width:'80px', display: 'inline-block'}}  onChange = {handleChange} type="text"></input>
            </SelectBox>
            <Button color="tertiary" variant="filledTonal" onClick = {Cashfill}>충전하기</Button>

            


            </Box>
            </Grid>
            </>
)
}

const CashBox = styled.div`
width:100%;
margin-top : 40px;
border:solid 1px;
padding : 10px;


`;

const SelectBox = styled.div`
margin-top : 10px;
border:solid;
width:100%;
height:200px;


`;





export default CashPage;

