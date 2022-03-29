import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup.js';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import {Routes,Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Authenticate } from "./Redux/Actions";
import Axios from 'axios';



function App(){

const dispatch=useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(Authenticate());
    }
}, [])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/Cart' element={<Cart/>} />
      </Routes>
  );
}

export default App;
