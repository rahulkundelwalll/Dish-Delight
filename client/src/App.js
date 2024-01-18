import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import ProductDetails from './components/ProductDetails'
import './styles/App.css'
import PaymentReceipt from './pages/PaymentReceipt'
import PaymentFailed from './pages/PaymentFailed'
import useAutoLogin from './hooks/useAutoLogin'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='App'>
    {useAutoLogin()} 
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/product/details/:id" element={<ProductDetails/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<PaymentReceipt/>}/>
        <Route path='/cancel' element={<PaymentFailed/>}/>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
