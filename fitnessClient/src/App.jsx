//import { useState } from 'react'

import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/HomePage/Navigation/Navigation';
import HomePage from './pages/HomePage';
import PlanPage from './pages/PlanPage';
import Footer from './components/Footer';
import Login from './components/Login';
import './App.css';

export default function App() {
	return (
		<div className="">
			<Header />
			<Navigation />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/plan" element={<PlanPage />} />
			</Routes>
			<Footer />
		</div>
	);
}
