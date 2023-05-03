import "./Landing.css";
import landing from "./image/landing.jpg";
import onlineShopping from "./image/onlineShopping.jpg";
import travel_03 from "./image/travel-03.jpg";
import travel_02 from "./image/travel-02.jpg";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Slider from "./Slider";
const LandingPage = () =>{

      return (
        <div className="App">
          <Navbar navbarLinks={navbarLinks} />
          <Hero imageSrc={landing} />
          <Slider
            imageSrc={onlineShopping}
            title={"집에서 편하게"}
            subtitle={
              "다양한 물건들을 집에서 편하게 구경해보세요!"
            }
          />
          <Slider
            imageSrc={travel_03}
            title={"Memories for a lifetime."}
            subtitle={"Your dream vacation is only a few clicks away."}
            flipped={true}
          />
          <Slider
            imageSrc={travel_02}
            title={"지금 바로 시작해 보세요"}
            subtitle={"Your dream vacation is only a few clicks away."}

          />
        </div>
      );
    
}

export default LandingPage;