import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusamus itaque saepe, delectus sed libero. Eligendi modi eum ut, aperiam vitae sapiente quasi quidem natus quod nam tempore quo reiciendis.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 5634879822</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
