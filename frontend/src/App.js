import logo from './logo.svg';
import './App.css';
import ApplicareLoading from './Webpages/ApplicareLoading';
import HomePage from './Webpages/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<ApplicareLoading />}></Route>
        {/* <Route path = '/' element={<HomePage />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
