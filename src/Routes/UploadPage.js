import React, { useEffect, useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useStore1} from "./Stores/useStore";
import jwt_decode from "jwt-decode"
import Form from "react-bootstrap/form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import options from "../data/options";
import femail_clothes from "../data/femail_clothes";
import mail_clothes from "../data/mail_clothes";
import shoes from "../data/shoes";
import bag from "../data/bag";
import jewelry_watch from "../data/jewelry_watch";
import fashion_accessories from "../data/fashion_accessories";
import digital_home_electronics from "../data/digital_home_electronics";
import sports_leisure from "../data/sports_leisure";
import vehicle_motorcycle from "../data/vehicle_motorcycle";
import merchandise from "../data/merchandise";
import Kidult from "../data/Kidult";
import art_collection_rare from "../data/art_collection_rare";
import record_album_instrument from "../data/record_album_instrument";
import office_supplies_book_ticket from "../data/office_supplies_book_ticket";
import beauty from "../data/beauty";
import furniture_interior_design from "../data/furniture_interior_design";
import daily_necessity_Kitchen_appliances from "../data/daily_necessity_Kitchen_appliances";
import infant_maternity_supplies from "../data/infant_maternity_supplies";
import tools from "../data/tools";
import pet_equipment from "../data/pet_equipment";
import free from "../data/free";
import food from "../data/food";
import etc from "../data/etc";
import local_service from "../data/local_service";
import roommate from "../data/roommate";
import job from "../data/job";
import talent from "../data/talent";





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
    const [DetailCategory, setDetailCategory] = useState("");
    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useStore1();
    const [selected, setSelected] = useState("");
    const [attachment, setAttachment] = useState("");
    const [imgFile, setImgFile] = useState(null);	//파일
    const [imgFile2, setImgFile2] = useState(null);	//파일
    if(cookies.token){
      nickname = jwt_decode(cookies.token).sub;
    }
    
    let type = null;
    let detailoptions = null;

    const changeSelectOptionHandler = (event) => {
      setSelected(event.target.value);
    };

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
        }else if(name == "DetailCategory"){
          console.log(value);
          setDetailCategory(value);
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
       fd.append("detailcategory", DetailCategory);
       
       
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

        if (selected === "femail clothes") {
          type = femail_clothes;
        } else if (selected === "mail clothes") {
          type = mail_clothes;
        }else if (selected === "shoes") {
          type = shoes;
        } else if (selected === "bag") {
          type = bag;
        } else if (selected === "jewelry,watch") {
          type = jewelry_watch;
        } else if (selected === "fashion accessories") {
          type = fashion_accessories;
        } else if (selected === "digital, home electronics") {
          type = digital_home_electronics;
        } else if (selected === "sports, leisure") {
          type = sports_leisure;
        } else if (selected === "vehicle, motorcycle") {
          type = vehicle_motorcycle;
        } else if (selected === "merchandise") {
          type = merchandise;
        } else if (selected === "Kidult") {
          type = Kidult;
        } else if (selected === "art, collection, rare") {
          type = art_collection_rare;
        } else if (selected === "record, album, instrument") {
          type = record_album_instrument;
        } else if (selected === "office supplies, book, ticket") {
          type = office_supplies_book_ticket;
        } else if (selected === "beauty") {
          type = beauty;
        } else if (selected === "furniture, interior design") {
          type = furniture_interior_design;
        } else if (selected === "daily necessity, Kitchen appliances") {
          type = daily_necessity_Kitchen_appliances;
        } else if (selected === "food") {
          type = food;
        } else if (selected === "infant, maternity supplies") {
          type = infant_maternity_supplies;
        } else if (selected === "tools") {
          type = tools;
        } else if (selected === "pet equipment") {
          type = pet_equipment;
        } else if (selected === "free") {
          type = free;
        } else if (selected === "etc") {
          type = etc;
        } else if (selected === "local service") {
          type = local_service;
        } else if (selected === "talent") {
          type = talent;
        } else if (selected === "roommate") {
          type = roommate;
        } else if (selected === "job") {
          type = job;
        }
        

        console.log(type);

        if(type) {
          console.log();
          detailoptions = type.map(option => (
            <option key={option.value} Value={option.value}>
                {option.text}
            </option>
            ))
        }

  return (
    <>
    <ArrowBackIcon onClick={() => navigate('/MainPage')} />

    <div><h2>게시글 작성</h2></div>
    <Box style={{borderWidth:2, borderStyle:'solid', borderColor:'#C4C4C4', borderRadius:5}}
          sx={{
            marginTop:2,
            width: 600,
            height: 700,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FAFAD2'
          }}
                    >
            
          <Form>
          <br></br>
                <div class="form-outline">
              카테고리
                <select class="form-control" value={Category} onChange={e=>{onChange(e); changeSelectOptionHandler(e)}} name = "Category">
                    {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <br></br>
            </div>
            <div class="form-outline">
              세부 카테고리
              <select class="form-control" value={DetailCategory} onChange={e=>{onChange(e)}} name = "DetailCategory">
              {detailoptions}
              </select>
              <br></br>
            </div>
            
            
              
                    <Form.Group>
                        <Form.Label>상품명</Form.Label>
                        <Form.Control
                            type="input"
                            name="ItemName"
                            value={ItemName}
                            placeholder=""
                            onChange={onChange}
                            
                        />
                    </Form.Group>

                    <div>
                      <br></br>
                    </div>

                    <Form.Group>
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="input"
                            name="Title"
                            value={Title}
                            placeholder=""
                            onChange={onChange}
                        />
                    </Form.Group>
                    <div>
                      <br></br>
                    </div>

                    <div class="form-outline">
                      설명
                    <textarea class="form-control"
                        rows="4"
                        type="textarea"
                            name="Main_text"
                            value={Main_text}
                            placeholder=""
                            onChange={onChange}></textarea>
                            <br></br>

                    </div>
                    <Form.Group>
                        <Form.Label>가격</Form.Label>
                        <Form.Control
                            type="input"
                            name="ItemPrice"
                            value={ItemPrice}
                            placeholder=""
                            onChange={onChange}
                            
                        />
                    </Form.Group>

                    
                    

          
            
            <input type="file" id="file"  onChange={handleChangeFile} multiple="multiple" text="이미지 선택" />
          
                       
            
        
            <Button
            onClick={() => UploadHandler()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              글올리기
            </Button>
            
            
            </Form>
              </Box>
              
              
      </>  
          
  );
}