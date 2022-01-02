import React,{useEffect,useState} from 'react'
import './CarCard.css';
import Model from '../classes/CarModel';
import { useHistory } from 'react-router';
const CarCard : React.FC<{content : Model}> = (props) => {
    const [image,setImage] = useState("");
    let history = useHistory();
    const openCarDetails = (modelName : string) => {
        history.push(`/models/${modelName}`);
    }
    useEffect(() => {
        setImage(require(`../images/${props.content.model}.png`).default);
    }, [props.content.model]);
    return (
        <div key={props.content.model} className="car_card" onClick={() => openCarDetails(props.content.model)}>
            <img src={image} alt="modelImg"/>
            <div className="car_card_details">
                <div className="car_card_model">
                    <p>{props.content.displayName ? props.content.displayName : 'NA'}</p>
                    <p>{props.content.range ? props.content.range : 'NA'} Mi</p>
                </div>
                <div className="car_card_misc">
                    <p>{props.content.acceleration?.time ? props.content.acceleration?.time : 'NA'}s</p>
                    <p>{props.content.topSpeed ? props.content.topSpeed : 'NA'} Mph</p>
                    <p>{props.content.peakPower ? props.content.peakPower : 'NA'} HP</p>
                    <p>$78490</p>
                </div>
                <div className="car_card_features">
                    <p>{props.content.acceleration?.speed ? props.content.acceleration?.speed : 'NA'}</p>
                    <p>Top Speed</p>
                    <p>Peak Power</p>
                    <p>Starts</p>
                </div>
            </div>
        </div>
    )
}

export default CarCard
