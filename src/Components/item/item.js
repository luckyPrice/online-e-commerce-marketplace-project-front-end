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
      if(data.status == "판매중"){
        navigate('/DetailPage/' + id);
      }
      else if(data.status == "거래중"){
        alert('해당 물품은 거래가 진행중입니다.');
      }
        
      
        
    }
  return (
    data.status === "거래중" ?
    <>
    
    <div onClick={gotoDetail} className='StyledContainer1'>
        <img src={data.url} alt="items"/>
      <div className='write'>
        <div className='StyledContent1'>{data.maintext}</div>
        <div className='StyledWriter1'>{data.memberid}님</div>
        <div className='StyledAddress1'>{data.title}</div>
        <div className='StyledPrice1'>{data.itemprice}원</div>   
        <FavoriteBorderIcon></FavoriteBorderIcon>{data.favor}
        <VisibilityIcon></VisibilityIcon>{data.view}
      </div>
      <Test><h3>거래중</h3></Test>
    </div>
    
    </>
    :
    <>
    <div onClick={gotoDetail} className='StyledContainer1'>
        <div className='box'>
        <img src={data.url} alt="items"/>
      <div className='write'>
      <div className='StyledContent1'>{data.maintext}</div>
      <div className='StyledWriter1'>{data.memberid}님</div>
      <div className='StyledAddress1'>{data.title}</div>
      <div className='StyledPrice1'>{data.itemprice}원</div>   
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