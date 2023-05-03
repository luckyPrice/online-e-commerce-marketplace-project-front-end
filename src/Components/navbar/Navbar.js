import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useStore2} from "../../Routes/Stores/useStore";
import Slider from '../../Routes/Slide/components/Slider';


const Navbar = (props) => {
  const {purpose, setPurpose} = useStore2();

  // const sellPurpose = () => {
  //   console.log(purpose);
  //   setPurpose("sell");
  //   console.log(purpose);
  // }
  // const purchasePurpose = () => {
  //   console.log(purpose);
  //   setPurpose("purchase");
  //   console.log(purpose);
  // }
  // const donatePurpose = () => {
  //   console.log(purpose);
  //   setPurpose("donate");
  //   console.log(purpose);
  // }

  // return <Slider />;
  return (
    <>
    <Slider />
    {/* <StyledContainer>
      
      <button onClick={sellPurpose}>판매</button>
      <button onClick={purchasePurpose}>구매</button>
      <button onClick={donatePurpose}>무료나눔</button>
      
    </StyledContainer> */}
    </>
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