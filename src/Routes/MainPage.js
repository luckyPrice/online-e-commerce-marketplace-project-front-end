import React from 'react';
import Header from '../Components/header/Header';
import ItemList from '../Components/item/itemList';
import Navbar from '../Components/navbar/Navbar';

const MainPage = (props) => {
  return (
    <>
      <Header />
      <Navbar />
      <ItemList />
    </>
  )    
};

export default MainPage;