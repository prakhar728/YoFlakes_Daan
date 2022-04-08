import React, { useState } from 'react';
import './StartCampaign.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";

const StartCampaign = () => {
    const [files, setfiles] = useState([]);
    const [fileUploaded, setfileUploaded] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setfiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
            setfileUploaded(true);
        }
    });
    const images = files.map(
        file => (
            <div key={file.name}>
                <div>
                    <img src={file.preview} style={{ width: '200px' }} alt="preview" />
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
            <div className='organiseFormWrapper'>
                <div className='leftHalf'>
                    <div className='dropZoneWrapper'>
                        <div {...getRootProps()} className='dropZoneSubWrapper' >
                            <input {...getInputProps()} />
                            {!fileUploaded && <div className='uploadTextholder'>
        <IconContext.Provider value={{ size: "60px" }}>

                                <div><FaCloudUploadAlt className='uploadIcon' />
                                </div>
                                </IconContext.Provider>
                                <div className='uploadText'>
                                    Upload Your Photo</div>
                                    </div>}
                        </div>
                        <div>
                            {images}
                        </div>
                    </div>
                    <div>
                        <div><input placeholder='Address' className='addressInputHolder' /></div>
                        <div><input placeholder='Date' type='date' className='dateHolder'/></div>
                    </div>
                </div>
                <div className='rightHalf'>
                    <div><input placeholder='HeadLine of the event' className='HeadlineHolder'/></div>
                    <div><input placeholder='Fundraiser Details' className='detailHolder' /></div>
                </div>
            </div>
            <button>SUBMIT</button>
        </div>
    )
}

export default StartCampaign