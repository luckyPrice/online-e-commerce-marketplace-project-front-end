import React, { useEffect, useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useStore1} from "./Stores/useStore";
import jwt_decode from "jwt-decode"
import Form from "react-bootstrap/Form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import options from "../data/options";
import female_clothes from "../data/female_clothes";
import male_clothes from "../data/male_clothes";
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './UploadPage.css'
import image from "../static/image/wallpaper5.jpg";





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
    else{
        navigate('/MainPage')
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
    const [purpose, setPurpose] = React.useState('sell');

  const purposeChange = (event) => {
        setPurpose(event.target.value);
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
       fd.append("purpose", "sell");
      
       
       
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

                        navigate('/MainPage');
                            
                      

                        
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


        if (selected === "female clothes") {
          type = female_clothes;
        } else if (selected === "male clothes") {
          type = male_clothes;
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
          <div className="uploadPage_back" style={{
            backgroundImage:`url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundSize: '100% 115%'
          }}>
          <ArrowBackIcon onClick={() => navigate('/MainPage')} />
          <div class="form1">
              <h1>게시글 작성</h1>
          </div>
          <Box style={{borderRadius:0}}
                sx={{
                  marginTop:0,
                  marginBottom:50,
      
                  width: 600,
                  height: 800,
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgb(0, 0, 0, 0.5)'
                }}
                          >
                  
                <Form
                >
                <br></br>
                <div className="team">
                      <span className="name">
                    카테고리
                    </span>
                      <select className="option" value={Category} onChange={e=>{onChange(e); changeSelectOptionHandler(e)}} name = "Category">
                          {options.map(option => (
                          <option key={option.value} value={option.value} className="option1">
                              {option.text}
                          </option>
                          ))}
                      </select>
                  
                  </div>
                  <div className="team">
                  <span className="name">
                    세부 카테고리
                    </span>
                    <select className="option" value={DetailCategory} onChange={e=>{onChange(e)}} name = "DetailCategory">
                    {detailoptions}
                    </select>
                  </div>
      
      
                  <div className="team">
                  <span className="name">
                    상품명
                    </span>
                    <input type="text" className="option" value={ItemName} placeholder="" onChange={onChange} name="ItemName">
                    </input>
                  </div>
      
                  <div className="team">
                  <span className="name">
                    제목
                    </span>
                    <input type="text" className="option" value={Title} placeholder="" onChange={onChange} name="Title">
                    </input>
                  </div>
      
                  <div style={{display: 'block',
              width: '100%',
              height: '55%',}}>
                  <span style={{marginLeft: '45px',
                                marginTop: '40px',
                                marginBottom: '160px',
                                width: '125px',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 700,
                  }}>
                    설명
                    </span>
                    <textarea rows="4" type="textarea" className="option" value={Main_text} placeholder="" onChange={onChange} name="Main_text" style={{textAlign:'left'}}>
                    </textarea>
                  </div>
      
      
                  <div className="team">
                  <span className="name">
                    가격
                    </span>
                    <input type="input" className="option" value={ItemPrice} placeholder="" onChange={onChange} name="ItemPrice">
                    </input>
                  </div>
      
      
            
            <br></br>
      
                          
                  <div className="team">
                  <span className="name">
                    사진첨부
                    </span>
                    <input type="file" id="file" className="option" onChange={handleChangeFile} multiple="multiple" text="이미지 선택"  style={{color: 'white'}}/>
                  </div>
                
                             
                  
              
                  <Button className="button1"
                  onClick={() => UploadHandler()}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 0, ml: 30}}
                    style={{width: 110, height: 50, backgroundColor: 'black', color: 'white', fontSize: '18px', fontWeight: 700,
                  }}
                  >
                    글올리기
                  </Button>
                  
                  
                  </Form>
                    </Box>
                    <br></br>
                    </div>
                    
                    
            </>  
                
        );
}