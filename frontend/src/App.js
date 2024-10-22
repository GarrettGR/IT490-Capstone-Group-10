import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ApplicareLoading from './Webpages/ApplicareLoading';
import HomePage from './Webpages/HomePage';
import LoginPage from './Webpages/LoginPage';
import SignUpPage from './Webpages/SignUpPage';

function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ApplicareLoading />} />
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/LoginPage' element={<LoginPage />} />
            <Route path='/SignUpPage' element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;