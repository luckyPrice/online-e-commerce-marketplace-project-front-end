import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";


function Recommend(prop) {
  const [item, setItem] = useState(null);
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    console.log(prop);
    
    let recommenddata = {
      itemid : prop.id,
      currentuser: prop.category
    }
    
    axios
      .post("http://localhost:8080/api/load/recommend", recommenddata)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error.message);

        
        
      });
      
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };
		return (
			<div className="container">
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<style>{cssstyle}</style>
				<h5>연관상품 추천</h5>
        <Slider {...settings}>
         {item && num.map((v, idx) => 
         {return (
         <div>
            <p className="recommend">{item[idx] ? <img src={item[idx].url} alt="items"width="100px" height="100px" /> : "empty"}
            {item[idx] ? item[idx].title : ""}</p>
          </div>
         )}
         
         )}




         
          
        </Slider>
			</div>
		);
	}
 export default Recommend;

const cssstyle = `
.container {
  margin: 0 auto;
  padding: 0px 40px 40px 40px;
  width: 3500px;
}
h3 {
    background: #5f9ea0;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
}
.recommend{
  
    font-size: 20px;
    
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
}

.slick-next:before, .slick-prev:before {
    color: #000;
}
img {
  margin: auto;
  display: block;
}
.center .slick-center h3 {
    color: #e67e22;
    opacity: 1;
    -ms-transform: scale(1.08);
    transform: scale(1.08);
}
.center h3 {
    transition: all .3s ease;
}
`