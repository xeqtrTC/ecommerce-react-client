import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { saveAboutOrder } from '../../actions/cartActions';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Toast from '../Loading/Toast';
import { toast } from 'react-toastify';



import './Checkout.css';

export default function CheckoutScreen() {
    const Navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignIn);
    const  {userInfo}  = userSignin;
    const cart = useSelector((state) => state.cart)
    const { aboutOrder } = cart
    if(!userInfo) {
        Navigate('/login')
    }
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        closeOnClick: true,
        pauseOnHover: false,
        autoClose: 2000
    };
    
    const [fullName, setFullname] = useState(aboutOrder.fullName || '')
    const [cityName, setCityname] = useState(aboutOrder.cityName || '') 
    const [addressName, setAddressname] = useState(aboutOrder.addressName || '')
    const [fullPostal, setPostalCode] = useState(aboutOrder.fullPostal || '')
    const [paymentMethod, setPaymentMethod ] = useState('')

    const dispatch = useDispatch();

    const canprogress =  [fullName, cityName, addressName, fullPostal, paymentMethod].every(Boolean) ;

    
    const submitHandler = (e) => {
            if(canprogress) {
                    e.preventDefault()
        dispatch(saveAboutOrder({fullName, cityName, addressName, fullPostal, paymentMethod}))
       
        Navigate('/order');
        } else {
            e.preventDefault();
            toast.error('Fill all fields', ToastObjects)
        }
    }
  return (
      <>
    <Header />
    {
        cart.cartItems.length === 0 ? (
            <div className='emptyshippingcart'>
            <span >Cart is empty</span>
            </div>
        ) : (
            <><Toast />
            <div className='shipping-row'>
                          <div className='shipping-list'>
                              <form onSubmit={submitHandler}>
                                  <h3>Informations about order</h3>

                                  <div className='shipping-inputs'>

                                      <label htmlFor='fullName'>Name and surname</label>
                                      <br />
                                      <input className='test' type='text' id='fullName' placeholder='Name and surname' value={fullName} onChange={(e) => setFullname(e.target.value)}  />
                                  </div>

                                  <div className='shipping-address'>

                                      <label htmlFor='fullName'>Address</label>
                                      <br />
                                      <input className='test' type='text' id='addressName' placeholder='Address' value={addressName} onChange={(e) => setAddressname(e.target.value)}  />
                                  </div>

                                  <div className='shipping-city'>

                                      <label htmlFor='fullName'>City</label>
                                      <br />
                                      <input className='test' type='text' id='cityName' placeholder='City' value={cityName} onChange={(e) => setCityname(e.target.value)}  />
                                  </div>

                                  <div className='shipping-postal'>

                                      <label htmlFor='fullName'>PostalCode</label>
                                      <br />
                                      <input className='test' type='text' id='fullPostal' placeholder='Postal code' value={fullPostal} onChange={(e) => setPostalCode(e.target.value)}  />
                                  </div>
                                  <div className='payment-screen'>
                                      <div className='payment-visa'>
                                          <div className='payment-input'>
                                              <input type='radio' name='paymentMethod' value='Credit/debit card' onChange={(e) => setPaymentMethod(e.target.value)} />
                                              <label htmlFor='paymentMethod'>Credit/debit card</label>
                                          </div>
                                          <div className='payment-visa-img'>
                                              <img src={'https://i.pinimg.com/originals/54/e3/0e/54e30edf9d8e3f86b1935d5d3d1317d8.png'} alt='photo' />
                                          </div>
                                      </div>
                                      <div className='payment-visa'>
                                          <div className='payment-input'>
                                              <input type='radio' name='paymentMethod' value='Paypal' onChange={(e) => setPaymentMethod(e.target.value)} />
                                              <label htmlFor='paymentMethod'>Paypal</label>
                                          </div>
                                          <div className='payment-visa-img'>
                                              <img src={'http://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png'} alt='photo' />
                                          </div>
                                      </div>
                                  </div>



                                  <div className='shipping-submit'>
                                      <button className='submit'  type='submit'>Continue order</button>
                                  </div>




                              </form>
                          </div>
                      </div></>
        )
    }
    
    <Footer />
    </>
  )
}
