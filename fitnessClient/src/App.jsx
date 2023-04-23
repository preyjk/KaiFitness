//import { useState } from 'react'
import './App.css'
import React from 'react'

import Header from "./components/Header";
import Home from './components/HomePage/Home';
import Footer from "./components/Footer";

const App = () => {

  return (
    <div className=''>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
};

export default App;
