import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0');

const awardNft =async (campaignId,amount,nftContract) => {
    const ipfsNFTURl = 'https://ipfs.io/ipfs/bafybeicpi5ry5ugd54aevssv2rrh7dxmaxevmbgojadybtjh62hyeltgaa/DAAN_NFT.png';
    const uploadToIpfs = await client.add(JSON.stringify({ipfsNFTURl,campaignId,amount}));
    await(await nftContract.mint(`https://ipfs.io/ipfs/${uploadToIpfs.path}`)).wait();
    console.log('Unga bunga');
    return;
}

export default awardNft