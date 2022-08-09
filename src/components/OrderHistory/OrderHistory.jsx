import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoadingBox from '../Loading/LoadingBox';
import { Link, useParams } from 'react-router-dom'
import { orderHistory } from '../../actions/orderActions';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import './OrderHistory.css';

export default function OrderHistory() {
    const userSign = useSelector((state) => state.userSignIn)
    const { userInfo } = userSign;
    const dispatch = useDispatch();
    const { name } = userInfo;

    const { error, loading, order} = useSelector((state) => state.orderHistory)
    const params = useParams();



  useEffect(() => {
    dispatch(orderHistory(name))
  } ,[dispatch, name])



  return (
        <>
         <Header />
            <div className='cartscreen-container'>
        <div className='cartscreen-left'>
       
            <span className='yourcart' >Your order history</span>

            {
              loading ? (
                <LoadingBox></LoadingBox>
              ) : (
                error ? (
                  <span>{error}</span>
                ) : (
                  order.map((item) => {
                    return (
                      <div className='cartscreen-info' key={item.id}>
              <div className='cartscreen-productname'>
               <Link to={`/product/${item.product}`}> <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${item.image}`} alt='slika' /></Link>
       <span className='productname'><span>{item.name}</span></span>
              </div>
              <div className='cartscreen-qty'>
              <p>{item.qty}</p>
              </div>
              <div className='cartscreen-price'>
                  <span>&euro; {item.totalPrice}</span>
              </div>
              <div className='cartscreen-delete'>
                <input type='text' value={item.status} disabled />
              </div>
            </div>
                    )
                  })
                )
              )
            }
            

        
        
        
        </div>
        </div>        
            <Footer />
        </>
           
)
}