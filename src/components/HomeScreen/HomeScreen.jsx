import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Header from '../Header/Header'
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import './HomeScreen.css';
import {sliderData}  from '../../data';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TwitterIcon from '@mui/icons-material/Twitter';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Slider from './Slider';

import '../Footer/Footer.css';

export default function HomeScreen({ slides }) {


  const [firstItem, setFirstItem] = useState(true);
  const [firstItemFocus, setFirstItemFocus] = useState(true);

  const [secondItem, setSecondItem] = useState(false);
  const [secondItemFocus, setSecondItemFocus] = useState(false);
  
  const [thirdItem, setThirdItem] = useState(false);
  const [thirdItemFocus, setThirdItemFocus] = useState(false);

  
  const showFirstItem = () => {
    setFirstItem(true);
    setFirstItemFocus(true);
    setSecondItem(false);
    setSecondItemFocus(false);
    setThirdItem(false);
    setThirdItemFocus(false);
  }

  const showSecondItem = () => {
    setSecondItem(true);
    setSecondItemFocus(true);
    setFirstItem(false);
    setFirstItemFocus(false);
    setThirdItem(false);
    setThirdItemFocus(false);
  }

  const showThirdItem = () => {
    setThirdItem(true);
    setThirdItemFocus(true);
    setFirstItem(false);
    setFirstItemFocus(false);
    setSecondItem(false);
    setSecondItemFocus(false);
   
  }





    const dispatch = useDispatch();
  const productList = useSelector( (state) => state.productList);
  const { loading, error, products } = productList
  console.log(products);

  const productsSliced = products?.slice(2,5);
  console.log(productsSliced);

  const [current, setCurrent] = useState(0);
    const length = sliderData.length;
    const [currentItem, setCurrentItem] = useState();
    const [currentItemFocus, setCurrentItemFocus] = useState()
  useEffect(() => {
    setCurrentItem(productsSliced)
    setCurrentItemFocus(productsSliced);
  }, [products])

  const setIndexShow = (id) => {
    const filterItems = productsSliced.filter((item) => item.id === id)
    const filterItemsFocus = filterItems.map((item) => {
      return (
        item.id
      )
    })
    setCurrentItem(filterItems)
    setCurrentItemFocus(filterItemsFocus)
  }
  console.log('CURRENT ITEM', currentItem);
  console.log('CURRENT FOCUS', currentItemFocus);  
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    console.log(current);


    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])
  return (
    <>
    <Header />
        <div className='homescreen-container'>
          <div className='homescreen-top'>
              <div className='homescreen-product'>
                  
                   {/* LEVO OD TEKSTA, NAPRAVITI NA KLIL DA SE MENJA KONTEKT, BEZ VREMENA TRENUTNO.
                   MAKNUTI iz .homescreen-product ALIGN-ITEMS: CENTER;
                   MAKNUTI WIDTH: 100% IZ .homescreen-product-right; */}
                  <div className='homescreen-product-left'>
                      {
                        productsSliced?.map((productSlice) => {
                          return (
                            <div onClick={() => setIndexShow(productSlice.id)}  id='test' className='homescreen-product-left-item' key={productSlice.id}>
                            <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${productSlice.image}`} alt='slika' />                     
                          <div className='homescreen-product-left-item-product'>
                            <p id='test'>{productSlice.name}</p>
                            <p id='test'>{productSlice.category}</p>
                          </div>
                          <ArrowForwardIosOutlinedIcon />
                          </div>
                          )
                        })
                      }
                      
                  </div> 
                  <div className='homescreen-product-right'>
                    {
                      loading ? (
                        <LoadingBox />
                        
                      ) : (
                        currentItem && (
                          <>
                          <div className='homescreen-product-right-name'>
                            <p>{currentItem[0].name}</p>
                            <p>{currentItem[0].category}</p>
                            <Link to={`/product/${currentItem[0].id}`}><button className='homescreen-product-button'>Get it Now = &euro;{currentItem[0].price}</button></Link>
                          </div><div className='homescreen-product-right-img'>
                              <img className='img-home' src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${currentItem[0].image}`} alt='slika' />
                            </div>
                          </>
                        )
                      )
                    }
                     {/* {
                        currentItem.length < 0 ? (
                            <>
                            <div className='homescreen-product-right-name'>
                              <p>{productsSliced[0].name}</p>
                              <p>{productsSliced[0].category}</p>
                              <button className='homescreen-product-button'>Get it Now = &euro;{productsSliced[0].price}</button>
                            </div><div className='homescreen-product-right-img'>
                                <img className='img-home' src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${productsSliced[0].image}`} alt='slika' />
                              </div>
                             </>
                        ) : (
                          currentItem.length > 0 && (
                            <>
                            <div className='homescreen-product-right-name'>
                              <p>{currentItem[0].name}</p>
                              <p>{currentItem[0].category}</p>
                              <button className='homescreen-product-button'>Get it Now = &euro;{currentItem[0].price}</button>
                            </div><div className='homescreen-product-right-img'>
                                <img className='img-home' src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${currentItem[0].image}`} alt='slika' />
                              </div>
                            </>
                          )
                        )
                     } */}
                  </div>
              </div>
          </div>
        </div>
        <div className='product-categories'>
          <div className='product-categories-info'>
            <div className='product-categories-info-image'>
                <img src='../../../images/1649983043274.jpg' alt='slika' />
            </div>
            <div className='product-categories-info-name'>
                  <Link to={`/search/mouse`}><span>Mouse</span></Link>
            </div>
          </div>
          <div className='product-categories-info'>
            <div className='product-categories-info-image'>
                <img src='../../../images/1649957387582.jpg' alt='slika' />
            </div>
            <div className='product-categories-info-name'>
                  <Link to={`/search/keyboard`}><span>Keyboard</span></Link>
            </div>
          </div>
          <div className='product-categories-info'>
            <div className='product-categories-info-image'>
                <img src='../../../images/1649959013135.jpg' alt='slika' />
            </div>
            <div className='product-categories-info-name'>
                  <Link to={`/search/headphones`}><span>Headphones</span></Link>
            </div>
          </div>
        </div>
        <div className='product-trending-products'>
          {
            loading ? (
              <LoadingBox />

            ) : (
              error ? (
                <p>{error}</p>
              ) : (
                products.map((product) => {
                  return (
                    <div  className='product-treding-products-container' key={product.id}>
                <div  className='product-trending-products-info'>
              <div   className='product-trending-products-image'>
                <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${product.image}`} alt='slika' />
              </div>
          <div className='product-trending-products-text'>
              <span className='product-trending-category'>{product.category}</span>
              <Link to={`/product/${product.id}`}><span>{product.name}</span></Link>
              <span className='product-trending-price'>&euro;{product.price}</span>
            </div>
          </div>
      </div>
                  )
                })
              )
            )
          }
      
      
      
      
      
      

      <div className='product-trending-button'>
        <Link to='/search'><button>Show products</button></Link>
      </div>
        </div>

        <div className='footer-info-container'>
    <div className='footer-info-first-container'>
        <div className='footer-info-first-links'>
          <p className='footer-info-title'>Shop departments</p>
          <p><Link to={`/search/keyboard`}><span>Keyboards</span></Link></p>
              <p><Link to={`/search/mouse`}><span>Mouse</span></Link></p>
              <p><Link to={`/search/headphones`}><span>Headphones</span></Link></p>

          

        </div>
        <div className='footer-info-second-links'>
            <p className='footer-info-title'>Customer zone</p>
              <Link to={'/shippingrates'}><p>Shipping rates & policies</p></Link>
              <Link to={'/refunds'}><p>Refunds & replacements</p></Link>
              <Link to={`/ordertracking`}><p>Order tracking</p></Link>
              <Link to={`/deliveryinfo`}><p>Delivery info</p></Link>
              <Link to={`/taxesfees`}><p>Taxes & fees</p></Link>
              <Link to={`/news`}><p>News</p></Link>
        </div>
        <div className='footer-info-second-links'>
            <p className='footer-info-title'>User agreement</p>
              <Link to={`/privacypolicy`}><p>Privacy policy</p></Link>
              <Link to={`/cookiepolicy`}><p>Cookie policy</p></Link>
              <Link to={`/copyrightpolicy`}><p>Copyright policy</p></Link>
              <Link to={`/brandpolicy`}><p>Brand policy</p></Link>
            </div>
    </div>
    <div className='footer-info-container-prop'>
    <div className='footer-info-options'>
        <div className='footer-info-options-first'>
          <div className='footer-info-options-truck'>
              <LocalShippingOutlinedIcon />
              <div className='footer-info-options-truck-para'>
              <span className='footer-info-options-para'>Fast and free delivery</span>
              <span className='footer-info-options-delviery'>Free delivery for all orders over $200</span>
              </div>

          </div>
          <div className='footer-info-options-truck'>
              <AutorenewOutlinedIcon />
              <div className='footer-info-options-truck-para'>
              <span className='footer-info-options-para'>Fast and free delivery</span>
              <span className='footer-info-options-delviery'>We return money within 30 days</span>
              </div>
              
          </div>
          <div className='footer-info-options-truck'>
              <SupportAgentOutlinedIcon />
              <div className='footer-info-options-truck-para'>
              <span className='footer-info-options-para'>24/7 customer support</span>
              <span className='footer-info-options-delviery'>Friendly 24/7 customer support</span>
              </div>
              </div>
          <div className='footer-info-options-truck'>
              <CreditCardOutlinedIcon />
              <div className='footer-info-options-truck-para'>
              <span className='footer-info-options-para'>Secure online payment</span>
              <span className='footer-info-options-delviery'>We possess SSL / Secure сertificate</span>
              </div>
              
          </div>
        </div>
    </div>
    <div className='breakline'></div>
    <div className='footer-info-about'>
      <div className='footer-info-about-info'>
        <div className='footer-info-about-rest'>
          <ul>
            <li className='tb'>TB</li>
            <Link to={`/aboutus`}><li>About us</li></Link>
            <Link to={`/support`}><li>Support</li></Link>
            <Link to={`/contactus`}><li>Contact us</li></Link>
          </ul>
        </div>
        <div className='footer-info-about-social'>
            <FacebookOutlinedIcon className='facebook' />
            <InstagramIcon className='instagram' />
            <YouTubeIcon className='youtube' />
            <TwitterIcon className='twitter' />
            
        </div>
      </div>
    </div>
    <div className='footer-info-company'>
          <div className='footer-info-company-first'>
          <span className='rights'>&copy; All rights reserved.</span>
          <span className='rights'> Made by</span>
          <span className='tb-foo'>TB</span>
          </div>
    </div>
    </div>
    

  </div>
    </>
  )
}



