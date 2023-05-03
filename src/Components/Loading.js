import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;



const Loading = ({ loading }) => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" />
    </LoaderWrap>
  );
};

export default Loading;