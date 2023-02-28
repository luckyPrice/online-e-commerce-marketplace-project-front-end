import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import AuthCreatePage from "./Routes/AuthCreatePage";
import LoginPage from "./Routes/LoginPage";
import MainPage from "./Routes/MainPage";
import MyPage from "./Routes/MyPage";
import BuyPage from "./Routes/BuyPage";
import SellPage from "./Routes/SellPage";
import ChatPage from "./Routes/ChatPage";
import MyChat from "./Routes/MyChat";
import DetailPage from "./Routes/DetailPage";
import Products from "./Routes/data";
import Layout from './Components/Layout';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import UploadPage from "./Routes/UploadPage";
import SellerPage from "./Routes/SellerPage";
import sellerdata from './Routes/Sellerdata';
import Reviewdata from './Routes/Reviewdata';
import ReviewPage from'./Routes/ReviewPage';
import ReviewAdd from './Routes/ReviewAdd';
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
      <Route exact path="/" element={<LoginPage />}></Route>
      <Route exact path="/AuthCreatePage" element={<AuthCreatePage />}></Route>
      <Route exact path="/MainPage" element={<MainPage />}></Route>
      <Route exact path="/MyPage" element={<MyPage />}></Route>
      <Route exact path="/SellPage" element={<SellPage />}></Route>
      <Route exact path="/BuyPage" element={<BuyPage />}></Route>
      <Route exact path="/ChatPage" element={<ChatPage />}></Route>
      <Route exact path="/MyChat" element ={<MyChat />}></Route>
      <Route exact path="/ReviewPage" element ={<ReviewPage Reviewdata ={ Reviewdata }/>}></Route>
      <Route exact path="/ReviewAdd" element ={<ReviewAdd/>}></Route>
      <Route path="/DetailPage/:id" element={<DetailPage Product ={ Product }/>} />
      <Route exact path="/UploadPage" element={<UploadPage />}></Route>
      <Route exact path="/SellerPage/:seller" element={<SellerPage Product ={ Product } sellerdata={ sellerdata }/>}></Route>
      <Route exact path="/UploadPage" element={<UploadPage />}></Route>
    </Routes>
    </BrowserRouter>







  );
}

export default App;
