import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./item.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Item = ({ data, searched , id}) => {
    const navigate = useNavigate();

    useEffect(() => {
      console.log(data)
      console.log(data.url)
    },[])

    const gotoDetail = () => {
        navigate('/DetailPage/' + id);
    }
  return (
    data.status === "거래중" ?
    <>
    
    <div onClick={gotoDetail} className='StyledContainer'>
        <img src={data.url} alt="items"/>
      <div className='write'>
        <div className='StyledContent'>{data.maintext}</div>
        <div className='StyledWriter'>{data.memberid}님</div>
        <div className='StyledAddress'>{data.title}</div>
        <div className='StyledPrice'>{data.itemprice}원</div>   
        <FavoriteBorderIcon></FavoriteBorderIcon>{data.favor}
        <VisibilityIcon></VisibilityIcon>{data.view}
      </div>
      <Test><h3>거래중</h3></Test>
    </div>
    
    </>
    :
    <>
    <div onClick={gotoDetail} className='StyledContainer'>
        <div className='box'>
        <img src={data.url} alt="items"/>
      <div className='write'>
      <div className='StyledContent'>{data.maintext}</div>
      <div className='StyledWriter'>{data.memberid}님</div>
      <div className='StyledAddress'>{data.title}</div>
      <div className='StyledPrice'>{data.itemprice}원</div>   
      <FavoriteBorderIcon></FavoriteBorderIcon>{data.favor}
        <VisibilityIcon></VisibilityIcon>{data.view}
      </div>
      </div>  
    </div>
    </>
    
  )    
};

const Test = styled.div`
  position:absolute;
  z-index: 1;
  background-color:skyblue;
  text-align:center;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  
`;

export default Item;