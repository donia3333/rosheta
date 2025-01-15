import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Test.module.scss';
import { Container } from 'react-bootstrap/esm';
import test from '../../../../images/test.png';
import { Link } from 'react-router-dom';

const Test = () => {
    return (
        <Container className={[styles.cont, 'mt-4']}>
            <div className='row'>
                <div className={['col-md-6 col-12 ', styles.second]}>
                    <img className={styles.img} src={test} alt="health" />
                </div>
                <div className={['col-md-6 col-12 ', styles.first]}>
                    <div className={styles.firstCont}>
                        <h2>Upload Your Tests</h2>
                        <ul className={styles.paragraph}>
                            <li className={[styles.detail]}>
                                <i className="fa-solid fa-check fs-xl"></i>
                                <p>We offer a range of medical tests, including blood work, genetic screenings, and specialized diagnostics.</p>
                            </li><br />
                            <li className={[styles.detail]}>
                                <i className="fa-solid fa-check fs-xl"></i>
                                <p>Our experienced team ensures accurate and timely results using advanced technology.</p>
                            </li><br />
                            <li className={[styles.detail]}>
                                <i className="fa-solid fa-check fs-xl"></i>
                                <p>Whether for preventive care or monitoring, we prioritize your health and well-being.</p>
                            </li><br />
                            <li className={[styles.detail]}>
                                <i className="fa-solid fa-check fs-xl"></i>
                                <p>We provide a safe, confidential environment for all your medical testing needs.</p>
                            </li><br />
                        </ul>

                        <Link to="/MedicalTests"> 
                            <Button variant="success" className={styles.button}>
                                Upload
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Test;
