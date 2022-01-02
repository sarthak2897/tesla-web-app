import React from 'react'

const BackgroundImg : React.FC<{src : string | undefined,alt : string}> = (props) => {
    return (
        <>
            <img className="home_img" src={props.src} alt={props.alt}/>
        </>
    )
}

export default BackgroundImg
