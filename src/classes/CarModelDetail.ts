export default interface carModelDetail {
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
                superchargingMax : string
            }
        ] 
}