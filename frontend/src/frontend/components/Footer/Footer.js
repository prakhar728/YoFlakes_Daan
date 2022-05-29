import React from 'react'
import './Footer.css';
import logo from '../../Assets/Logo.svg';
const Footer = () => {
    return (
        <div className='footerWrapper'>
            <div className='mainSection'>
                <div className='upperSection'>
                    <div className='logoandMoto'>
                        <img src={logo} alt="logo footer" className='footerLogo'/>
                        <div className='footerMoto'>
                        We’re a team of enthusiasts. A developer and a designer. Our website will help people in need.
                        </div>
                    </div>
                </div>
                <div className='lowerSection'>
                    Created with Love By Team Yoflakes
                    <br />
                    For Hack GDSC2.0
                </div>
            </div>
        </div>
    )
}

export default Footer