import React, { useEffect, useState } from 'react'
import './Donate.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { IoSend } from 'react-icons/io5';
import hands from '../../Assets/Hands.png';
import { useNavigate } from "react-router-dom";
import Loading from '../Loading/Loading';
import { ethers } from 'ethers';
import awardNft from '../AwardNft';
const Donate = ({DonateContract,account,signer,nftContract}) => {
    const [amount, setamount] = useState({});
    const [campaignsSet, setcampaignsSet] = useState(null);
    const [loading, setloading] = useState(true);
    const [loadingMessage, setloadingMessage] = useState('');
    useEffect(() => {
        loadFundRaisers();
    }, []);
    let navigate = useNavigate();
    const navigateToStart = () =>{
        navigate('/startcampaign')
    }
    const changeAmount = (value,id) =>{
        let temp = amount;
        temp[id]=value;
        setamount(temp);
    }
    const sendMoney =async (e) =>{
        console.log(amount[e.id]);
        console.log(campaignsSet[e.id]);
        const tx = signer.sendTransaction({
            to: campaignsSet[e.id].address,
            value: ethers.utils.parseEther(amount[e.id])
        });
        console.log(e.id,parseInt(amount[e.id]));
        await(await DonateContract.makeDonation(e.id+1,parseInt(amount[e.id]))).wait();
        awardNft(e.id+1,amount[e.id],nftContract);
        loadFundRaisers();

    }
    const loadFundRaisers =async ()=>{
        setloadingMessage('Loading Fundraisers For you!');
        const campaignCount = await DonateContract.campaignIDReturn();
        let tempSet = {}
        for(let i=0;i<=campaignCount-1;i++){
            tempSet[`${i}`]='F';
        }
        setamount(tempSet);
        let campaigns = [];
        for(let i=1;i<=campaignCount;i++){
            const campaign = await DonateContract.campaigns(i);
            console.log(campaign._amountRaised);
            const responseMetadata = await fetch(campaign[0]);
            const metadataJson = await responseMetadata.json();
            campaigns.push({
                date:metadataJson.date,
                details:metadataJson.details,
                headline:metadataJson.headline,
                imageURL:metadataJson.imageURL,
                address:metadataJson.address,
                raised:parseInt(campaign[1])
            })
            console.log(parseInt(campaign[1]));
        }
        setcampaignsSet(campaigns);
        setloading(false);
        setloadingMessage('');
    }
   if(loading)
   return <Loading message={loadingMessage} />
    return (
        <div className='donateWrapper'>
            <div className='donateTextWrapper'>
                Start your own fundraiser?
                <IconContext.Provider value={{ size: "40px", color: 'red' }}>
                    <AiFillPlusCircle onClick={navigateToStart} className='navigateToStart'/>
                </IconContext.Provider>
            </div>
            {campaignsSet && campaignsSet.map((camp,id)=>(
                      <div className='fundraiserWrapper' key={id}>
                      <div className='firstHalf'>
                          <img src={camp.imageURL} alt='Hands' className='fundRaiserImage' />
                      </div>
                      <div className='secondHalf'>
                          <div className='fundraiserHeading'>{camp.headline}</div>
                          <div className='fundraiserAbout'>{camp.details}</div>
                      </div>
                      <div className='thirdHalf'>
                          <div className='fundsRaisedWrapper'><span className='fundsRaised'>Funds Raised :</span> {camp.raised} ETH</div>
                          <div className='donateWrapper'>
                              <div className='donateNowText'>DONATE NOW</div>
                              <div><input placeholder='Amount'   className='amountHolder' value={amount.id}
                              onChange={e=>{ changeAmount(e.target.value,id)}}
                               />
                                  <button className='buttonSend'
                                  onClick={e=>{sendMoney({id})}} >
                                      <IconContext.Provider value={{ size: "30px", color: 'red' }}>
                                          <IoSend className='icon' />
                                      </IconContext.Provider>
                                      </button></div>
                          </div>
                      </div>
                  </div>
            )
            )}
            {
                !campaignsSet && (
                    <div className='noFundRaiser'>
                        No Fundraiser Yet :(
                        </div>
                )
            }
            {/* TEMPLATE FOR FUNDRAISER CAMPAIGNs */}
            {/* <div className='fundraiserWrapper'>
                <div className='firstHalf'>
                    <img src={hands} alt='Hands' className='fundRaiserImage' />
                </div>
                <div className='secondHalf'>
                    <div className='fundraiserHeading'>Heading</div>
                    <div className='fundraiserAbout'>About</div>
                </div>
                <div className='thirdHalf'>
                    <div className='fundsRaisedWrapper'><span className='fundsRaised'>Funds Raised :</span> 45,000</div>
                    <div className='donateWrapper'>
                        <div className='donateNowText'>DONATE NOW</div>
                        <div><input placeholder='Amount' value={amount} onChange={e => setamount(e.target.value)} className='amountHolder' />
                            <button className='buttonSend'>
                                <IconContext.Provider value={{ size: "30px", color: 'red' }}>
                                    <IoSend className='icon' />
                                </IconContext.Provider></button></div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Donate