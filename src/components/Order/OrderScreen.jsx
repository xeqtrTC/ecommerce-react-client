import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


import './OrderScreen.css';
import { createOrder } from '../../actions/orderActions';
export default function OrderScreen() {
    const Navigate = useNavigate();
    const cart = useSelector((state) => state.cart)
    console.log(cart)
    if(!cart.paymentMethod) {
        Navigate('/payment');
    }
    const {aboutOrder } = cart;
    console.log(aboutOrder);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate
    console.log(orderCreate)
    const dispatch = useDispatch()
   cart.itemsPrice  = (cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    const placeOrderHandler = () => {
      dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }
    useEffect(() => {
      if(success) {
        Navigate(`/`)
        dispatch({type: ORDER_CREATE_RESET})
      }
    }, [dispatch, order, Navigate, success]);
   return (
    <>
        <Header />
        {
          cart.cartItems.length === 0 ? (
            <p>Empty</p>
          ) : (
            <div className='order-full'>
            <div className='order-left'>
                <div className='order-one'>
                    <div className='order-info'>
                    <h4>Your informations</h4>  
                     <p>Your name: {aboutOrder.fullName} </p>
                     <p>Your address: {aboutOrder.addressName}</p>
                     <p>Your city: {aboutOrder.cityName}</p>
                </div>
                <div className='order-method'>
                    <h4>Payment Method</h4>
                    <p>Your payment method is: {aboutOrder.paymentMethod} </p>    
                </div>
                </div>
                <div className='order-two'>
                    <div className='order-products'>
                        <h4>Your products</h4>
                        <div className='order-image'>
                        <ul>
                {cart.cartItems.map((item) => {
                  return (
                    <li key={item.product}>
                      <div className='order-row-bottom'>
                        <div>
                          <img src={item.image} alt='Slika' className='small' />
                        </div>
                        <div className='order-min-30'>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        
                        <div className='order-qty-cart'>
                         <span>{item.qty}</span>
                        </div>
                        <div className='order-price-cart'>
                         <span>&euro;{item.price}</span> 
                        </div>
                        
                      </div>
                    </li>
                  );
                })}
              </ul>
                        </div>
                    </div>
                </div>

                
            </div>
            
            <div className='order-right'>
                <h4>Total price: <span name='totalPrice'>{cart.itemsPrice.toFixed(2) }</span></h4>
                
                
                <button type='button' onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>
                  
                  
                {
                  loading ? ( 
                    <div className='loading-frame'></div>

                    ) : (
                    <p>Place order</p>
                  )
                }
                  
                  </button>
            </div>
            
           
            {
              error && <p>{error}</p>
            }
            
        </div>
          )
        }
        <Footer />
    </>
  )
}
