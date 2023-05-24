import { useState, useEffect } from "react";
import './StarReviewPage.css';
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jwt_decode from "jwt-decode"
import {useCookies} from "react-cookie";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};



function StarReviewPage() {
  const navigate = useNavigate();
  const [requestResult, setRequestResult] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [cookies, setCookies] = useCookies();
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const stars = Array(5).fill(0)
  const [itemDetail, setitemDetail] = useState(null);
  let { id } = useParams();
  const onChange = (event) =>{
    const {target: {name, value}} = event;
    if(name === "comment"){
      setComment(value);
    }
    else{

    }
};
let nickname = ""
if(cookies.token){
  
  nickname = jwt_decode(cookies.token).sub;
}

const [itemId, setitemId] = useState({
  itemid: id,
  currentuser : nickname
});
useEffect(() => {
  axios
    .post("http://localhost:8080/api/load/showDetail", itemId)
    .then((response) => {
      console.log("good");
      console.log(response.data);
      setitemDetail(response.data);
      
      console.log(itemDetail);
    })
    .catch((error) => {
      console.log(error.message);
    });

  }, []);






  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const ReviewHandler = () => {
    console.log(itemDetail);
    const data = {
        itemid : id,
        commentid : 1,
        comment : comment,
        star : currentValue,
        writter : nickname,
        target : itemDetail.memberid,
        date : "",
        title : itemDetail.itemname
    }
        axios.post('http://localhost:8080/api/forum/store', data)
        .then((response) =>{
            console.log(response.data);
            setRequestResult('Success!!');
            if(!response.data.result){
                alert('다시 확인해주세요');
                return;
            }
            const finish = {
              nickname : itemDetail.maintext
            }
            axios.post('http://localhost:8080/api/upload/finish', finish)
            .then((response) => {})
            .catch((error) => {})

            navigate('/');
        })
        .catch((error) => {
            setRequestResult('Failed!!');
            alert('다시 확인해주세요');
        })
    }


  return (
    <>
    <ArrowBackIcon onClick={() => navigate('/MainPage')} />
    <div style={styles.container}>
      <h2>리뷰페이지</h2>
      <br></br>
      <br></br>
      <br></br>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />

            
            
          )
        })}
      </div>
      <textarea
        placeholder="후기를 남겨주세요~"
        style={styles.textarea}
        name="comment"
        value={comment}
        onChange={onChange}
      />

      <button
        onClick={() => ReviewHandler()}
        style={styles.button}
      >
        Submit
      </button>
      
    </div>

    </>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};


export default StarReviewPage;