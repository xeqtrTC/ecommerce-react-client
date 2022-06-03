import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder, statusOrder } from '../../../actions/orderActions';
import Leftside from '../LeftSide/Leftside';
import { ORDER_STATUS_RESET } from '../../../constants/orderConstants';
import LoadingBox from '../../Loading/LoadingBox';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import '../Admin.css';
import './OrderDetails.css';
export default function OrderDetails() {
    const params = useParams();
    const { id: orderID} = params;
    const dispatch = useDispatch();
    const [status, setStatus] = useState('Delivered')
    const { loading: updateLoading, success} = useSelector((state) => state.orderUpdate)

    const { loading, error, orders } = useSelector((state) => state.orderDetails);

    console.log(orders);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(statusOrder({status, orderID}))

    }

useEffect(() => {
    if(success) {
        dispatch({type: ORDER_STATUS_RESET })
    }
    dispatch(detailsOrder(orderID));
}, [dispatch, orderID, success])

  return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                    <div className='orderdetails-container'>
                        {
                            loading ? (
                                <LoadingBox></LoadingBox>
                            ) : (
                                error ? (
                                    <p>{error}</p>
                                ) : (
                                    <form onSubmit={onSubmitHandler}>
                                    <div className='orderdetails-top'>
                            <div className='orderdetails-button'>
                               
                            </div>
                            <div className='orderdetails-details'>
                            {orders.map((order) => (
                                <>
                                    <div   className='orderdetails-date'>
                                    
                                    <div key={order.id} className='orderdetails-date-flex'>
                                    <DateRangeOutlinedIcon /> <span key={order.id} className='margin-left'>{order.date}</span>
                                     </div>
                                     <span  className='order-details-orderid'>OrderID:</span>
                                     <span className='order-details-orderid' >{order.id}</span>
                                 </div>
                                 <div className='orderdetails-info'>
                                     <div className='orderdetails-info-flex-details'>
                                     <div className='orderdetails-customer'>
                                         <PersonIcon />
                                         <div className='orderdetails-customer-info'>
                                             <span  className='orderdetails-info-details'>Customer</span>
                                             <p>{order.Username}</p>
                                             <p>{order.fullName}</p>
                                         </div>
                                     </div>
                                     <div className='orderdetails-address'>
                                         <LocationOnIcon />
                                         <div className='orderdetails-address-info'>
                                             <span className='orderdetails-info-details'>Deliver to</span>
                                             <p>Address: {order.city}</p>
                                             <p>{order.address}</p>
                                             <p>PostalCode: {order.postalCode}</p>
                                         </div>
                                     </div>
                                     <div className='orderdetails-paymentmethod'>
                                         <PaymentIcon />
                                         <div className='orderdetails-paymentmethod-info'>
                                             <span  className='orderdetails-info-details'>Order Info</span>
                                             <p>Payment Method: {order.paymentMethod} </p>
                                             <p>Paid: {order.paid} </p>
                                         </div>
                                     </div>
                                     
                                 </div>
                                 <div className='orderdetails-info-product'>
                                     <div className='orderdetails-info-productdetails'>
                                         <div className='orderdetails-info-header'>
                                             <ul key={order.id}>
                                                 <li className='product'>Product</li>
                                                 <li className='price'>Price</li>
                                                 <li className='price'>Quantity</li>
                                                 <li className='price'>Total</li>
                                             </ul>
 
                                         </div>
                                         <div className='orderdetails-info-body'>
                                             <ul>
                                                <li className='orderdetails-info-body-img'><Link to={`/product/${order.product}`}><img src={order.image}   alt='picture' /></Link></li>
                                                 <li className='orderdetails-name-body'> {order.name}</li>
                                                 <li className='price'>{order.itemsPrice}</li>
                                                 <li className='price'>{order.qty}</li>
                                                 <li className='price'>&euro;{order.totalPrice}</li>
                                             </ul>
                                         </div>
                                     </div>
                                     <div className='orderdetails-info-product-button'>
                                         <button >Deliver order</button>
                                     </div>
                                 </div>
 
                                 </div>  
                                 </>  
                                        ))}
                                
                            </div>
                        </div>
                        </form>
                                )
                            )
                        }
                    </div>

                </div>
        </div>

    </>
  )
}
