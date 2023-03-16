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

        const options = [
          {value: '', text: '--Choose an option--'},
          {value: 'female clothes', text: '여성의류'},
          {value: 'mail clothes', text: '남성의류'},
          {value: 'shoes', text: '신발'},
          {value: 'bag', text: '가방'},
          {value: 'jewelry,watch', text: '시계/쥬얼리'},
          {value: 'fashion accessories', text: '패션 액세서리'},
          {value: 'digital, home electronics', text: '디지털/가전'},
          {value: 'sports, leisure', text: '스포츠.레저'},
          {value: 'vehicle, motorcycle', text: '차량/오토바이'},
          {value: 'merchandise', text: '스타굿즈'},
          {value: 'Kidult', text: '키덜트'},
          {value: 'art, collection, rare', text: '예술/희귀/수집품'},
          {value: 'record, album, instrument', text: '음반/악기'},
          {value: 'office supplies, book, ticket', text: '도서/티켓/문구'},
          {value: 'beauty', text: '뷰티/미용'},
          {value: 'furniture, interior design', text: '가구/인테리어'},
          {value: 'daily necessity, Kitchen appliances', text: '생활/주방용품'},
          {value: 'tools', text: '공구/산업용품'},
          {value: 'food', text: '식품'},
          {value: 'infant, maternity supplies', text: '유아동/출산'},
          {value: 'pet equipment', text: '반려동물용품'},
          {value: 'free', text: '무료나눔'},
          {value: 'local_service', text: '지역 서비스'},
          {value: 'talent', text: '재능'},
          {value: 'roommate', text: '원룸/함께살아요'},
          {value: 'job', text: '구인구직'},
          {value: 'etc', text: '기타'},
        ];

        const femail_clothes = [
          {value: 'f_padded_coat_jacket', text: '패딩/점퍼'},
          {value: 'f_coat', text: '코트'},
          {value: 'f_sweatshirt', text: '맨투맨'},
          {value: 'f_hoodie', text: '후디티/후드집업'},
          {value: 'f_t_shirt', text: '티셔츠'},
          {value: 'f_blouse', text: '블라우스'},
          {value: 'f_white_shirt', text: '셔츠'},
          {value: 'f_pants', text: '바지'},
          {value: 'f_jeans', text: '청바지'},
          {value: 'f_shorts', text: '반바지'},
          {value: 'f_skirt', text: '치마'},
          {value: 'f_onepiece', text: '원피스'},
          {value: 'f_cardigun', text: '가디건'},
          {value: 'f_neet', text: '니트/스웨터'},
          {value: 'f_jacket', text: '자켓'},
          {value: 'f_suit', text: '정장'},
          {value: 'f_sumpsuit', text: '점프수트'},
          {value: 'f_vest', text: '조끼/베스트'},
          {value: 'f_trainning', text: '트레이닝'},
          {value: 'f_underwear_homewear', text: '언더웨어/홈훼어'},
          {value: 'f_theme_event', text: '테마/이벤트'},
        ];
        const mail_clothes = [
          {value: 'm_padded_coat_jacket', text: '패딩/점퍼'},
          {value: 'm_coat', text: '코트'},
          {value: 'm_sweatshirt', text: '맨투맨'},
          {value: 'm_hoodie', text: '후디티/후드집업'},
          {value: 'm_t_shirt', text: '티셔츠'},
          {value: 'm_white_shirt', text: '셔츠'},
          {value: 'm_pants', text: '바지'},
          {value: 'm_shirt', text: '청바지'},
          {value: 'm_shorts', text: '반바지'},
          {value: 'm_cardigun', text: '가디건'},
          {value: 'm_neet', text: '니트/스웨터'},
          {value: 'm_jacket', text: '자켓'},
          {value: 'm_suit', text: '정장'},
          {value: 'm_vest', text: '조끼/베스트'},
          {value: 'm_trainning', text: '트레이닝'},
          {value: 'm_underwear_homewear', text: '언더웨어/홈훼어'},
          {value: 'm_theme_event', text: '테마/이벤트'},
        ];
        const shoes = [
          {value: 'sneakers', text: '스니커즈'},
          {value: 'femal_shoes', text: '여성화'},
          {value: 'male_shoes', text: '남성화'},
        ];
        const bag = [
          {value: 'luggage', text: '여행가방'},
          {value: 'femal_bag', text: '여성가방'},
          {value: 'male_bag', text: '남성가방'},
        ];
        const jewelry_watch = [
          {value: 'jewerly', text: '쥬얼리'},
          {value: 'watch', text: '시계'},
        ];
        const fashion_accessories = [
          {value: 'wallet', text: '지갑'},
          {value: 'belt', text: '벨트'},
          {value: 'hat', text: '모자'},
          {value: 'muffler_gloves', text: '목도리/장갑'},
          {value: 'scarf_necktie', text: '스카프/넥타이'},
          {value: 'glasses', text: '안경/선글라스'},
          {value: 'socks_stocking', text: '양말/스타킹'},
          {value: 'umbrella_parasol', text: '우산/양산'},
          {value: 'etc_fashion_accessories', text: '기타엑세서리'},
        ];
        const digital_home_electronics = [
          {value: 'mobile', text: '모바일'},
          {value: 'home_appliance', text: '가전제품'},
          {value: 'audio_video_related_device', text: '오디오/영상/관련기기'},
          {value: 'pc_laptop', text: 'pc/노트북'},
          {value: 'game_title', text: '게임/타이틀'},
          {value: 'camera', text: '카메라/DSLR'},
          {value: 'pc_part', text: 'pc부품/저장장치'},
        ];
        const sports_leisure = [
          {value: 'mobile', text: '골프'},
          {value: 'home_appliance', text: '캠핑'},
          {value: 'audio_video_related_device', text: '낚시'},
          {value: 'football', text: '축구'},
          {value: 'bicycle', text: '자전거'},
          {value: 'inline_skateboard', text: '인라인/스케이트보드'},
          {value: 'electric_kickboard_wheel', text: '전동킥/전동휠'},
          {value: 'tennis', text: '테니스'},
          {value: 'climbing', text: '등산/클라이밍'},
          {value: 'health_yoga_pilates', text: '헬스/요가/필라테스'},
          {value: 'baseball', text: '야구'},
          {value: 'bowling', text: '볼링'},
          {value: 'badminton', text: '배드민턴'},
          {value: 'ping_pong', text: '탁구'},
          {value: 'basketball', text: '농구'},
          {value: 'billiards', text: '당구'},
          {value: 'winter_sports', text: '겨울스포츠'},
          {value: 'water_sports', text: '수상스포츠'},
          {value: 'etc_sports', text: '기타구기스포츠'},
        ];
        const vehicle_motorcycle = [
          {value: 'domestic_car', text: '국산차'},
          {value: 'foreign_car',  text: '수입차'},
          {value: 'vehicle_supplies_parts', text: '차량용품/부품'},
          {value: 'motorcycle/scooter', text: '오토바이/스쿠터'},
          {value: 'motorcycle', text: '오토바이 용품/부품'},
          {value: 'industrial_vehicle_equipment', text: '산업용차량/장비'},
        ];
        const merchandise = [
          {value: 'boy_group', text: '보이그룹'},
          {value: 'girl_group',  text: '걸그룹'},
          {value: 'male_solo', text: '솔로(남)'},
          {value: 'female_solo', text: '솔로(여)'},
          {value: 'actor', text: '배우(남)'},
          {value: 'actress', text: '배우(여)'},
          {value: 'broadcast/entertainmentcahracter', text: '방송/예능/캐릭터'},
        ];
        const Kidult = [
          {value: 'figure', text: '피규어'},
          {value: 'lego_block', text: '레고/블럭'},
          {value: 'plastic_model', text: '프라모델'},
          {value: 'rc', text: 'RC/드론'},
          {value: 'board_game', text: '보드게임'},
          {value: 'survival_gun', text: '서바이벌건'},
          {value: 'etc_kidult', text: '기타(키덜트)'},
        ];
        const art_collection_rare = [
          {value: 'rare_collectibles', text: '희귀/수집품'},
          {value: 'curios', text: '골동품'},
          {value: 'art', text: '예술작품'},
        ];
        const record_album_instrument = [
          {value: 'cd_dvd_lp', text: 'CD/DVD/LP'},
          {value: 'instriment', text: '악기'},
        ];
        const office_supplies_book_ticket = [
          {value: 'art', text: '도서'},
          {value: 'book', text: '문구'},
          {value: 'gifiticon', text: '기프티콘/쿠폰'},
          {value: 'gift_card', text: '상품권'},
          {value: 'ticket', text: '티켓'},
        ];
        const beauty = [
          {value: 'skin_care', text: '스킨케어'},
          {value: 'tint_makeup', text: '색조메이크업'},
          {value: 'base_makeup', text: '베이스메이크업'},
          {value: 'bodywash_haircare', text: '바디/헤어케어'},
          {value: 'perfume_aroma', text: '향수/아로마'},
          {value: 'nailart_care', text: '네일아트/케어'},
          {value: 'beauty_device', text: '미용소품/기기'},
          {value: 'diet_innerviwer', text: '다이어트/이너뷰어'},
          {value: 'male', text: '남성 화장품'},
        ];
        const furniture_interior_design = [
          {value: 'interior', text: '인테리어'},
          {value: 'furniture', text: '가구'},
        ];
        const daily_necessity_Kitchen_appliances = [
          {value: 'kitchen', text: '주방용품'},
          {value: 'bath', text: '욕실용품'},
          {value: 'daily', text: '생활용품'},
        ];
        const infant_maternity_supplies = [
          {value: '0_2', text: '0~2세'},
          {value: 'g_3_6', text: '여아3~6세'},
          {value: 'b_3_6', text: '남아3~6세'},
          {value: 'g_7', text: '여아7세~'},
          {value: 'b_7', text: '남아7세~'},
          {value: 'kid_shoes', text: '유아동신발/잡화'},
          {value: 'education/toy', text: '교육/완구/인형'},
          {value: 'kid_product', text: '유아동용품'},
          {value: 'maternity_supplies', text: '출산/임부용품'},
          {value: 'kid_food', text: '이유용품/유아식기'},
        ];
        const tools = [
          {value: 'drill', text: '드릴/전동공구'},
          {value: 'household', text: '수공구/가정용 공구'},
          {value: 'box', text: '공구함'},
          {value: 'industrial_restraint', text: '산업용품/자제'},
          {value: 'hydraulic', text: '측정/계측/레벨'},
          {value: 'factory_machinery', text: '공장기계/용접/가스'},
          {value: 'hydraulic', text: '에어/유압공구'},
          {value: 'etc_tools', text: '기타 삽업용품'},
        ];
        const pet_equipment = [
          {value: 'dog', text: '강아지용품'},
          {value: 'cat', text: '고양이용품'},
          {value: 'etc_pet', text: '기타'},
        ];
        const free = [
        ];
        const food = [
          {value: 'health_food', text: '건강식품'},
          {value: 'agricultural_livestock_products', text: '농수축산물'},
          {value: 'snack', text: '간식'},
          {value: 'coffe_tea', text: '커피/차'},
          {value: 'drink', text: '생수/음료'},
          {value: 'nooldle_canned', text: '면/통조림'},
          {value: 'source', text: '장/소스/오일'},
          {value: 'simple_cook', text: '간편조리식품'},
          {value: 'etc_food', text: '기타 식품'},
        ];
        const etc = [
        ];
        const local_service = [
          {value: 'move_delivery', text: '이사/용달'},
          {value: 'interior_sign', text: '인테리어/간판'},
          {value: 'cleaning_laundry', text: '청소/세탁/철거'},
          {value: 'academy', text: '학원/수강'},
          {value: 'nail_beauty', text: '네일/미용'},
          {value: 'health_yoga', text: '헬스/요가'},
          {value: 'hotel_pension_lodgment', text: '호텔/펜션/숙박'},
          {value: 'vehicle_repair', text: '차량/수리'},
          {value: 'finance_obligation', text: '금융/채무'},
          {value: 'marry_event', text: '결혼/행사'},
          {value: 'hospital_pharmacy', text: '병원/약국'},
          {value: 'etc_local_service', text: '기타'},
        ];
        const roommate = [
          {value: 'villa', text: '주택/빌라'},
          {value: 'one_room_two_room', text: '원룸/투룸'},
          {value: 'officetels', text: '오피스텔'},
          {value: 'apartment', text: '아파트'},
          {value: 'store', text: '점포/상가'},
          {value: 'male_roomate', text: '남성 룸메이트'},
          {value: 'female_roomate', text: '여성 룸메이트'},
          {value: 'roommate_etc', text: '기타'},

        ];
        const job = [
        ];
        const talent = [
          {value: 'design_video_photo', text: '디자인/영상/사진'},
          {value: 'life_knowledge', text: '생활서비스/지식'},
          {value: 'style_beauty', text: '스타일/뷰티'},
          {value: 'blog_document_translate', text: '블로그/문서/번역'},
          {value: '', text: '거래대행'},
          {value: 'move_delivery', text: '재능인 찾아요'},
          {value: 'move_delivery', text: '기타재능'},
        ];

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
    <Box
          sx={{
            marginTop: 14,
            width: 800,
            height: 300,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
                    >

<div>
                <select value={Category} onChange={e=>{onChange(e); changeSelectOptionHandler(e)}} name = "Category">
                    {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
            </div>
            <div>
              <select value={DetailCategory} onChange={e=>{onChange(e)}} name = "DetailCategory">
              {detailoptions}
              </select>
            </div>
                      <Form>
            
            
              
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

                    <div class="form-outline">
                      설명
                    <textarea class="form-control"
                        rows="4"
                        type="textarea"
                            name="Main_text"
                            value={Main_text}
                            placeholder=""
                            onChange={onChange}></textarea>

                    </div>

                    <div>
                <select value={Category} onChange={onChange} name = "Category">
                    {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
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
              sx={{ mt: 3, mb: 2 }}
            >
              글올리기
            </Button>
            
            
            </Form>
              </Box>
              
              
      </>  
          
  );
}