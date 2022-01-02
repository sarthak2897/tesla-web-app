import React from 'react'
import { Link } from 'react-router-dom'
import './LinkButton.css'
const LinkButton : React.FC<{to : string,color : string,content : string | undefined,border : string}> = (props) => {
    return (
        <>
          <Link className="button" to={props.to} style={{backgroundColor: `${props.color}`,border : `${props.border}` }}>{props.content}</Link>  
        </>
    )
}

export default LinkButton
