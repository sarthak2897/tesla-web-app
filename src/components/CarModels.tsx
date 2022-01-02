import React,{useState,useEffect} from 'react'
import TeslaLogo from './TeslaLogo'
import './CarModels.css'
import axios from 'axios';
import CarCard from './CarCard';
import Model from '../classes/CarModel';
import LoadingPage from './LoadingPage';
import ErrorHandler from './ErrorHandler';
const CarModels = () => {
    const [carModels,setCarModels] = useState<Model[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>('');
    useEffect(() => {
        setLoading(true);
        fetchCarModels();
        setLoading(false);
    }, []);

    const fetchCarModels = async () => {
        try{
            const list = await axios.get('https://tesla-app-server.herokuapp.com/models/all');
            setCarModels(list.data.elements);
        }
        catch(error){
            setError(error.message);
        }
    }
    
    //return (
        return loading  ? <LoadingPage/> :  error.length > 0 ? <ErrorHandler message={error}/>: <div className="cars">
        <TeslaLogo/>
        <p>ALL MODELS</p>
        <div className="cars_models">
            {carModels.map(model =>{
                return (
                    <CarCard key={model.displayName} content={model}/>
                )
                
            })} 
            </div>
        </div>
        //)
    }
export default CarModels
