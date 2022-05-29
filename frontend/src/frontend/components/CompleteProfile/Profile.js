import React, { useEffect, useState } from 'react'
import './Profile.css';
import profilePfp from '../../Assets/profilePfp.png';
import Hands from '../../Assets/Hands.png';
const Profile = ({ account,contracts }) => {
    const [Nfts, setNfts] = useState([]);
    useEffect(() => {
        const loadNfts = async () =>{
            console.log('loading nfts');
            let i
            try {
             i = await contracts[1].currentTokenId();
                
            } catch (error) {
                console.log(error);
            }
            console.log(i);
            let nfts = [];
            for(let loop =0;loop<=parseInt(i)-1;loop++){
                try {
                const currentNft = await contracts[1].tokenURI(loop);
                if((await contracts[1].ownerOf(loop)).toUpperCase()===(account.toUpperCase()))
                    {console.log(currentNft);
                    nfts.push(currentNft);}
                } catch (error) {
                    console.log(error);
                }
            }
            console.log(nfts);
            setNfts(nfts);
        }
      loadNfts()
    }, [contracts])
    
    
    return (
        <div className='profileWrapper'>
            <div className='leftProfile'>
                <div className='upperProfile'>
                    <div className='profileImag'>
                        <img src={profilePfp} alt="Profile" className='profileImg' />
                    </div>
                    <div className='profileDetails'>
                        <div className='wallaetId'>Wallet Id</div>
                        <div>{account}</div>
                    </div>
                </div>
                <div className='lowerProfile'>
                    <h3 className='headingProfile1'>Fundraisers Started Till Now</h3>
                    <div className='startedWrapperDummy'>
                        <div className='fundraiserWrapperDummy' >
                            <div className='firstHalfDummy'>
                                <img src={Hands} alt='Hands' className='fundRaiserImageDummy' />
                            </div>
                            <div className='secondHalfDummy'>
                                <div className='upperDetailsDummy'>
                                    <div className='fundraiserHeadingDummy'>Dummy Fundraiser 1 </div>
                                    <div className='fundsRaisedWrapperDummy'><span className='fundsRaisedDummy'>Funds Raised :</span> 5 MATIC</div>
                                </div>
                                <div className='lowerDetailsDummy'>
                                    <div className='fundraiserAboutDummy'>These are a lot of details about this Fundraiser. I could not display the actual data because the site is still a WIP. Please support US to complete it.
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rightProfile'>
                <h3 className='headingProfile1'>Incentives Earnt </h3>
                <div className='nftProfileWrapper'>
                    {Nfts && Nfts.map((nftUrl,id)=>(
                    <img src={nftUrl} alt="nft Badges Earned" key={id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile