import React from 'react';
import styles from './MedicalTourism.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap/esm';
import lake from '../../../../images/lake.jpeg';
import sand from '../../../../images/desert.webp';
import siwa from '../../../../images/siwa.webp';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MedicalTourism = () => {
  return (
    <Container className={styles.main}>
      <div className="row">
        <div className="col-md-6 col-12">
          <Carousel>
            <Carousel.Item>
              <img className={styles.img} src={lake} alt="Lake" />
            </Carousel.Item>
            <Carousel.Item>
              <img className={styles.img} src={sand} alt="Sand" />
            </Carousel.Item>
            <Carousel.Item>
              <img className={styles.img} src={siwa} alt="Siwa" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6 col-12 mt-2">
          <h2>Medical tourism:</h2>
          <p>
            Medical tourism in Egypt has become increasingly popular due to its high-quality healthcare services at competitive prices. The country offers a variety of treatments, including cosmetic surgery, dental care, and specialized medical procedures, supported by well-trained professionals and modern facilities. Major cities like Cairo and Sharm El Sheikh attract patients who can combine medical care with tourism, enjoying Egypt's rich culture and beautiful landscapes. This growing sector positions Egypt as a preferred destination for those seeking affordable and quality medical treatments abroad.
          </p>
          <Link to="/MedicalTourism" className='text-decoration-none'>
            <Button
              variant="success"
              className={styles.button}
              onClick={() => window.scrollTo(0, 0)} 
            >
              Explore <FontAwesomeIcon icon={faMagnifyingGlass} size="x" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default MedicalTourism;
