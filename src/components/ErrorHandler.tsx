import React from 'react'
import { useHistory } from 'react-router'
import Button from './Button'
import './ErrorHandler.css'
const ErrorHandler : React.FC<{message : string}> = (props) => {
    const history = useHistory();
    return (
            <div className="error">
            <p>{props.message}</p>
            <Button onClick={() =>history.goBack()} color="#FFFFFF" bgColor="#097BE4" borderColor="#097BE4">Go Back</Button>
        </div>
        
    )
}

export default ErrorHandler
