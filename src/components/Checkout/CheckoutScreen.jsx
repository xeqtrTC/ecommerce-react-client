import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../actions/cartActions';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


import './Checkout.css';

export default function CheckoutScreen() {
    const Navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignIn);
    const  {userInfo}  = userSignin;
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    if(!userInfo) {
        Navigate('/login')
    }
    
    const [fullName, setFullname] = useState(shippingAddress.fullName || '')
    const [cityName, setCityname] = useState(shippingAddress.cityName || '') 
    const [addressName, setAddressname] = useState(shippingAddress.addressName || '')
    const [fullPostal, setPostalCode] = useState(shippingAddress.fullPostal || '')

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({fullName, cityName, addressName, fullPostal}))
       
        Navigate('/payment');
    }
  return (
      <>
    <Header />
    <div className='shipping-row'>
        <div className='shipping-list'>
            <form onSubmit={submitHandler}>
            <h3>Informations about order</h3>

            <div className='shipping-inputs'>
                
                <label htmlFor='fullName'>Name and surname</label>  
                <br />
                <input className='test' type='text' id='fullName' placeholder='Name and surname' value={fullName} onChange={(e) => setFullname(e.target.value)} required />
            </div>

            <div className='shipping-address'>
                
                <label htmlFor='fullName'>Address</label>  
                <br />
                <input className='test' type='text' id='addressName' placeholder='Address' value={addressName} onChange={(e) => setAddressname(e.target.value)} required />
            </div>

            <div className='shipping-city'>
                
                <label htmlFor='fullName'>City</label>  
                <br />
                <input className='test' type='text' id='cityName' placeholder='City' value={cityName} onChange={(e) => setCityname(e.target.value)} required />
            </div>

            <div className='shipping-postal'>
                
                <label htmlFor='fullName'>PostalCode</label>  
                <br />
                <input className='test' type='text' id='fullPostal' placeholder='Postal code' value={fullPostal} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>
            <div className='shipping-submit'>
            <button className='submit' type='submit'>Continue order</button>
            </div>
                
                
            
            
            </form>
        </div>
    </div>
    <Footer />
    </>
  )
}
