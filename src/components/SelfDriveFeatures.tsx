import React from 'react'
import './SelfDriveFeatures.css'
const SelfDriveFeatures = () => {
    const features = ['Navigate on Autopilot','Auto Lane Change','Autopark','Summon','Full Self-Driving Computer','Traffic Light and Stop Sign Control'];
    return (
        <div className="cars_self_drive_features">
                    {features.map(feature => 
                        <p key={feature}>{feature}</p>
                    )}
                </div>
    )
}

export default SelfDriveFeatures
