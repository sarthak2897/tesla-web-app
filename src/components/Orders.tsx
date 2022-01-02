import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Header from './Header'
import greenTick from '../images/check-mark.png';
import cartoon from '../images/order-complete.png';
import './Orders.css'
import CarOrderDetail from '../classes/CarOrderDetail';
import axios from 'axios';
import LocationState from '../classes/orders';
import LoadingPage from './LoadingPage';
import Button from './Button';
import ImgButton from './ImgButton';
import ErrorHandler from './ErrorHandler';
const Orders = () => {
    const [carDetails,setCarDetails] = useState<CarOrderDetail>();
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>('');
    const state = useLocation().state as LocationState; 
    const history = useHistory();


    useEffect(() =>{
        setLoading(true);
        const fetchAllDetails = async () => {
            try{
            const list = await axios.get(`https://tesla-app-server.herokuapp.com/models/${state.modelName}/configure`);
            setCarDetails(list.data);
            }
            catch(error){
                setError(error.message);
            }
    }
        fetchAllDetails();
        setLoading(false);
    },[state.modelName]);

    
    
    return loading ? <LoadingPage/> : error.length > 0 ? <ErrorHandler message={error}/>: (
        <div className="orders_page">
            <Header/>
            <div className="orders_status">
                <img src={greenTick} alt="greenTick" className="green_tick_img"/>
                <p>Your Order is complete</p>
            </div>
            <img src={cartoon} alt="cartoonImg" className="cartoon_img"/>
            <p className="heading">{state.modelName}</p>
            {carDetails?.variants.map(model=>{
                return model.variantName === state.variant && 
                <div className="cars_specs"  key={carDetails.displayName+model.price}>
                    <div>
                        <p>{model.range} mi</p>
                        <p>Est Range</p>
                    </div>
                    <div>
                        <p>{model.topSpeed} mph</p>
                        <p>Top Speed</p>
                    </div>
                    <div>
                        <p>{model.acceleration.time} sec</p>
                        <p>{model.acceleration.speed} mph</p>
                    </div>
                </div>
            })}
            <img src={require('../images/model1-order.png').default} alt="carImg" className="car_img"/>
            {carDetails?.variants.map(model => {
                return model.variantName === state.variant && 
                <div className="cars_variant">
                <Button  key={carDetails.displayName+model.price} bgColor="transparent" color="#000000" borderColor="#097BE4" onClick={() => {}}>
                    <p><span>{model.variantName}+</span><span>${model.price.toLocaleString()}</span></p> 
                </Button>
            </div>
            })}
            {carDetails?.paints.map(paint => {
                return paint.name === state.carPaint && <div className="orders_paint"  key={carDetails.displayName+paint.price}>
                        <div>
                            <p>{paint.name} multi coat</p>
                            <p>{paint.price > 0 ? `$${paint.price}` : "Included"}</p>
                        </div>
                        <div>
                            <ImgButton onClick={() => {}} src={paint.src} alt="carPaint"/>
                        </div>
                </div>})}
            {carDetails?.wheels.map(wheel =>{
                return wheel.name === state.carWheel && <div className="orders_wheel"   key={carDetails.displayName+wheel.price}>
                        <div>
                            <p>{wheel.name}</p>
                            <p>{wheel.price > 0 ? `$${wheel.price}` : "Included"}</p>
                        </div>
                        <div>
                            <ImgButton onClick={() => {}} src={wheel.src} alt="carWheel"/>
                        </div>
                </div>
            })}
            {state.selfDrive === true && <div className="orders_self_drive">
                        <div>
                            <p>Full Self Driving Capabilities</p>
                            <p>${carDetails?.selfDriving.price.toLocaleString()}</p>
                        </div>
                        <div>    
                        </div>
                </div>}
                <div>
                <Button bgColor="transparent" color="#000000" borderColor="#097BE4" onClick={() => {}}>
                    <p>${state.price.toLocaleString()}</p> 
                </Button>
                <div className="nav_buttons">
                    <Button onClick={() =>history.goBack()} color="#FFFFFF" bgColor="#097BE4" borderColor="#097BE4">Explore {state.modelName}</Button>
                    <Button onClick={() => {}} color="#FFFFFF" bgColor="#464646" borderColor="#464646">Download Invoice</Button>
                </div>
            </div>
        </div>
    )
}

export default Orders
