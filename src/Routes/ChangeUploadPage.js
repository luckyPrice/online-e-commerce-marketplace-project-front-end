import React, { useEffect, useState} from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import {useCookies} from "react-cookie";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useStore1} from "./Stores/useStore";
import jwt_decode from "jwt-decode"
import { Form } from 'react-bootstrap';
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





export default function ChangeUploadPage() {  
    let nickname = "";
    const navigate = useNavigate();
    const [requestResult, setRequestResult] = useState("");
    const [Id, setId] = useState("");
    const [ItemName, setItemName] = useState("");
    const [Title, setTitle]= useState("");
    const [Main_text, setMain_text] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useStore1();
    const [selected, setSelected] = useState("");
    
    if(cookies.token){
      nickname = jwt_decode(cookies.token).sub;
    }
    else{
        navigate('/MainPage')
      }

    let { id } = useParams();
    var first = 0;
    let type = null;
    let detailoptions = null;

    const [itemDetail, setitemDetail] = useState(null);

    const [itemId, setitemId] = useState({
        itemid: id,
        currentuser: nickname
      });
  useEffect(() => {
    if(first == 0){
        axios
        .post("http://localhost:8080/api/load/showDetail", itemId)
        .then((response) => {
          console.log("good");
          console.log(response.data);
          setitemDetail(response.data);
          setTitle(response.data.title);
          setItemName(response.data.itemname);
          setMain_text(response.data.maintext);
          setItemPrice(response.data.itemprice);
          
          
          first = 1;
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    
  }, []);

    const changeSelectOptionHandler = (event) => {
      setSelected(event.target.value);
    };

    const onChange = (event) =>{
        const {target: {name, value}} = event;
        if(name === "ItemName"){
          setItemName(value);
        }else if(name === "Title"){
          setTitle(value);
        }else if(name === "Main_text"){
          setMain_text(value);
        }else if(name === "ItemPrice"){
          setItemPrice(value);
        }
    };
    const [purpose, setPurpose] = React.useState('sell');

  

  
  
    const UploadHandler = () => {
      
        const changedata = {
          itemid : id,
          itemname : ItemName,
          title : Title,
          maintext : Main_text,
          itemprice : ItemPrice
        }
      
       
       
            axios.post('http://localhost:8080/api/load/Changeupload',changedata)
                    .then((response) =>{
                    
                    
                        
                        
                       

                        navigate('/DetailPage/' + id);
                            
                      

                        
                    })
                    .catch((error) => {
                    console.log("no");
                    alert('실패');
                        
                    })
            
        };

        
        

        return (
          <>
          <div className="uploadPage_back" style={{
            backgroundImage:`url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundSize: '100% 115%'
          }}>
          <ArrowBackIcon onClick={() => navigate('/MainPage')} />
          <div class="form1">
              <h1>게시글 수정</h1>
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
                <div className="img_form">
                <img src={itemDetail && itemDetail.url} alt="items" width="100px" height="100px" />
                </div>
                <br />
      
      
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
                    <input type="text" className="option"  value={Title} placeholder="" onChange={onChange} name="Title">
                        
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
      
                          
                  
                             
                  
              
                  <Button className="button1"
                  onClick={() => UploadHandler()}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 0, ml: 30}}
                    style={{width: 110, height: 50, backgroundColor: 'black', color: 'white', fontSize: '18px', fontWeight: 700,
                  }}
                  >
                    수정
                  </Button>
                  
                  
                  </Form>
                    </Box>
                    <br></br>
                    </div>
                    
                    
            </>  
                
        );
}