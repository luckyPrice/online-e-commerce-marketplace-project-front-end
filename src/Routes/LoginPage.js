import React, { useEffect, useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
const navigate = useNavigate();
const [requestResult, setRequestResult] = useState("");
const [value, setValue] = useState("");
const [id, setId] = useState("");
const [password, setPassword] = useState("");




        // 빈칸에 값이 입력될때마다, useState()를 이용해 해당값 저장
    const onChange = (event) =>{
            const {target: {name, value}} = event;
            if(name === "id"){
                setId(value);
            }else if(name === "password"){
                setPassword(value);
            }
        };

        // (임시) 아이디랑 패스워드를 스프링부트 포트로 넘겨 값이 맞는지 확인하고, 일치하면 ok를 반환 받고, 불일치하면 fail을 반환받음
        // jwt 토큰 이용해서 조만간 고칠 예정입니다.
       const logInHandler = () => {
       const data = {
            id : id,
            password : password
       }
            axios.post('http://localhost:8080/api/auth/signIn', data)
                    .then((response) =>{
                    console.log(response.data);
                        setRequestResult('Success!!');
                        if(response.data == "ok"){
                            navigate('/mainPage');
                        }
                        else{
                            alert("아이디랑 비밀번호를 확인하세요.")
                        }
                    })
                    .catch((error) => {
                    console.log("no");
                        setRequestResult('Failed!!');
                    })
            console.log(requestResult);
       };







    return(
    <div>
                <form>
                <input name = "id"
                type = "text"
                placeholder="Id"
                required
                value = {id}
                onChange={onChange}
                className="authInput"/>
                <input name = "password"
                type = "password"
                placeholder="Password"
                required
                value = {password}
                onChange={onChange}/>

                </form>
                <button onClick={() => logInHandler()}>로그인</button>
                <button onClick={() => navigate('/MainPage')}>메인페이지로</button>
                <button onClick={() => navigate('/BuyPage')}>판매페이지로</button>
                <button onClick={() => navigate('/SellPage')}>구매페이지로</button>

    </div>
    );

}