import React from 'react'
import './Loading.css';
import LoadingGif from '../../Assets/loading.gif'
const Loading = ({message}) => {
  return (
    <div className='loadingWrapper'>
      <div className='loadingBox'>
        <div className='loadingText'>Just few steps away from <br /> creating this world a <span className='redText'>better place</span> </div>
        <div><img src={LoadingGif} alt='Loading gif' className='loadingGifClass' /></div>
        <div className='loadingMessage'>
        {message && message}
      </div>
      </div>
      
    </div>
  )
}

export default Loading