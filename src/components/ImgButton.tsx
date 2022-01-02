import React from 'react'
import './ImgButton.css'
const ImgButton : React.FC<{src : string,onClick : () => void,alt : string}> = (props) => {
    return (
        <>
          <input type="image" className="input" src={props.src} onClick={props.onClick} alt={props.alt}/>  
        </>
    )
}

export default ImgButton
