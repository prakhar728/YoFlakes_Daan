import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Loading from '../Loading/Loading';
// import awardNft from '../AwardNft';
import './Donate.css';


const Donate = ({ contracts, signer }) => {
    // const [amount, setamount] = useState({});
    const [campaignsSet, setcampaignsSet] = useState(null);
    const [loading, setloading] = useState(true);
    const [loadingMessage, setloadingMessage] = useState('');
    useEffect(() => {
        loadFundRaisers();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let navigate = useNavigate();
    const navigateToStart = () => {
        navigate('/startcampaign')
    }
 
  
    const loadFundRaisers = async () => {
        setloadingMessage('Loading Fundraisers For you!');
        const campaignCount = await contracts[0].campaignIDReturn();
        let tempSet = {}
        for (let i = 0; i <= campaignCount - 1; i++) {
            tempSet[`${i}`] = 'F';
        }
        // setamount(tempSet);
        let campaigns = [];
        for (let i = 1; i <= campaignCount; i++) {
            const campaign = await contracts[0]._campaigns(i);
            console.log(campaign._amountRaised);
            const responseMetadata = await fetch(campaign[0]);
            const metadataJson = await responseMetadata.json();
            console.log(campaign[1]/1000000000000000000);
            campaigns.push({
                cid:i,
                date: metadataJson.date,
                details: metadataJson.details,
                headline: metadataJson.headline,
                imageURL: metadataJson.imageURL,
                address: metadataJson.address,
                raised: campaign[1]/1000000000000000000
            })
            console.log(campaigns);
            console.log(parseInt(campaign[1]));
        }
        setcampaignsSet(campaigns);
        setloading(false);
        setloadingMessage('');
    }
    if (loading)
        return <Loading message={loadingMessage} />
    return (
        <div className='donateWrapper'>
            <div className='donateTextWrapper'>
                Start your own fundraiser?
                <IconContext.Provider value={{ size: "40px", color: 'red' }}>
                    <AiFillPlusCircle onClick={navigateToStart} className='navigateToStart' />
                </IconContext.Provider>
            </div>
            <Outlet />
            {campaignsSet && campaignsSet.map((camp, id) => (
                <div className='fundraiserWrapperDummy' key={id}>
                    <div className='firstHalf'>
                        <img src={camp.imageURL} alt='Hands' className='fundRaiserImage' />
                    </div>
                    <div className='secondHalf'>
                        <div className='upperDetails'>
                            <div className='fundraiserHeading'>{camp.headline}</div>
                            <div className='fundsRaisedWrapper'><span className='fundsRaised'>Funds Raised :</span> {camp.raised} MATIC</div>
                        </div>
                        <div className='lowerDetails'>
                            <div className='fundraiserAbout'>{camp.details}
                            <Link to={`/Donate/${camp.cid}`} className='readMoreLink'>Read More</Link>
                            </div>
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
{/* TEMPLATE FOR FUNDRAISER CAMPAIGNs */ }
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
        </div >
    )
}

export default Donate