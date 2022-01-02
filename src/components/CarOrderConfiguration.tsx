import React,{useEffect,useState} from 'react'
import { useHistory, useParams } from 'react-router'
import BackgroundImg from './BackgroundImg'
import Header from './Header'
import './CarOrderConfiguration.css'
import axios from 'axios'
import CarOrderDetail from '../classes/CarOrderDetail'
import LoadingPage from './LoadingPage'
import Button from './Button'
import ImgButton from './ImgButton'
import SelfDriveFeatures from './SelfDriveFeatures'
import ErrorHandler from './ErrorHandler'

const CarOrderConfiguration = () => {
    const [image,setImage] = useState<string | undefined>();
    const params : {modelName : string} = useParams();
    const [loading,setLoading] =useState(false);
    const [carOrderDetails,setCarOrderDetails] = useState<CarOrderDetail>();
    const [variant,setVariant] = useState<string | undefined>();
    const [carPaint,setCarPaint] = useState<string | undefined>();
    const [carWheel,setCarWheel] = useState<string | undefined>();
    const [selfDrive,setSelfDrive] = useState<boolean>(false);
    const [error,setError] = useState<string>('');
    const history = useHistory();
    useEffect(() => {
        setLoading(true);
        const fetchCarOrderDetails = async () => {
            try{
            const list = await axios.get(`https://tesla-app-server.herokuapp.com/models/${params.modelName}/configure`);
            setCarOrderDetails(list.data);
            setVariant(list.data.variants[0].variantName);
            setCarPaint(list.data.paints[0].name);
            setCarWheel(list.data.wheels[0].name);
            }
            catch(error){
                setError(error.message);
            }
    }
        fetchCarOrderDetails();
        setLoading(false);
        setImage(require('../images/model1-order.png').default);
    }, [params.modelName]);

    const changeCarVariant = (variantName : string,price : number) =>{
        setVariant(variantName);
        setImage(require('../images/model2-order.png').default);
    }
    const changeCarWheels = (wheelType : string,price : number) => {
        setCarWheel(wheelType);    
    }
    const changeCarPaint = (paintName : string,price : number) => {
        setCarPaint(paintName);
    }
    
    const toggleSelfDrivingFeatures = () => {
            setSelfDrive(!selfDrive);
    }
    const orderCar = () => {
        let price : number = 0;
        carOrderDetails?.variants.forEach(model =>{
            if(model.variantName === variant)
                price+=model.price;
        });
        carOrderDetails?.paints.forEach(paint =>{
            if(paint.name === carPaint)
                price+=paint.price;
        });
        carOrderDetails?.wheels.forEach(wheel =>{
            if(wheel.name === carWheel)
                price+=wheel.price;
        });
        if(selfDrive === true)
            price+=10000;
        console.log(price);
        history.push({pathname:'/orders',state:{'modelName':carOrderDetails?.model,'variant':variant,'carPaint' : carPaint,'carWheel':carWheel,'selfDrive':selfDrive,'price' : price}});
    }
    return loading ? <LoadingPage/> : error.length > 0 ? <ErrorHandler message={error}/> : (
        <div className="cars_configure">
            <div className="cars_image" key={carOrderDetails?.displayName}>
                <BackgroundImg src={image} alt="background"/>
                <Header/>
            </div>
            <div className="cars_content">
                <p>{carOrderDetails?.displayName}</p>
                {carOrderDetails?.variants.map(model =>{
                return model.variantName===variant && (<div className="cars_specs" key={carOrderDetails.displayName+model.price}>
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
                </div>)})}
                {carOrderDetails?.variants.map(model =>
                    <div className="cars_variants">
                        <Button key={carOrderDetails.displayName+model.price} bgColor="transparent" color="#000000" borderColor="" onClick={() => changeCarVariant(model.variantName,model.price)}>
                            <p><span>{model.variantName}</span><span>${model.price}</span></p> 
                        </Button>
                    </div>
                )}
                 <p className="heading">Paint</p>
                 <div className="cars_paint">
                 {carOrderDetails?.paints.map(paint =>
                    <ImgButton key={carOrderDetails.displayName+paint.price} onClick={() => changeCarPaint(paint.name,paint.price)} src={paint.src} alt="carPaint"/>
                 )}
                 </div>
                 {carOrderDetails?.paints.map(paint => {
                     return paint.name === carPaint && <div className="cars_paint_details"  key={carOrderDetails.displayName+paint.price}>
                         <p>{paint.name} multi coat</p>
                         <p>{paint.price > 0 ? `$${paint.price}` : "Included" }</p>
                     </div>
                 })}
                 <p className="heading">Wheels</p>
                 <div className="cars_wheels">
                     {carOrderDetails?.wheels.map(wheel => 
                         <ImgButton key={carOrderDetails.displayName+wheel.price} onClick={() => changeCarWheels(wheel.name,wheel.price)} src={wheel.src} alt="carWheelType"/>
                      )}
                 </div>
                {carOrderDetails?.wheels.map(wheel => {
                    return wheel.name === carWheel && <div className="cars_wheel_details" key={carOrderDetails.displayName+wheel.price}>
                        <p>{wheel.name} multi coat</p>
                        <p>{wheel.price > 0 ? `$${wheel.price}` : "Included" }</p>
                    </div>
                })}
                <p className="heading">Full Self-Driving Capabilities</p>
                {carOrderDetails?.selfDriving.available=== true ? <SelfDriveFeatures/> : null}
                {selfDrive ? <Button onClick={() => toggleSelfDrivingFeatures()} bgColor="#464646" color="#FFFFFF" borderColor="#464646">Remove</Button> : <Button onClick={() => toggleSelfDrivingFeatures()} bgColor="#097BE4" color="#FFFFFF" borderColor="#097BE4">Add</Button>}
                <p>{selfDrive ? `+$${carOrderDetails?.selfDriving.price}` : null}</p>
                <div className="cars_order_completion">
                    <p>Order your {carOrderDetails?.displayName}</p>
                    <p>Estimated Delivery : 6 to 8 weeks</p>
                </div>
                <Button onClick={() => orderCar()} bgColor="#097BE4" color="#FFFFFF" borderColor="#097BE4">Order</Button>
            </div>
        </div>
    )
}

export default CarOrderConfiguration
