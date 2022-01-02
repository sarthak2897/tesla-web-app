import React from 'react'
import { useHistory } from 'react-router';
import logo from '../../src/images/brand.png';
import './TeslaLogo.css'
const TeslaLogo = () => {

    const history = useHistory();

    const navigateToHomePage = () => {
        history.push("/");
    }

    return (
        <>
            <img className="logo" src={logo} alt="logo" onClick={navigateToHomePage}/>
        </>
    )
}

export default TeslaLogo
