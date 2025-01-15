import React from 'react';
import { Container } from 'react-bootstrap';
import Styles from './paragraph.module.scss';
function Tourp(){
    return(
        // <Container>
        <div >
          <h1 className={Styles.h1}>Medical Tourism in Egypt - A Blend of Healing and Heritage</h1>
          <p className={Styles.p} >Egypt has emerged as a popular destination for medical tourism, offering high-quality healthcare services such as cosmetic surgery, dental treatments, and orthopedic procedures at competitive prices, all while allowing patients to experience the country’s rich history and cultural landmarks like the pyramids and the Nile, making it a unique blend of recovery and exploration.
          Egypt also attracts international patients seeking treatments for wellness therapies, combining affordability with the opportunity to explore its ancient wonders.
          </p>
        </div>
        // </Container>
    )
}
export default Tourp