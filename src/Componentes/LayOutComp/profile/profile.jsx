import React, {  useEffect, useState } from 'react';
import { mediaContext } from './../../../Context/MediaStore';
import styles from './profile.module.scss'; 
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Footer from '../../Ui/Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Name from './name/name';
import Form from './form/form';
import Sidebar from './sideBar/sideBar';
function Profile() {
    return (
        
            <Container fluid className={styles.contain}>
                <div className="row">
                
                <div className={`col-lg-2 d-lg-block d-none ${styles.div1}`}>
                   <Container className={styles.side}>
                    <Sidebar className={styles.side}/>
                    </Container>
                </div>
                <div className={`col-lg-10 col-12 ${styles.div2}`}>
                   
                   <Container>
                     <Name/>
                     <Form/>
                    </Container>
                </div>
            </div>
            </Container>
        
    );
}
export default Profile