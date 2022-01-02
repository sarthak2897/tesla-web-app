import React from 'react'
import '../components/Home.css';
import Header from './Header';
import BackgroundImg from './BackgroundImg';
import homeBackground from '../../src/images/m3-homepage-desktop-1.png'; 
import LinkButton from './LinkButton';
const Home = () => {
    return (
        <React.Fragment>
            <BackgroundImg src={homeBackground} alt="background"/>
            <Header/>
            <div className="home_content">
                <p>Electric Cars, Solar & Clean Energy</p>
                <LinkButton to="/models" color="#464646" content="ALL CARS" border="none"/>
            </div>
      </React.Fragment>
    )
}

export default Home
