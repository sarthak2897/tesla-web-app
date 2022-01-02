import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router';
import CarModelDetails from '../classes/CarModelDetail';
import LoadingPage from './LoadingPage';
import BackgroundImg from './BackgroundImg';
import './CarModelDetail.css';
import LinkButton from './LinkButton';
import BlackCar from '../images/black-car.png'
import Button from './Button';
import ErrorHandler from './ErrorHandler';
import Header from './Header';
const CarModelDetail = () => {
    const params :{ modelName : string} = useParams();
    const [modelDetails,setModelDetails] = useState<CarModelDetails>();
    const [loading, setLoading] = useState<boolean>(false);
    const [variant,setVariant] = useState<string | undefined>();
    const [image,setImage] = useState<string | undefined>();
    const [error,setError] = useState<string>('');
    useEffect(() => {
            setLoading(true);
            const fetchCarModelDetails = async () => {
                try{
                const list = await axios.get(`https://tesla-app-server.herokuapp.com/models/${params.modelName}`);
                setModelDetails(list.data);
                setVariant(list.data.variants[0].variantName);
                }
                catch(error){
                    setError(error.message);
                }
        }
            fetchCarModelDetails();
            setImage(require(`../images/${params.modelName}.png`).default);
            setLoading(false);
    },[params.modelName]);
     
    // useEffect(() => {
    //     setImage(require(`../images/${params.modelName}.png`).default);
    // },[]);

    
    const variantValue = (modelName : string) =>{
        setVariant(modelName);
    }
    
    return loading ? <LoadingPage/> : error.length > 0 ? <ErrorHandler message={error}/> : (
        <>
            <div>
                <BackgroundImg src={image} alt="background"/>
                <Header/>
                <div className="model_content">
                    <p>{modelDetails?.displayName}</p>
                    <LinkButton to={`/models/${modelDetails?.model}/configure`} color="transparent" content="Order" border="1px solid #FFFFFF"/>
                </div>
            </div>
            <div className="model_car_content">
                <div className="black_car">
                    <img src={BlackCar} alt="blackCar"/>
                </div>
                <div className="model_car_details">
                    <p>{modelDetails?.displayName} specs</p>
                    <div className="model_car_types">
                    {modelDetails?.variants?.map(model =>{   
                    return (
                        <Button key={modelDetails.displayName+model.range} bgColor="transparent" color="#FFFFFF" borderColor="" onClick={() => variantValue(model.variantName)}>{model.variantName}</Button>
                        )})}
                        {modelDetails?.variants?.map(model =>{
                            return model.variantName===variant && 
                            <div className="model_car_info" key={modelDetails.displayName}>
                                <div>
                                    <p>Range</p>
                                    <p>{model.range}</p>
                                    <p>Peak Power</p>
                                    <p>{model.peakPower}</p>
                                    <p>Top Speed</p>
                                    <p>{model.topSpeed}</p>
                                    <p>Weight</p>
                                    <p>{model.weight}</p>
                                    <p>Cargo Capacity</p>
                                    <p>{model.cargo}</p>
                                </div>
                                <div>
                                    <p>Power Train</p>
                                    <p>{model.powertrain}</p>
                                    <p>Acceleration</p>
                                    <p>{model.acceleration.time}s {model.acceleration.speed} mph</p>
                                    <p>Drag Coefficient</p>
                                    <p>{model.dragCoefficient}</p>
                                    <p>Wheels</p>
                                    <p>{model.wheels.join(' " or " ')}</p>
                                    <p>Charging</p>
                                    <p>{model.superchargingMax}</p>
                                </div>
                            </div>
                        })}
                    
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default CarModelDetail
