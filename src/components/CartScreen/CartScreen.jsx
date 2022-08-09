import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useSelector } from 'react-redux';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';




import './CartScreen.css';

export default function CartScreen(props) {
    const params = useParams()
    const { id: productId} = params;
    const Navigate = useNavigate();
    const { search } = useLocation()
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;
    const cart = useSelector((state) => state.cart)
    const  {cartItems} = cart;
    const dispatch = useDispatch()
    const rows1 = () => {
      <h2>Ukupna cijena : &euro;{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h2>

    }
    const rows = () => {
      // eslint-disable-next-line no-lone-blocks
      // eslint-disable-next-line no-undef
      {[...Array(item.countInStock).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>

      ))}
    }
    useEffect(() => {
      if(productId) {
        dispatch(addToCart(productId, qty))
        
      }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
      Navigate('/signin?redirect=/shipping')
    }
    return (
      <>
      <Header />
      <div className='cartscreen-container'>
        <div className='cartscreen-left'>
        {
          cartItems.length === 0 ? (
            <p className='cartempty'>Cart is empty</p>
          ) : (
            cartItems.map((item) => {
              return (
                <>
            
            <span className='yourcart' key={item.id}>Your cart</span>

            
            <div className='cartscreen-info'>
              <div className='cartscreen-productname'>
                <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${item.image}`} alt='slika' />
                <Link to={`/product/${item.product}`}><span className='productname'>{item.name}</span></Link>
              </div>
              <div className='cartscreen-qty'>
              <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                  </select>
              </div>
              <div className='cartscreen-price'>
                  <span>&euro;{item.price}</span>
              </div>
              <div className='cartscreen-delete'>
                <HighlightOffOutlinedIcon onClick={() => removeFromCartHandler(item.product)}/>
              </div>
            </div>

        
        
            </>
              )
            })
            
            
          )
        }
        </div>
        {cartItems.length === 0 ? (
          <span></span>
        ) : (
          <div className='cartscreen-right'>
          <div className='cartscreen-width'>
            <div className='totalscreen-total'>
                <div className='total-screen-total'>
                  Total:
                </div>
                <div className='total-screen-number'>
                  &euro; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </div>
            </div>
            <div className='cartscreen-button'>
            <button type='button' onClick={checkoutHandler} className='button-check' disabled={cartItems.length === 0}>
                Continue order
              </button>            
              </div>
        </div>
      </div>
        )
      } 
      </div>
      <Footer />
      </>
    
  )
  

}
