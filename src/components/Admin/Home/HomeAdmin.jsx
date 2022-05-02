/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect} from 'react'
import './HomeAdmin.css';
import { lastTenListUsers } from '../../../actions/userActions';
import { lastTenOrders } from '../../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function HomeAdmin() {

  const lastTenList = useSelector((state) => state.lastTen);
  const lastTenOrderList = useSelector((state) => state.orderLastTen);

  const { loading: orderLoading, error: orderError, orders} = lastTenOrderList
  const { loading, error, lastTen} = lastTenList
  console.log(orders);
  console.log(lastTen);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(lastTenOrders());
    dispatch(lastTenListUsers());

  }, [dispatch])
  


  return (
      <>
      <div className='admin-container'>
      <div className='admin-values'>
      <div className='admin-info'>
        <div className='admin-info-list'>
            <p className='admin-info-para'>Akcija</p> 
            <div className='admin-info-number'>
              
              <div className='admin-info-rate'>
              <span className='admin-info-span'>&euro; 255.255</span> 

              <span className='admin-info-discount'> -11.4</span> <ArrowUpwardIcon className='positive' />

                </div>
            </div>
            <p className='admin-info-compared'>Compared to last month</p>
    
          </div>
        </div>   
        <div className='admin-info'>
        <div className='admin-info-list'>
            <p className='admin-info-para'>Akcija</p> 
            <div className='admin-info-number'>
              
              <div className='admin-info-rate'>
              <span className='admin-info-span'>&euro; 255.255</span> 

              <span className='admin-info-discount'> -11.4</span> <ArrowUpwardIcon className='positive' />

                </div>
            </div>
            <p className='admin-info-compared'>Compared to last month</p>

          </div>
        </div> 
        <div className='admin-info'>
        <div className='admin-info-list'>
            <p className='admin-info-para'>Akcija</p> 
            <div className='admin-info-number'>
              
              <div className='admin-info-rate'>
              <span className='admin-info-span'>&euro; 255.255</span> 

              <span className='admin-info-discount'> -11.4</span>  <ArrowDownwardIcon className='negative'/>

                </div>

            </div>
            <p className='admin-info-compared'>Compared to last month</p>
    
          </div>
        </div>  

        
    </div>
    <div className='admin-users'> 
      <div className='admin-table'>
          <h4>New users</h4>
        {
          lastTen?.map((user) => {
            return (
            <div className='admin-images' key={user.id}>
                      <ul>
                        <li> <img className='admin-widget' src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png" alt='test' /></li>
                        <div className='admin-names'>
                          <li className='user-name'>{user.name}</li>
                          <li className='user-email'>{user.email}</li>  
                        </div>
                        <li className='user-display'>
                          <Link to={`/edituser/${user.id}`}><button><VisibilityIcon /><span>View</span></button></Link>
                        </li>
                      </ul>
                    </div>
            )
          })
        }
        
        
      </div>   
      <div className='admin-orders'>
        <h4>Last orders</h4>

        <table className='order-table'>
          <tr className='order-tr'>
            <th className='order-th'>User</th>
            <th className='order-th'>Full name</th>

            <th className='order-th'>Product</th>
            <th className='order-th'>Status</th>


          </tr>
          {
            orders?.map((order) => {
              return (
                <tr className='order-info' key={order.id}>
              <td className='order-picture' key={order.user_name}>
              <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"   alt='picture' />
              <span className='order-span'>{order.user_name}</span>
            
            </td>
            <td className='order-rest'>{order.fullName}</td>
            <td className='order-rest'><Link to={`/editproduct/${order.product}`}>{order.product}</Link></td>
            <td><button disabled className='order-button'>Pending</button></td>
          </tr>
              )
            })
          }
          
        </table>
    </div>   
    </div>
    
    </div>
    </>
  )
}