import React, { useEffect, useState } from 'react'
import './Profile.css';
const Profile = ({ nftContract, account }) => {
    const [nftArray, setnftArray] = useState([]) 
    const [loading, setloading] = useState(false);
    const [loadingMessage, setloadingMessage] = useState('');
    useEffect(() => {
        loadNFTS();


    }, [])

    const loadNFTS = async () => {
        setloadingMessage('Gathering your nfts');
        setloading(true);
        const nftCount = await nftContract.tokenCount();
        console.log(nftCount);
        let nfts = [];
        for (let i = 1; i <= nftCount; i++) {
            const nftOwner = await nftContract.ownerOf(parseInt(i));

            if (nftOwner.toUpperCase() === account.toUpperCase()) {
                const ipfsURIGained = await nftContract.tokenURI(i);
                console.log(ipfsURIGained);
                try {
                    const fetchedData = await fetch(ipfsURIGained);
                    const result = await fetchedData.json();
                    console.log(result);
                    nfts.push({
                        url: result.ipfsURIGained,
                        amount: result.amount,
                        campaignid: result.campaignId
                    }
                    )
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        setloading(false);
        setnftArray(nfts);
    }
    return (
        <div className='profileWrapper'>
            <div className='profileHeading'>
                Donations made till now
            </div>
            <div className='cardsWrapper'>
                {nftArray && nftArray.map((item,id)=>{
                    return(
                        <div className='cardWrapperss' key={id}>
                    <div className='cardImageWrapper'>
                        <img src={'https://ipfs.io/ipfs/bafybeicpi5ry5ugd54aevssv2rrh7dxmaxevmbgojadybtjh62hyeltgaa/DAAN_NFT.png'} alt='nft badge' className='cardImage' />
                    </div>
                    <div className='badgeDetails'>
                        <div className='amountGiven'>Amount :{item.amount} item ETH</div>
                        <div className='campaignId'>Campaign Id</div>
                        <div className='redText'>{item.campaignid}</div>
                    </div>
                </div>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default Profile