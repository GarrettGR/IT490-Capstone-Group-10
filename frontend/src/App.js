import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import ApplicareLoading from './Webpages/ApplicareLoading';
import HomePage from './Webpages/HomePage';
import About from './Webpages/About';
import LoginPage from './Webpages/LoginPage';
import SignUpPage from './Webpages/SignUpPage';
import OurServices from './Webpages/OurServices';
import SavedAppliances from './Webpages/SavedAppliances';
import ShoppingCart from './Webpages/ShoppingCart';
import ServiceMap from './Webpages/ServiceMap';

function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ApplicareLoading />} />
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/About' element={<About />} />
            <Route path='/LoginPage' element={<LoginPage />} />
            <Route path='/SignUpPage' element={<SignUpPage />} />
            <Route path='/OurServices' element={<OurServices />} />
            <Route path='/SavedAppliances' element={<SavedAppliances />} />
            <Route path='/ShoppingCart' element={<ShoppingCart />} />
            <Route path='/ServiceMap' element={<ServiceMap />} />
            
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;