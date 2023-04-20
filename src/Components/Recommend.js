import React, { Component } from "react";
import Slider from "react-slick";


function Recommend() {

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
          <div>
            <h3>상품 1</h3>
          </div>
          <div>
            <h3>상품 2</h3>
          </div>
          <div>
            <h3>상품 3</h3>
          </div>
          <div>
            <h3>상품 4</h3>
          </div>
          <div>
            <h3>상품 5</h3>
          </div>
          <div>
            <h3>상품 6</h3>
          </div>
          <div>
            <h3>상품 7</h3>
          </div>
          <div>
            <h3>상품 8</h3>
          </div>
          <div>
            <h3>상품 9</h3>
          </div>
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
.slick-next:before, .slick-prev:before {
    color: #000;
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