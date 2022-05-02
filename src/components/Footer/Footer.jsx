import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import TwitterIcon from '@mui/icons-material/Twitter';

import './Footer.css';
export default function Footer() {
  return (
    <div className='footer-absolute'>
    <div className='footer-info-container'>
    <div className='footer-info-first-container'>
        <div className='footer-info-first-links'>
          <p className='footer-info-title'>Shop departments</p>
          <p>Keyboards</p>
          <p>Headphones</p>
          <p>Laptops</p>
          <p>Smartphones</p>
          <p>Watches</p>

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
  </div>
  )
}
