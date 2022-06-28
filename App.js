import './App.css';
import React,{useEffect} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Videos from './components/Videos';
import Pets from './components/Pets';
import Funds from './components/Funds';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {

  useEffect(() => {
    document.title = "ptorts"
  }, [])

  return (
    <div className='rto'>
      <div className="hdr">
      <Header />
      </div>
      <div className='rem'>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/Videos" element={<Videos />} />
          <Route exact path="/Pets" element={<Pets />} />
          <Route exact path="/Funds" element={<Funds />} />
        </Routes> 
     </BrowserRouter>
     </div>
    </div>
  );
}

export default App;
