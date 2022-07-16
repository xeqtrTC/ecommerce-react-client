import React, {useEffect, useState, useRef} from 'react';
import './Header.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { categoryList, searchProducts, listFullProducts } from '../../actions/productActions';
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

export default function Header() {
    const user = useRef();
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState('');
    const [clicked, setClicked] = useState(false);
    const [button, setButton] = useState(true);
    const [ show, setshow] = useState(false);
    const [onclickedlink, setonclickedlink] = useState(false);
    const [search, setSearch] = useState(false);
    const [click, setOnClick] = useState(false);
    console.log(onclickedlink);

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };
    
    const cart = useSelector((state) => state.cart);
    // const categoryList = useSelector((state) => state.categoryList)
    const searchList = useSelector((state) => state.search);
    const productList = useSelector((state) => state.productListFull)
    const userSign = useSelector((state) => state.userSignIn)

    const { loading, error, keyword: keywordList } = searchList
    const  {cartItems}  = cart;
    const { error: productError, loading: loadingError, products } = productList;
    const  {userInfo} = userSign

    const signoutHandler = () => {
        dispatch(signout())
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            Navigate(`/search/query/${keyword}`)
        } else {
            Navigate('/')
        }
    }

    const closeSearchandSetshowfalse = () => {
        setSearch(false);
        setKeyword('');
    }

    

      

    // const [items, setItems] = useState({})
    // const filterItems = (e) => {
    //     const filterProducts = products?.filter((item) => {
    //         return item.name.toLowerCase().includes(keyword.toLowerCase()); // Made live search by filtering all products by keyword value.
    //     })
    //     setItems(filterProducts)
    // }
    // useEffect(() => {
    //         filterItems();
    // }, [keyword])
    // useEffect(() => {
    //     dispatch(listFullProducts())
    // }, [dispatch])
  

    useEffect(() => {
        if(keyword.length > 2) {
            dispatch(searchProducts(keyword))
        }
    }, [keyword, dispatch])

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
                                      <input type='search' ref={user} onFocus={() => setClicked(true)} onBlur={() => setClicked(false)} placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
                                    <button className='search-button'>Search</button>
                                  </div>
                        
                      }
                      </form>
                      { 
                        search ? <CloseIcon className='border'  onClick={closeSearchandSetshowfalse} /> : <SearchOutlinedIcon className='border' onClick={() => setSearch(!search)}/> 

                      }
                      {
                         keyword.length > 2 &&   <div className='search-live'>
                            {
                                loading ? (
                                    <div className='loading-header'>
                                        <div className='loading-frame-over-header'></div>
                                    </div>
                                ) : (
                                    keywordList.length === 0  ? (
                                        <p>No products found</p>
                                    ) : (
                                        <div  className='search-div'>
                                        {
                                            keywordList?.map((item) => {
                                                return (
                                                    <div className='search-div-container' key={item.id} >
                                                        <div className='search-div-image'>
                                                            <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${item.image}`} alt='photo' />
                                                        </div>
                                                        <div className='search-div-name'>
                                                            <Link  to={`/product/${item.id}`} ><p onClick={() => setonclickedlink(true)}>{item.name}</p></Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    )
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
