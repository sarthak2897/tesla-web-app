import React from 'react'
import './Button.css'
const Button : React.FC<{onClick : () => void,bgColor : string,color : string,borderColor : string}> = (props) => {
    return (
        <>
          <button onClick={props.onClick} className="button" style={{backgroundColor : `${props.bgColor}`,color : `${props.color}`, borderColor : `${props.borderColor}` }}>{props.children}</button>  
        </>
    )
}

export default Button

//,display : string | undefined,justify : string | undefined}