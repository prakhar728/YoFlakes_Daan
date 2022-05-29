import React from 'react'
import './Navbar.css';
import Logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import ContactUs from '../../Assets/Icons/ContactUS.svg';
import Wallet from '../../Assets/Icons/Wallet.svg';
import Profile from '../../Assets/Icons/Profile.svg';
const Navbar = ({ web3Handler}) => {
 

  return (
    <div className='navBarWrapper'>
      <div className='logoWrapper'>
        <img src={Logo} alt="Daan Logo" className='logoImage' />
      </div>
      <div className='linkWrapper'>
        <div><Link to='/'>Home</Link></div>
        <div><Link to='/Donate'>Donate</Link></div>
        <div><Link to='#about'>About Us</Link></div>
      </div>
      <div className='callandConnectWrapper'>
          <Link to='/profile'><img src={Profile} alt="Profile Visit" className='profileVisitImg'/></Link> 
          <img src={ContactUs} alt="Connect with Us"  className='contactUsImg'/>
          <img src={Wallet} alt="Connect to Wallet" className='walletConnectImg' onClick = { web3Handler }/>
    </div>
    </div >
  )
}

export default Navbar