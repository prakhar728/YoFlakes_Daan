
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import { useState } from 'react';
import {ethers} from 'ethers';
import StartCampaign from './StartCampaign/StartCampaign';
function App() {
  const [account, setaccount] = useState(null);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setaccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    console.log(accounts[0]);
    
    // loadContracts(signer);
  }

  // const loadContracts = (signer) => {
  //   const marketplace = new ethers.Contract(MarketplaceAddress.address, MartketplaceAbi.abi, signer);
  //   setmarketplace(marketplace);
  //   const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
  //   setNft(nft);
  //   setloading(false);

  // }
  return (
    <BrowserRouter>
    <Navbar web3Handler={web3Handler} account={account}/>
    <Routes>
        <Route index element={<Home />} />
        <Route path='/startcampaign' element={<StartCampaign />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
