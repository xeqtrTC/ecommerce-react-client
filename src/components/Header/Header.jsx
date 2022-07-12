import React, {useEffect, useState, useRef} from 'react';
import './Header.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { categoryList, searchProducts } from '../../actions/productActions';
import { useDispatch,  useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
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
    const user = useRef();
    const Navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [clicked, setClicked] = useState(false);
    const [button, setButton] = useState(true);
    const [ show, setshow] = useState(false);
    const dispatch = useDispatch();

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
    const searchList = useSelector((state) => state.search);
    const { loading, error, keyword: keywordList } = searchList

    const asdf = () => {
        if(keyword.length  > 2 && clicked === true) {
            setshow(true);
        } else  {
            setshow(false);
        }
        
    }
    const asfff = () => {
        if(clicked !== false && keywordList.length > 0 ) {
            setshow(true);
        } else {
            setshow(false);
        }
    }
    // const { loading: loadingCategory, error: errorCategory, category} = categoryList
      console.log(keywordList)

    const [search, setSearch] = useState(false);
    const userSign = useSelector((state) => state.userSignIn)
    const  {userInfo} = userSign

   
    console.log(userInfo);
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
        asdf()
    }, [keyword, clicked])
    console.log(clicked)
  
    useEffect(() => {
        if(keyword.length > 2) {
            dispatch(searchProducts(keyword))
        }

    }, [dispatch, keyword])
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
                                      <input type='search' onFocus={() => setClicked(true)} onClick={() => asdf()} onBlur={() => asfff()}  placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
                                    <button className='search-button'>Search</button>
                                  </div>
                        
                      }
                      </form>
                      { 
                        search ? <CloseIcon className='border'  onClick={() => setSearch(false)} /> : <SearchOutlinedIcon className='border' ref={user} onClick={() => setSearch(!search)}/> 

                      }
                      {
                         show && search && <div className='search-live'>
                            {
                                loading ? (
                                    <div className='loading-header'>
                                        <div className='loading-frame-over-header'></div>
                                    </div>
                                ) : (
                                    <div className='search-div'>
                                        {
                                            keywordList.map((item) => {
                                                return (
                                                    <div className='search-div-container' key={item.id} >
                                                        <div className='search-div-image'>
                                                            <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${item.image}`} alt='photo' />
                                                        </div>
                                                        <div className='search-div-name'>
                                                            <Link to={`/product/${item.id}`}><p>{item.name}</p></Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                      }
                      
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
