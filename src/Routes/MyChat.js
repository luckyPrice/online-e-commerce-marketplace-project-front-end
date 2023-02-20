import React, { useEffect, useState} from "react";
import axios from "axios";
import {useStore1} from "./Stores/useStore";

export default function MyChat(){

    const {user, setUser} = useStore1();
    const [mychat, setMychat] = useState([]);

    useEffect(() => {
        const data = {
            username : user.username,
            id : user.id,
            pwd : user.password,
            passwordcheck : user.passwordcheck,
            nickname: user.nickname,
            phonenumber : user.phonenumber,
            sex : user.sex,
            address : user.address
        }
        console.log(user);
        axios.post('http://localhost:8080/room/getchatroom', data)
                .then((response) =>{
                    console.log(response.data);
                    
                    setMychat(response.data);
                    console.log(mychat);
                    
                    console.log("값은 잘들어가네");
                })
                .catch((error) => {
                    console.log("값이 잘 안들어가네");
                })
    },[]);


    const check = () => {
        console.log(mychat[0]);
    }

    const resultchecking = mychat.map(chat => {
        return <li>{chat}</li>
    })

    

    return(
        <>
        <ul>{mychat && resultchecking}</ul>
        <button onClick={check}>check</button>
        </>
    )


}

