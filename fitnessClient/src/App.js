/*
 * @Author: Zoey
 * @Date: 2023-04-24 16:45:23
 * @LastEditors: Zoey
 * @LastEditTime: 2023-04-26 15:35:41
 * @Descripttion:
 */
//import { useState } from 'react'
import './App.css';
import React from 'react';

import Header from './components/Header';
import Home from './components/HomePage/Home/Home';
import Footer from './components/Footer/Footer';
import SubPlan from './components/PlanSubmitPage/SubPlan/SubPlan';
import Login from '../src/views/login';
import 'antd/dist/antd.css';
var App = function App() {
  return React.createElement(
    'div',
    { className: 'pages' },
    React.createElement(Header, null),
    React.createElement(Login, null),
    React.createElement(Footer, null)
    // React.createElement(Home, null),
    //
    // React.createElement(SubPlan, null)
  );
};

export default App;
