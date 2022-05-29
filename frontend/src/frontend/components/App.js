
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import { ethers } from 'ethers';

// IMPORTING COMPONENTS
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import StartCampaign from './StartCampaign/StartCampaign';
import Donate from './Donate/Donate';
import Loading from './Loading/Loading';
import Profile from './CompleteProfile/Profile';

// IMPORTING CONTRACTS AND DATA
import FundraiserAddress from '../../contractsData/FundRaiser-address.json';
import FundraiserABI from '../../contractsData/FundRaiser.json';
import NftAddress from '../../contractsData/DaanNFT-address.json';
import NftAbi from '../../contractsData/DaanNFT.json';
import CampaignSingle from './CampaignSingle/CampaignSingle';

function App() {


  const [account, setaccount] = useState(null);
  const [loading, setloading] = useState(true);
  const [signerState, setsignerState] = useState(null);
  const [contracts, setcontracts] = useState([]);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setaccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    setsignerState(signer);
    console.log(accounts[0]);

    loadContracts(signer);
  }

  const loadContracts = (signer) => {
    var contractsData = [];
    const Fundraiser = new ethers.Contract(FundraiserAddress.address, FundraiserABI.abi, signer);
    contractsData.push(Fundraiser);
    const nftContract = new ethers.Contract(NftAddress.address, NftAbi.abi, signer);
    contractsData.push(nftContract);
    console.log(contractsData);
    setcontracts(contractsData);
    setloading(false);
  }
  return (
    <BrowserRouter>
      <Navbar web3Handler={web3Handler} account={account} />
      {loading ? (
        <Loading message={'Connect to Metamask!'} />
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path='/startcampaign' element={<StartCampaign account={account} contracts={contracts} />} />
          <Route path='/donate' element={<Donate account={account} contracts={contracts} signer={signerState} />} />
          
          <Route path="/donate/:campaignId" element={<CampaignSingle contracts={contracts}  signer={signerState} account={account} />} />

          <Route path='/profile' element={<Profile account={account} contracts={contracts} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
