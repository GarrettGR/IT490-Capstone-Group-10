import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import ApplicareLoading from './Webpages/ApplicareLoading';
import Home from './Webpages/Home';
import About from './Webpages/About';
import Login from './Webpages/Login';
import SignUp from './Webpages/SignUp';
import OurServices from './Webpages/OurServices';
import CommonIssues from './Webpages/CommonIssues';
import SavedAppliances from './Webpages/SavedAppliances';
import ShoppingCart from './Webpages/ShoppingCart';
import ServiceMap from './Webpages/ServiceMap'
import ApplianceParts from './Webpages/ApplianceParts';
import CommonIssues from './Webpages/CommonIssues';

function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ApplicareLoading />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/OurServices' element={<OurServices />} />
            <Route path='/CommonIssues' element={<CommonIssues />} />
            <Route path='/SavedAppliances' element={<SavedAppliances />} />
            <Route path='/ShoppingCart' element={<ShoppingCart />} />
            <Route path='/ServiceMap' element={<ServiceMap />} />
            <Route path='/ApplianceParts' element={<ApplianceParts />} />
            <Route path='/CommonIssues' element={<CommonIssues /> } />
            
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;