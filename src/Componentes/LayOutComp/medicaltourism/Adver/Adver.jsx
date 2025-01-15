import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Adver.module.scss';
import { Container } from 'react-bootstrap/esm';
import health from '../../../../images/medicaltourism.jpg'
const Adver= () => {
    return (
        <Container className={[styles.cont, 'mt-4']}>
            <div className="row">
                <div className={['col-md-8 col-12', styles.first]}>
                    <div className={styles.firstCont}>
                        <h2 className={[styles.para]}>Rosheta</h2>
                        <p className={styles.para}>Discover the healing wonders of Egypt, where ancient traditions meet modern wellness, inviting you to rejuvenate your body and soul amidst breathtaking landscapes and rich history!</p>
                    </div>
                </div>
                <div className={['col-md-4 col-12 text-center', styles.second]}>
                    <img className={styles.img} src={health} alt="health" />
                </div>
            </div>
        </Container>


    )
}

export default Adver;