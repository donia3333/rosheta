import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../../../images/drug.jpeg';
import img3 from '../../../../images/drugs.jpeg'; 
import img2 from '../../../../images/prod.jpeg'; 
import Styles from './Slide.module.scss';

function Slider() {
  return (
    <div className={Styles.container}>
      <Carousel>
        <Carousel.Item>
          <img
            src={img1}
            alt="First slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
         <Carousel.Item>
          <img
            src={img2}
            alt="Second slide"
            className={Styles.sliders}
          />
        </Carousel.Item> 
        <Carousel.Item>
          <img
            src={img3}
            alt="Third slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
        
      </Carousel>
      </div>
    // </Container>
  );
}

export default Slider;
