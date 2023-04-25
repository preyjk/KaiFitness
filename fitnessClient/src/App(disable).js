//import { useState } from 'react'
import './App.css';
import React from 'react';

import Header from "./components/Header/Header";
import Home from './components/HomePage/Home/Home';
import Footer from "./components/Footer/Footer";
import SubPlan from './components/PlanSubmitPage/SubPlan/SubPlan';
import Navigation from './components/HomePage/Navigation/Navigation';

var App = function App() {

  return React.createElement(
    'div',
    { className: '' },
    React.createElement(Header, null),
    React.createElement(Navigation,null),
    React.createElement(Home, null),
    React.createElement(Footer, null),
    React.createElement(SubPlan,null)
  );
};

export default App;