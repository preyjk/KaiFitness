//import { useState } from 'react'
import React, { Component } from 'react'

import Header from "./components/Header";
import Home from './components/HomePage/Home';
import Footer from "./components/Footer";
import SubPlan from './components/PlanSubmitPage/SubPlan/SubPlan';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className=''>
        <Header/>
        <Home/>
        <Footer/>
        <SubPlan/>
      </div>
    )
  }
}
