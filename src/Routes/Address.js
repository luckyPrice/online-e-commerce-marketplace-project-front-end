import React, { useEffect, useState} from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DaumPostcode from 'react-daum-postcode'; 
import Button from '@mui/material/Button';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd';
//import "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function Address (){
    const [storeRoadAddress, setStoreRoadAddress] = useState(""); // 도로명주소
    const [storeDetailAddress, setStoreDetailAddress] = useState(""); // 상세주소
    
    // daum-postcode api를 팝업처럼 관리하기 위함
    const [isOpenPost, setIsOpenPost] = useState(false);
    
    const onChangeOpenPost = () => {
      setIsOpenPost(!isOpenPost);
    };
    
    const onCompletePost = (data) => {
      let fullAddress = data.address;
      let extraAddress = "";
    
      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
    
      setStoreRoadAddress(fullAddress); // 도로명주소
      
      setIsOpenPost(false);
    };
    
    return (
      <>
        
        
        
            <DaumPostcode onComplete={onCompletePost} autoClose />
          
        
      </>
    );
          };

export default Address;