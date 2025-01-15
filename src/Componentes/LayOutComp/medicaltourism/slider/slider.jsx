import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img13 from '../../../../images/cleopatra.jpg';
import img12 from '../../../../images/unnamed.jpg';
import img11 from '../../../../images/photo.jpg';
import Styles from './slider.module.scss';

function TourSlider() {
  return (
    
    <div className={Styles.container}>
      <Carousel>
        <Carousel.Item>
          <img
            src={img13}
            alt="First slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
         <Carousel.Item>
          <img
            src={img12}
            alt="Second slide"
            className={Styles.sliders}
          />
        </Carousel.Item> 
        <Carousel.Item>
          <img
            src={img11}
            alt="Third slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
 
       
      </Carousel>
      </div>
    


  );
}

export default TourSlider;
