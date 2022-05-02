import React, { useState } from 'react'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

import './Payment.css'
import { savePaymentMethod } from '../../actions/cartActions';

export default function PaymentScreen() {
  const Navigate = useNavigate();

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart;
  if(!shippingAddress) {
    Navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod ] = useState('On hand')
  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    Navigate('/order')
     // to do
  }
  return (
    <>
    <Header />
        <div className='payment-screen'>
          <div className='payment-radio'>
            <form onSubmit={onSubmitHandler}>
            <input type='checkbox' value='On hand' name='paymentMethod' checked id='Onhand' onChange={(e) => setPaymentMethod(e.target.value)}  />
            <label htmlFor='onhand'>On hand</label>
            <br />
            <input type='checkbox' value='Paypal'name='paymentMethod' id='Paypal' onChange={(e) => setPaymentMethod(e.target.value)}  />
            <label htmlFor='onhand'>Paypal</label>
            <br />
            <button type='submit'>Order</button>
            </form>
          </div>
          
        </div>

    <Footer />
    </>
  )
}

