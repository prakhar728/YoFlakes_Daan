import React from 'react'
import './Navbar.css';
import Logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import { MdWifiCalling3 } from "react-icons/md";
import { IconContext } from "react-icons";

const Navbar = ({ web3Handler, account }) => {

  return (
    <div className='navBarWrapper'>
      <div className='logoWrapper'>
        <img src={Logo} alt="Daan Logo" className='logoImage' />
      </div>
      <div className='linkWrapper'>
        <div><Link to='/Home'>Home</Link></div>
        <div><Link to='/About'>About Us</Link></div>
        <div><Link to='/Donate'>Donate</Link></div>
      </div>
      <div className='callandConnectWrapper'>
        <IconContext.Provider value={{ size: "40px" }}>
          <div><MdWifiCalling3 className='callIcon' /></div>
        </IconContext.Provider>
        <div className='buttonWrapper'>
          {account ? (
            <a href={`https://etherscan.io/address/${account}`}
            className='accountHolder' >
               {account.slice(0, 5) + '...' + account.slice(38, 42)}
               </a>
          ): (
              <button className = 'connectToWalletButton' onClick = { web3Handler }>CONNECT</button>
          )}

      </div>
    </div>
    </div >
  )
}

export default Navbar