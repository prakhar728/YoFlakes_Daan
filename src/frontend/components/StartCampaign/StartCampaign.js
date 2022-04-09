import React, { useState, useEffect } from 'react';
import './StartCampaign.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import leafPng from '../../Assets/Leaf2.png';
import { create } from 'ipfs-http-client';
import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import axios from 'axios';
import { upload } from '@testing-library/user-event/dist/upload';
const client = create('https://ipfs.infura.io:5001/api/v0');


const StartCampaign = () => {
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [headline, setHeadline] = useState('');
    const [details, setDetails] = useState('');
    const [date, setdate] = useState('');
    const [files, setfiles] = useState([]);
    const [fileUploaded, setfileupload] = useState(null);
    const [imageDrop, setimageDrop] = useState(null);
    const token = '';

    const storage = new Web3Storage({ token })

    const uploadToIPFS = async (e) => {
        // e.preventDefault();
        const file = e;
        const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
    }

        {
            try {
                const result = await client.add(file.path)
                const { cid } = result;
                console.log(cid);
                console.log(result)
                setImage(`https://ipfs.io/ipfs/${result.path}`)
                console.log(`https://ipfs.io/ipfs/${result.path}`);
            } catch (error) {
                console.log("ipfs image upload error: ", error)
            }
        }
    }
   
    const uploadingnNow = async (file) => {
        console.log(file.path);

        try {
            const rootCID = await storage.put(file.path);
            console.log(rootCID);
        }
        catch (err) {
            console.log("Error with web3storage", err);
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles[0]);
            uploadToIPFS(acceptedFiles[0]);
            setfiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                ))
            console.log(acceptedFiles[0].preview);
            // web3StorageUpload(acceptedFiles[0].preview);
            setfileupload(true);
        }
    });
    const images = files.map(
        file => (
            <div key={file.name}>
                <div>
                    <img src={file.preview} style={{ width: '200px' }} alt="preview" className='imageDropHolder' />
                </div>
            </div>
        )
    )
    return (
        <div className='startWrapper'>
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
                <div className='organiseFormWrapper'>
                    {/* LEFT HALF TO HOLD UPLOAD,ADDRESS and DATE FORM */}
                    <div className='leftHalf'>
                        <div className='dropZoneWrapper'>
                            {!fileUploaded &&
                                <div {...getRootProps()} className='dropZoneSubWrapper' >
                                    <input   {...getInputProps()} onChange={e => uploadToIPFS(e.target.files[0])}
                                    />
                                    <div className='uploadTextholder'>
                                        <IconContext.Provider value={{ size: "60px" }}>

                                            <div><FaCloudUploadAlt className='uploadIcon' />
                                            </div>
                                        </IconContext.Provider>
                                        <div className='uploadText'>
                                            Upload Your Photo</div>
                                    </div>
                                </div>
                            }
                            {fileUploaded && <div className='dropImageWrapper'>
                                {images}
                            </div>}

                        </div>
                        <div className='addressAndDateWrapper'>
                            <div><input placeholder='Address' className='addressInputHolder' value={address} onChange={e => setAddress(e.target.value)} /></div>
                            <div><input placeholder='Date' type='date' className='dateHolder' value={date} onChange={e => setdate(e.target.value)} /></div>
                        </div>
                    </div>
                    {/* Right HALF to store Event Headline and Details */}
                    <div className='rightHalf'>
                        <div><input placeholder='HeadLine of the Fundraiser' className='HeadlineHolder' value={headline} onChange={e => setHeadline(e.target.value)} /></div>
                        <div><textarea placeholder='Fundraiser Details' className='detailHolder' value={details}
                            onChange={e => { setDetails(e.target.value) }} /></div>
                    </div>
                </div>
                <button className='submitButton'>SUBMIT</button>
            </div>
            <div className='leafWrapper'>
                <img src={leafPng} alt='leaves' className='leafImage' />
            </div>

        </div>
    )
}

export default StartCampaign