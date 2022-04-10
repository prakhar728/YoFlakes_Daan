import React from 'react'
import './Home.css';
import homepageimg from '../../Assets/HomePage.png';
import blob from '../../Assets/Vector.png';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { HiCurrencyDollar } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { RiUserHeartLine } from 'react-icons/ri';
import { BiDonateHeart } from 'react-icons/bi';
import illustrationAbout from '../../Assets/SavingMoney.png';
const Home = () => {

  return (
    <div className='homeWrapper'>
      <div className='frame1'>
        <img src={blob} alt='blob' className='blobHome' />
        <div className='leftHalf'>
          <div className='homepagetext1'>Donate to Contribute</div>
          <div className='homepagetext2'>Let's build A <span className='redText'>Better World</span><br />Together!</div>
          <div className='tagLine'>We believe that only by joining hands we can make the world better and corruption fee. It's the duty of those who are in higher privelaged to help those in need.
            
          </div>
          <div className='buttonsWrapperHome'>
            <button className='donateFundWrapper'>Donate Fund</button>
            <button className='readMoreButton'>Read More</button>
          </div>
        </div>


        <div className='rightHalf'>
          <img src={homepageimg} alt='Homepage img' className='homepageimg' />
        </div>
      </div>
      <IconContext.Provider value={{ size: "30px", color: "white" }}>
        <div className='mapImage'>
          <div className='oneThird'>
            <div className='iconandNumber'><AiOutlineHeart /><span className='mapNumber'>5375</span></div>
            <div className='mapText'>Our Volunteer Family</div>
          </div>
          <div className='twoThird'>
            <div className='iconandNumber'><GiEarthAfricaEurope /><span className='mapNumber'>275</span></div>
            <div className='mapText'>Active Campaigns</div>
          </div>
          <div className='Third'>
            <div className='iconandNumber'><HiCurrencyDollar /><span className='mapNumber'>35M</span></div>
            <div className='mapText'>Money Donated</div>
          </div>
        </div>
      </IconContext.Provider>
      <div className='frame2'>
        <div className='frame2Header'><span className='redText'>LET'S MAKE A <br />DIFFERENCE TODAY!</span></div>
        <IconContext.Provider value={{ size: "30px" }}>
          <div className='frame2Cards'>
            <div className='cardWrapper'>
              <div className='card'>
                <div className='cardIcon'>
                  <BiDonateHeart />
                </div>
                <div className='cardPurpose'>Become a donator</div>
                <div className='cardText'>Join the<br /> community!</div>
                <div className='cardButton'>
                  <button className='cardBtn'>Explore campaigns</button>
                </div>
              </div>

            </div>
            <div className='cardWrapper'>
              <div className='card'>
                <div className='cardIcon'>
                  <RiUserHeartLine />
                </div>
                <div className='cardPurpose'>Need help?</div>
                <div className='cardText'>Reach out to <br /> us!</div>
                <div className='cardButton'>
                  <button className='cardBtn'>Connect with US</button>
                </div>
              </div>
            </div>


          </div>
        </IconContext.Provider>
      </div>
      <div className='aboutSection'>
        <div className='aboutHeader'>About Us</div>
        <div className='abouTagLine'>No middleman. No extra charges. No worries.</div>
        <div className='aboutFirstPara'>
          We, here at DAAN took matters into our own hands <br /> to prevent NGO frauds and fundraiser scams.
        </div>
        <div className='aboutTextWrapper'>
          <div className='firstLine'>
          </div>
          <div className='illustrationandTextWrapper'>
            <div >
              <img src={illustrationAbout} alt='aboutIllustration' className='illustrationAbout' />
            </div>
            <div className='textWrapperBig'>
              <div className='illustrationText1'>
                There are hundreds of Donation websites all <br/> around the world each helping people and <br/> working for a cause.
                <br />
                But amongst them are some, who in the name of <br/> donation keep the money for themselves and the <br/>people who need it never even get it.
                <br />
                The frauds and scams are a harsh reality of this <br/> world but YOU yourself have to decide how to<br/>avoid it.
              </div>

              <div className='blockchainAbout'>
                Through blockchain we offer <span className='redText'>
                transparency</span> <br /> to the donations made by the pure hearts. <br />So that YOU have the control and visibility <br /> of your money being used.
              </div>
            </div>
            </div>

          <div className='secondLine'>
          </div>
        </div>
        {/* <div className='philanthropySection'>
          <div className='philanthoryFirst'>

          </div>
          <div>

          </div>
          <div className='philanthorySecond'>

          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Home