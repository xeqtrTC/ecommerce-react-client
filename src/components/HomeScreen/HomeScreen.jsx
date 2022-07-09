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

export default function HomeScreen({ slides }) {
    const dispatch = useDispatch();
  const productList = useSelector( (state) => state.productList);
  const { loading, error, products } = productList
  console.log(products);

  const [current, setCurrent] = useState(0);
    const length = sliderData.length;

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
                  {/* 
                   LEVO OD TEKSTA, NAPRAVITI NA KLIL DA SE MENJA KONTEKT, BEZ VREMENA TRENUTNO.
                   MAKNUTI iz .homescreen-product ALIGN-ITEMS: CENTER;
                   MAKNUTI WIDTH: 100% IZ .homescreen-product-right;
                  <div className='homescreen-product-left'>
                      <div id='test' className='homescreen-product-left-item'>
                        <img src='../../../images/1649971918135.jpg' alt='slika' />                     
                        <div className='homescreen-product-left-item-product'>
                            <p id='test'>Razer Kraken V3</p>
                            <p id='test'>Gaming headphones</p>
                        </div>
                        <ArrowForwardIosOutlinedIcon />
                      </div>
                      <div className='homescreen-product-left-item'>
                        <img src='../../../images/1649971918135.jpg' alt='slika' />                     
                        <div className='homescreen-product-left-item-product'>
                            <p id='test'>Razer Kraken V3</p>
                            <p id='test'>Gaming headphones</p>
                        </div>
                        <ArrowForwardIosOutlinedIcon />
                      </div>
                      <div className='homescreen-product-left-item'>
                        <img src='../../../images/1649971918135.jpg' alt='slika' />                     
                        <div className='homescreen-product-left-item-product'>
                            <p id='test'>Razer Kraken V3</p>
                            <p id='test'>Gaming headphones</p>
                        </div>
                        <ArrowForwardIosOutlinedIcon />
                      </div>
                  </div> */}
                  <div className='homescreen-product-right'>
                      <div className='homescreen-product-right-name'>
                        <p>Razer Kraken V3</p>
                        <p>Gaming headphones</p>
                        <button className='homescreen-product-button'>Get it Now = $125</button>
                      </div>
                      <div className='homescreen-product-right-img'>
                        <img className='img-home' src='../../../images/1649971918135.jpg' alt='slika' />
                      </div>
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
                <img src={product.image} alt='slika' />
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
                <p>Shipping rates & policies</p>
                <p>Refunds & replacements</p>
                <p>Order tracking</p>
                <p>Delivery info</p>
                <p>Taxes & fees</p>
                <p>News</p>
            </div>
            <div className='footer-info-second-links'>
            <p className='footer-info-title'>User agreement</p>
                <p>Privacy policy</p>
                <p>Cookie policy</p>
                <p>Copyright policy</p>
                <p>Brand policy</p>
                <p>Community guidelines</p>
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
                <li>About us</li>
                <li>Support</li>
                <li>Terms of use</li>
                <li>Contact us</li>
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



