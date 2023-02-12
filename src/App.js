import logo from './logo.svg';
import './App.css';
import AuthCreatePage from "./Routes/AuthCreatePage";
import LoginPage from "./Routes/LoginPage";
import MainPage from "./Routes/MainPage";
import MyPage from "./Routes/MyPage";
import BuyPage from "./Routes/BuyPage";
import SellPage from "./Routes/SellPage";
import {
    BrowserRouter,
    HashRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
  

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />}></Route>
      <Route exact path="/AuthCreatePage" element={<AuthCreatePage />}></Route>
      <Route exact path="/MainPage" element={<MainPage />}></Route>
      <Route exact path="/MyPage" element={<MyPage />}></Route>
      <Route exact path="/SellPage" element={<SellPage />}></Route>
      <Route exact path="/BuyPage" element={<BuyPage />}></Route>
    </Routes>
    </BrowserRouter>







  );
}

export default App;
