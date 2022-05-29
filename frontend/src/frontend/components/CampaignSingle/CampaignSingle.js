import React, { useEffect, useState } from 'react'
import './CampaignSingle.css';
import { IconContext } from 'react-icons';
import { IoSend } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { BigNumber, ethers } from 'ethers';
import FundraiserAddress from '../../../contractsData/FundRaiser-address.json';
import axios from 'axios';

const CampaignSingle = ({ contracts, signer,account }) => {


  const [amount, setamount] = useState('');
  const [campaignHeader, setcampaignHeader] = useState('');
  const [aboutCampaign, setaboutCampaign] = useState('');
  const [image, setimage] = useState('');
  const [donationsMade, setdonationsMade] = useState('')
  let params = useParams();

  useEffect(() => {
    const loadData = async()=>{
      await getCampaignData();
    }
    loadData();
  }, [])
  
  const rewardNFt = (address,amount,id) =>{
    console.log('Rewarding NFT');
    axios.post('http://localhost:5001/awardNFT',{
    Name:account,
    campaignID:params.campaignId,
    amountDonated:amount
    })
    .then(res=>{
      console.log('Rewarded');
    })
    .catch(err=>{
      console.log(err);
    })

  }
  const changeAmount = (value) => {
    console.log( ethers.utils.parseEther(value))
    setamount(value);
  }
  const sendMoney = async (e) => {
    console.log('Sending your money');
    const tokenAddress = await contracts[0].tokenAddress();

      const tx = signer.sendTransaction({
       to: tokenAddress,
      value: ethers.utils.parseEther(amount),
     gasLimit: 50000
     });
    console.log(tx);
    console.log(await contracts[0].tokenAddress());
    console.log(parseInt(amount));
    try {
      await (await contracts[0].makeDonation(params.campaignId, ethers.utils.parseEther(amount),{
        gasLimit: 50000
      })).wait();
   rewardNFt(account,amount,params.campaignId);
    } catch (error) {
      console.log(error);
    }
  }

  const getCampaignData = async () => {
    const campaign = await contracts[0]._campaigns(params.campaignId);
    const responseMetadata = await fetch(campaign[0]);
    const metadataJson = await responseMetadata.json();
    setaboutCampaign(metadataJson.details);
    setcampaignHeader(metadataJson.headline);
    setimage(metadataJson.imageURL);
    console.log(BigNumber.from(params.campaignId));
    const donationsMadeTill = contracts[0].filters.DonatedToCompaign(null,BigNumber.from(params.campaignId));
    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/v1/8672801189d10b2b2b6d4a3fae5c9e166a94c96f'); 
    const log =await provider.getLogs({
      fromBlock:26504526,
      toBlock:'latest',
      address: FundraiserAddress.address,
      topic:contracts[0].interface.events.DonatedToCompaign
    })
    console.log(log);
    console.log('Getting Details');
  }

  return (
    <div className='singleCampaignWrapper'><div
      className='trueWrapperCampaign'>
      <div className='leftCampaign'>
        <div className='imgHeadline'>
          <img src={image} alt="campaignTitle" className='campaignTitleImg' />
          <div className='campaignHeadlineSingle'>{campaignHeader}</div>
        </div>
        <div className='properCampaignAbout'>
          {aboutCampaign}
        </div>
        <div className='DonatingAndProposing'>
          <input placeholder='Amount' className='amountHolder' value={amount.id}
            onChange={e => { changeAmount(e.target.value) }}
          />
          <button className='buttonSend'
            onClick={e => { sendMoney() }} >
            <IconContext.Provider value={{ size: "30px", color: 'red' }}>
              <IoSend className='icon' />
            </IconContext.Provider>
          </button>
        </div>
      </div>
      <div className='rightCampaign'>
        <div className='donationsMadeHeading'>
          <div>Address Donated</div>
          <div>Amt</div>
        </div>
        <div className='donationMadeRow'>
          <div className='dAd'>0x4685bD39864BC5088506928114245B9233257972</div>
          <div>25</div>
        </div>
      </div>
    </div>
    </div >
  )
}

export default CampaignSingle