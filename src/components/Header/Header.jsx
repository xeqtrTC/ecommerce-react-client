import React, {useEffect, useState} from 'react';
import './Header.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch,  useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
import { categoryList } from '../../actions/productActions'
import LoadingBox from '../Loading/LoadingBox';
import LaptopIcon from '@mui/icons-material/Laptop';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import WatchIcon from '@mui/icons-material/Watch';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function HomeScreen() {
    const Navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [button, setButton] = useState(true);

    const [click, setOnClick] = useState(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };
    
    const cart = useSelector((state) => state.cart);
    const  {cartItems}  = cart;
    const categoryList = useSelector((state) => state.categoryList)
    const { loading: loadingCategory, error: errorCategory, category} = categoryList

    const [search, setSearch] = useState(false);
    const userSign = useSelector((state) => state.userSignIn)
    const  {userInfo} = userSign
    console.log(userInfo);
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout())
    }
    console.log(userInfo)
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            Navigate(`/search/query/${keyword}`)
        } else {
            Navigate('/')
        }
    }
    useEffect(() => {
        showButton();
    }, [])
    window.addEventListener('resize', showButton);

  return (
      <>
      <div className='topbar-header'>
          <div className='top-header-width'>
                <div className='top-header-phone'>
                    <LocalPhoneOutlinedIcon />
                    <span className='support'>Support</span>
                    <span className='number'>062-352-522</span>
                </div>
                <div className='top-header-location'>
                    <LocationOnOutlinedIcon />
                    <span className='number'>Track your order</span>
                </div>
          </div>
      </div>
      <div className='bottom-header'>
          <div className='bottom-header-width'>
              <div className='bottom-header-links'>
                  <Link to='/'><img src='https://www.logolynx.com/images/logolynx/7d/7d62558cd2d0c24674966357ce0bd357.jpeg' alt='slika'/></Link>
                    <span>TBSHOP</span>
                <div className={click ? 'bottom-header-li-active' : 'bottom-header-li'}>
                    <ul>
                        {
                            userInfo ? (
                                <>
                                <li><Link  onClick={() => setOnClick(false)} to=''>{userInfo.name}</Link></li>
                                <li onClick={() => setOnClick(false)} ><Link to=''  onClick={signoutHandler}>Logout</Link></li>
                                <li onClick={() => setOnClick(false)}><Link to='/orderhistory'>Order History</Link></li>
                                </>
                                ) : (
                                    <>
                                    <li><Link to='/signup'>Signup</Link></li>    
                                    <li><Link to='/signin'>Login</Link></li>   
                                    </>
                                )
                        }
                        
                        {
                            userInfo && userInfo.isAdmin === 1 && (
                                <li><Link to='/admin'>AdminPanel</Link></li>
                            )
                        }



        

                    </ul> 
                </div>
              </div>
              <div className='bottom-header-rest'>
                  <div className='bottom-header-img'>
                  <form onSubmit={submitHandler}>
                      {
                        
                          search && <div className='search-input'>
                          <input type='search' placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
                        </div>
                        
                      }
                      </form>
                      <SearchOutlinedIcon className='border' onClick={() => setSearch(!search)} />
                      <Link to='/cart'><ShoppingCartOutlinedIcon /></Link>
                          {cartItems.length > 0 && (
                              <div className='bottom-header-length'>
                            <span>{cartItems.length}</span>
                            </div>
                          )}
                        <div className='mobileicon' onClick={() => setOnClick(!click)}>
                        {
                                click ? (
                                    <CloseIcon />
                                ) : (
                                    <DensitySmallIcon />
                                )
                        }
                        </div>
                          
                      
                  </div>
              </div>
          </div>
      </div>

   
    </>

  )
}
