
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
import DonateAddress from '../contractsData/Organise-address.json';
import DonateABI from '../contractsData/Organise.json';
import NFTAddress from '../contractsData/NFT-address.json';
import NFTAbi from '../contractsData/NFT.json';
import Donate from './Donate/Donate';
import Loading from './Loading/Loading';

function App() {
  const [account, setaccount] = useState(null);
  const [loading, setloading] = useState(true);
  const [donateContract, setDonateContract] = useState(null);
  const [nftContract, setnftContract] = useState(null);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setaccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    console.log(accounts[0]);
    
    loadContracts(signer);
  }

   const loadContracts = (signer) => {
     const Donate = new ethers.Contract(DonateAddress.address, DonateABI.abi, signer);
     console.log(Donate);
     setDonateContract(Donate);
     const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
     setnftContract(nft);
     setloading(false);
   }
  return (
    <BrowserRouter>
    <Navbar web3Handler={web3Handler} account={account}/>
    {loading?(
      <Loading message={'Connect to Metamask!'}/>
    ):(
      <Routes>
      <Route index element={<Home />} />
      <Route path='/startcampaign' element={<StartCampaign account={account} DonateContract={donateContract} />} />
      <Route path='/donate' element={<Donate account={account} DonateContract={donateContract} />} />
  </Routes>
    )}
   
  </BrowserRouter>
  );
}

export default App;
