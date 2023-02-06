import React, { useEffect, useState} from "react";
import axios from "axios"

export default function AuthCreatePage(){
const [requestResult, setRequestResult] = useState("");


        // 임시(회원가입), jwt 토큰을 이용해 만들 예정입니다.
    const signUpHandler = () => {
    const data = {
        name : "example",
        id : "hello@hello.com",
        password : "admin4321",
        phonenumber : "000-0000-0000",
        sex : "male",
        address : "hansung"
    }
        axios.post('http://localhost:8080/api/auth/signUp', data)
        .then((response) =>{
            setRequestResult('Success!!');
        })
        .catch((error) => {
            setRequestResult('Failed!!');
        })
    }

    return(
    <div>
        <h3>{requestResult}</h3>
        <button onClick={() => signUpHandler()}>회원가입</button>
    </div>
    );

}