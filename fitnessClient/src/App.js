//import { useState } from 'react'
import './App.css';
import React from 'react';

import Header from "./components/Header/Header";
import Home from './components/HomePage/Home/Home';
import Footer from "./components/Footer/Footer";

var App = function App() {

  return React.createElement(
    'div',
    { className: '' },
    React.createElement(Header, null),
    React.createElement(Home, null),
    React.createElement(Footer, null)
  );
};

export default App;