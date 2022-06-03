import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link, useParams } from 'react-router-dom'
import { orderHistory } from '../../actions/orderActions';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import './OrderHistory.css';
export default function OrderHistory() {
    const userSign = useSelector((state) => state.userSignIn)
    const { userInfo } = userSign;
    const dispatch = useDispatch();
    const { name } = userInfo;

    const { error, loading, orders} = useSelector((state) => state.orderHistory)
  console.log(orders);
    const params = useParams();



  console.log(name);
  useEffect(() => {
    dispatch(orderHistory(name))
  } ,[dispatch, name])



  return (
        <>
         <Header />
            <div className='cartscreen-container'>
        <div className='cartscreen-left'>
        
          
            <span className='yourcart' >Your order history</span>

            
            <div className='cartscreen-info'>
              <div className='cartscreen-productname'>
                <img  alt='slika' />
       <span className='productname'><span>Test</span></span>
              </div>
              <div className='cartscreen-qty'>
              <p>test</p>
              </div>
              <div className='cartscreen-price'>
                  <span>&euro; 52</span>
              </div>
              <div className='cartscreen-delete'>
                <HighlightOffOutlinedIcon />
              </div>
            </div>

        
        
        
        </div>
        </div>        
            <Footer />
        </>
           
)
}