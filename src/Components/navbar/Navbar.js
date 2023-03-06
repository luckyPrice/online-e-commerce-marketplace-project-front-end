import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = (props) => {
  return (
    <StyledContainer>
      <Link to="/UploadPage">글쓰기</Link>
      <Link to="">물건 판매</Link>
      <Link to="">물건 구매</Link>
      <Link to="">무료나눔</Link>
      <Link to="">알바 구합니다</Link>
      <Link to="">알바 합니다</Link>
    </StyledContainer>
  )    
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 40px;
  border-top: 1px solid #141414;
  border-bottom: 1px solid #141414;
  
  a {
    padding: 8px 12px;
    border: 1px solid #d3d3d3;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    background-color: #141414;
    color: #fff;
  }
`;

export default Navbar;