import { useRef } from 'react'

import logo from './logo.svg';
import './App.css';

import ApplicareLoading from './Webpages/ApplicareLoading';
import HomePage from './Webpages/HomePage';
import LoginPage from './Webpages/LoginPage';
import SignUpPage from './Webpages/SignUpPage';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <div>

      <Header />
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<ApplicareLoading/>}></Route>
          <Route path = '/HomePage' element={<HomePage/>}></Route>
          <Route path = '/LoginPage' element={<LoginPage/>}></Route>
          <Route path = '/SignUpPage' element={<SignUpPage/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    
    </div>
  )
}

export default App;
