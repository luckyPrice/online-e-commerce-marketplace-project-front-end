import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import AuthCreatePage from "./Routes/AuthCreatePage";
import LoginPage from "./Routes/LoginPage";
import MainPage from "./Routes/MainPage";
import MyPage from "./Routes/MyPage";
import SellPage from "./Routes/SellPage";
import ChatPage from "./Routes/ChatPage";
import MyChat from "./Routes/MyChat";
import DetailPage from "./Routes/DetailPage";
import DetailPurchasePage from "./Routes/DetailPage";
import DetailDonatePage from "./Routes/DetailPage";
import Products from "./Routes/data";
import Layout from './Components/Layout';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import UploadPage from "./Routes/UploadPage";
import SellerPage from "./Routes/SellerPage";
import Reviewdata from './Routes/Reviewdata';
import ReviewPage from'./Routes/ReviewPage';
import ReviewAdd from './Routes/ReviewAdd';
import CartPage from './Routes/CartPage';
import Address from './Routes/Address';
import CashPage from './Routes/CashPage';
import PayPage from './Routes/PayPage';
import StarReviewPage from './Routes/StarReviewPage';
import LandingPage from './Routes/Landing/LandingPage';
import Tile2 from './Components/item/Tiles2/Tile2';
import DetailPayPage from './Routes/DetailPayPage';
import DealPage from './Routes/DealPage';
import {
    BrowserRouter,
    HashRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
  

function App() {

  let [Product] = useState(Products);
  
  return (
  <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<LandingPage />}></Route>
      <Route exact path="/LoginPage" element={<LoginPage />}></Route>
      <Route exact path="/AuthCreatePage" element={<AuthCreatePage />}></Route>
      <Route exact path="/MainPage" element={<MainPage />}></Route>
      <Route exact path="/MyPage" element={<MyPage />}></Route>
      <Route exact path="/SellPage" element={<SellPage />}></Route>
      <Route exact path="/ChatPage" element={<ChatPage />}></Route>
      <Route exact path="/MyChat" element ={<MyChat />}></Route>
      <Route exact path="/ReviewPage" element ={<ReviewPage Reviewdata ={ Reviewdata }/>}></Route>
      <Route exact path="/ReviewAdd" element ={<ReviewAdd/>}></Route>
      <Route path="/DetailPage/:id" element={<DetailPage Product ={ Product }/>} />
      <Route path="/DetailPurchasePage/:id" element={<DetailPage Product ={ Product }/>} />
      <Route path="/DetailDonatePage/:id" element={<DetailPage Product ={ Product }/>} />
      <Route exact path="/UploadPage" element={<UploadPage />}></Route>
      <Route exact path="/SellerPage/:seller" element={<SellerPage/>}></Route>
      <Route exact path="/DetailPayPage" element={<DetailPayPage />}></Route>
      <Route exact path="/Cart" element={<CartPage />}></Route>
      <Route exact path="/PayPage/:id" element={<PayPage />}></Route>
      <Route exact path="/Address" element={<Address />}></Route>
      <Route exact path="/CashPage" element={<CashPage />}></Route>
      <Route exact path="/StarReviewPage/:id" element={<StarReviewPage />}></Route>
      <Route exact path="/DealPage/:user" element={<DealPage/>}></Route>
    </Routes>
    </BrowserRouter>







  );
}

export default App;
