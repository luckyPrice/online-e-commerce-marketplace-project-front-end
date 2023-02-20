import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Item = ({ data, searched , id}) => {
    const navigate = useNavigate();

    const gotoDetail = () => {
        navigate('/DetailPage/' + id);
    }
  return (
    
    <StyledContainer onClick={gotoDetail}>
        
      <figure>
        <img src={data.url} alt="items" />
      </figure>
      <div>
        <StyledContent>{data.content}</StyledContent>
        <StyledWriter>{data.writer}</StyledWriter>
        <StyledAddress>{data.address}</StyledAddress>
        <StyledPrice>{data.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</StyledPrice>
      </div>
      
    </StyledContainer>
    
  )    
};

const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 36px;
  width: 49%;
  padding: 20px 12px;
  border: 1px solid #d4d4d4;
  figure {
    margin: 0;
    width: 250px;
    height: 200px;
    img {
      width: 100%;
    }
  }
`;

const StyledContent = styled.h2`
  margin-bottom: 21px;
  font-size: 21px;
  font-weight: 600;
`;

const StyledWriter = styled.p`
  margin-bottom: 6px;
  font-size: 19px;
  font-weight: 500;
`;

const StyledAddress = styled.p`
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 500;
`;

const StyledPrice = styled.p`
  font-size: 26px;
  font-weight: bold;
`;

export default Item;