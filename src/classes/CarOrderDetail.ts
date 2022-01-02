export default interface CarOrderDetail {
    model : string,
    displayName : string,
    variants : [
        {
            variant : string,
            variantName : string,
            range : number,
            peakPower : string,
            wheels : [],
            cargo : string,
            weight : number,
            acceleration : {
                speed : string,
                time : number
            },
            topSpeed : number,
            dragCoefficient : string,
            powertrain : string,
            superchargingMax : string,
            price : number
        }
    ] ,
    paints : [
        {
            name : string,
            price : number,
            default : boolean,
            src : string
        }
    ],
    wheels : [
        {
            name : string,
            price : number,
            default : boolean,
            src : string
        }
    ],
    selfDriving : {
        available : boolean,
        default : boolean,
        price : number
    }
}