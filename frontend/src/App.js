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
import ServiceMap from './Webpages/ServiceMap'
import ApplianceParts from './Webpages/ApplianceParts';
// Common Issues Pages
import CommonIssuesWashers from './Webpages/CommonIssues/CommonIssuesWashers';
import CommonIssuesDryers from './Webpages/CommonIssues/CommonIssuesDryers';
import CommonIssuesFridge from './Webpages/CommonIssues/CommonIssuesFridge';
import CommonIssuesDish from './Webpages/CommonIssues/CommonIssuesDish';
import CommonIssuesMicro from './Webpages/CommonIssues/CommonIssuesMicro';
import CommonIssuesOven from './Webpages/CommonIssues/CommonIssuesOven';

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
            <Route path='/ApplianceParts' element={<ApplianceParts />} />
            {/* Common Issues Pages */}
            <Route path="/CommonIssuesWashers" element={<CommonIssuesWashers />} />
            <Route path="/CommonIssuesDryers" element={<CommonIssuesDryers />} />
            <Route path="/CommonIssuesFridge" element={<CommonIssuesFridge />} />
            <Route path='/CommonIssuesDish' element={<CommonIssuesDish />} />
            <Route path='/CommonIssuesMicro' element={<CommonIssuesMicro />} />
            <Route path='/CommonIssuesOven' element={<CommonIssuesOven />} />
            
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;