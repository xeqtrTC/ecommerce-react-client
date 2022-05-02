import React from 'react'
import LineStyleIcon  from '@mui/icons-material/LineStyle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Link } from 'react-router-dom';


import './Leftside.css';
export default function Leftside() {
  return (
    <div className='leftside-bar'>
        <div className='leftside-wrapper'>
            <div className='leftside-header'>
                <p className='logo'>ADMIN PANEL</p>    
            </div>
            <h4>Dashboard</h4>
            <div className='leftside-list'>
                <ul>
                    <li className='leftside-listtype active'>
                        <LineStyleIcon />
                        <Link to='/admin'><span className='span'>Admin Homepage</span></Link>

                    </li> 
                    <li className='leftside-listtype '>
                        <PermIdentityIcon />
                        <Link to='/users'><span className='span'>List of users</span></Link>

                    </li>
                    <li className='leftside-listtype '>
                        <StorefrontIcon />
                        <Link to='/productslist'><span className='span'>List of products</span></Link>
                    </li>   
                    <li className='leftside-listtype '>
                        <DashboardIcon />
                        <Link to='/orderlist'><span className='span'>List of orders</span></Link>
                    </li>
                    <li className='leftside-listtype'>
                        <ReviewsOutlinedIcon />
                        <Link to='/reviewlist'><span className='span'>List of reviews</span></Link>
                    </li>
                </ul>    
            </div>  
            <h4>Akcije</h4>
            <div className='leftside-list'>
                <ul>
                    <li className='leftside-listtype '>
                        <PersonAddIcon />
                        <Link to='/adduser'><span className='span'>Add user</span></Link>
                    </li> 
                    <li className='leftside-listtype '>
                        <AddBusinessIcon />
                        <Link to='/addproduct'><span className='span'>Add product</span></Link>
                    </li>
                    <li className='leftside-listtype '>
                        <StorefrontIcon />
                        <span className='span'>TO DO</span>

                    </li>   
                    <li className='leftside-listtype'>
                       <LogoutIcon />
                       <Link to='/'><span className='span'>Homepage</span></Link>
                    </li>
                </ul>    
            </div>      
        </div>    
    </div>
  )
}
