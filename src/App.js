import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainCart from './Components/MainCart';
import Navb from './Components/Navb';
import Cart from './Redux/Cart';
import Forms from './User/Forms';
import Signup from './User/Signup';

function App() {


  const { isLogin } = useSelector(state => state.auth)
  console.log(isLogin);
  function LoggedIn() {
    if (isLogin)
      return (
        <>
          <Navb />
          <Routes>
            <Route path='/' element={<MainCart />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </>
      )
    else
      return (
        <Routes>
          <Route path='/' element={<Forms />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      )
  }

  return (
    <div className="App">
      <BrowserRouter>
        {
          LoggedIn()
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
