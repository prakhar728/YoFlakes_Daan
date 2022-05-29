import React, {  useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';

// IMPORTING COMPONENTS
import './StartCampaign.css';
import leafPng from '../../Assets/Leaf2.png';
import Loading from '../Loading/Loading';
//Create IPFS Client
const client = create('https://ipfs.infura.io:5001/api/v0');


const StartCampaign = ({ account, contracts }) => {
    const [headline, setHeadline] = useState('');
    const [details, setDetails] = useState('');
    const [date, setdate] = useState('');
    const [imageURL, setimageURL] = useState(null);
    const [loading, setloading] = useState(false);
    const [loadingMessage, setloadingMessage] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE1MjA4OTE5MTU4M0E2NDFiNGVFQ0JDQmZkMTlCYmZkQzE1Nzg5OGIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MTMyNjg3NjYsIm5hbWUiOiJEYWFuIn0.CNDFoyvv8XJbrH7QLhpmk_7hsYNUXhoEor0mVPpyNW4';
    const storage = new Web3Storage({ token: token });
    let navigate = useNavigate();

   
    const web3Upload = async (e) => {
        setloadingMessage('Uploading image to IPFS');
        setloading(true);
        e.preventDefault();
        const fileU = e.target.files;
        console.log(fileU);
        try {
            const rootCID = await storage.put(fileU);
            console.log(rootCID);
            console.log(fileU[0].name);
            console.log(`https://ipfs.io/ipfs/${rootCID}/${fileU[0].name}`);
            setimageURL(`https://ipfs.io/ipfs/${rootCID}/${fileU[0].name}`);
            setloading(false);
            setloadingMessage('');
        }
        catch (err) {
            console.log("Error with web3storage", err);
            setloading(false);
        }
    }
    const handleSubmit = async (e) => {
        setloadingMessage('Upload form data to IPFS');
        setloading(true);
        e.preventDefault();
        console.log(headline, details, date, imageURL);
        try {
            const result = await client.add(JSON.stringify({ imageURL, headline, details, date  }));
            console.log(`https://ipfs.io/ipfs/${result.path}`);
            console.log(result);
            setloading(false);
            setloadingMessage('');
            createFundraiser(`https://ipfs.io/ipfs/${result.path}`);
        }
        catch (err) {
            console.log(err);
        }
    }
    const createFundraiser = async (metadata) => {
        setloading(true);
        setloadingMessage('Creating fundraiser on blockchain');
        try{
            await (await contracts[0].createCampaign(metadata)).wait();
            const id = await contracts[0].campaignIDReturn();
            console.log(id);
            setloading(false);
            setloadingMessage('');
            navigate('/Donate')
        }
        catch(err){
            console.log(err);
        }
    }



    return (
        <div className='startWrapper'>
            {loading && <Loading message={loadingMessage} />}
            <div className='tagline'>
                Ready to start your own Fundraiser?
            </div>
            <div className='middleTagLineWrapper'>
                <div className='middleTagLine'>
                    <div className='subtaglineSub1'>No middleman. No Extra charges. No worries.</div>
                    <div className='subtaglineSub2'>Just fill up the form</div>
                </div>
            </div>

            {/* FORM BEGINS HERE */}
            <div className='fullFormWrapper'>
            <div><input placeholder='HeadLine of the Fundraiser' className='HeadlineHolder' value={headline} onChange={e => setHeadline(e.target.value)} /></div>
                <div className='organiseFormWrapper'>
                    {/* LEFT HALF TO HOLD UPLOAD,ADDRESS and DATE FORM */}
                    <div className='leftHalf'>
                        <div className='imageInputWrapper'>
                            <input onChange={web3Upload} type='file' className='imageInputElement' />
                        </div>
                        <div className='addressAndDateWrapper'>
                            <div><input placeholder='Date' type='date' className='dateHolder' value={date} onChange={e => setdate(e.target.value)} /></div>
                            <button className='submitButton' onClick={handleSubmit}>SUBMIT</button>
                        </div>
                    </div>
                    {/* Right HALF to store Event Headline and Details */}
                    <div className='rightHalf'>
                        <textarea placeholder='Fundraiser Details' className='detailHolder' value={details}
                            onChange={e => { setDetails(e.target.value) }} />
                    </div>
                </div>
            </div>
            <div className='leafWrapper'>
                <img src={leafPng} alt='leaves' className='leafImage' />
            </div>

        </div>
    )
}

export default StartCampaign