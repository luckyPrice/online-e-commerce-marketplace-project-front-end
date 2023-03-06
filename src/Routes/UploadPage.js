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
import { Co2TwoTone } from "@mui/icons-material";
import jwt_decode from "jwt-decode"




export default function UploadPage() {  
    let nickname = "";
    const navigate = useNavigate();
    const [requestResult, setRequestResult] = useState("");
    const [Id, setId] = useState("");
    const [Category, setCategory] = useState("");
    const [ItemName, setItemName] = useState("");
    const [Title, setTitle]= useState("");
    const [Main_text, setMain_text] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useStore1();
    const [attachment, setAttachment] = useState("");
    const [imgFile, setImgFile] = useState(null);	//파일
    const [imgFile2, setImgFile2] = useState(null);	//파일
    if(cookies.token){
      nickname = jwt_decode(cookies.token).sub;
    }
    

    const onChange = (event) =>{
        const {target: {name, value}} = event;
        if(name === "Category"){
          setCategory(value);
        }else if(name === "ItemName"){
          setItemName(value);
        }else if(name === "Title"){
          setTitle(value);
        }else if(name === "Main_text"){
          setMain_text(value);
        }else if(name === "ItemPrice"){
          setItemPrice(value);
        }
    };

  
  
    const UploadHandler = () => {
      
      const fd = new FormData();
      Object.values(imgFile).forEach((file) => fd.append("file", file));
       fd.append("memberid", nickname);
       fd.append("category", Category);
       fd.append("itemname", ItemName);
       fd.append("itemid", 1);
       fd.append("title", Title);
       fd.append("maintext", Main_text);
       fd.append("itemprice", ItemPrice);
       
       
            axios.post('http://localhost:8080/api/load/Upload',fd ,{
              headers: {
                "Content-Type": `multipart/form-data; `,
              }
            })
                    .then((response) =>{
                    setImgFile2(response.data);
                    const responseData = response.data;
                        setRequestResult('Upload success');
                        
                        
                        if(!responseData.result){
                            alert("Upload Fail");
                            return;
                        }

                        navigate('/mainPage');
                            
                      

                        
                    })
                    .catch((error) => {
                    console.log("no");
                    alert('실패');
                        setRequestResult('Failed!!');
                    })
            
        };

        const handleChangeFile = (event) => {
          console.log(event.target.files)
          setImgFile(event.target.files);
          for(var i=0;i<event.target.files.length;i++){
        if (event.target.files[i]) {
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[i]);
        }
        }
        }

        const options = [
            {value: '', text: '--Choose an option--'},
            {value: 'clothes', text: 'clothes'},
            {value: 'job', text: 'job'},
            {value: 'Electronic products', text: 'Electronic products'},
            {value: 'etc', text: 'etc'},
          ];

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
            <div>
                <select value={Category} onChange={onChange} name = "Category">
                    {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
            </div>

            <TextField
              margin="normal"
              required
              fullWidth
              name="ItemName"
              label="ItemName"
              id="ItemName"
              autoComplete="ItemName"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Title"
              label="Title"
              id="Title"
              autoComplete="제목"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Main_text"
              label="Main_text"
              id="Main_text"
              autoComplete="글"
              onChange={onChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="ItemPrice"
              label="ItemPrice"
              id="ItemPrice"
              autoComplete="가격"
              onChange={onChange}
            />
            <input type="file" id="file"  onChange={handleChangeFile} multiple="multiple" />
            <label htmlFor="file">파일 선택</label>
        
            <Button
            onClick={() => UploadHandler()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              글올리기
            </Button>
            
            
            
              </Box>
              
              
      </>  
          
  );
}