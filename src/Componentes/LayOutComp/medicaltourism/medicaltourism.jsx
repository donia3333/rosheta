import React from 'react'
import TourSlider from './slider/slider'
import Tourp from './paragraph/paragraph';
import Tourcards from './cards/cards';
import Features from './features/features';
import Adver from './Adver/Adver';
function MedicalTourism(){
    return(
        <>
           <TourSlider/>
           <Tourp/>
           <Tourcards/>
           <Adver/>
           <Features/>
        </>
    )
}

export default MedicalTourism;