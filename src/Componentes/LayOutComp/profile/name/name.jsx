import React, { useContext } from 'react';
import { Container } from 'react-bootstrap/esm';
import { mediaContext } from '../../../../Context/MediaStore'; 
import styles from './name.module.scss';
import pp from '../../../../images/profile.png'; 

const Name = () => {
    const { userData } = useContext(mediaContext); 

    return (
        <Container className={`mt-4 ${styles.cont}`}>
            <div className="row">
                <div className={`col-md-2 col-3 ${styles.img}`}>
                    <img src={pp} alt="ProfilePicture" className={styles.profilep} />
                </div>
                <div className="col-md-10 col-9 mt-2">
                    <h4 className={styles.username}>Hello, {userData.userName ? `${userData.userName}` : "User"}
                     . Update your profile to make it truly yours!
                        </h4> 
                    <h4 className={styles.username}> {userData.email ? `${userData.email}` : ""}</h4> 
                </div>
            </div>
        </Container>
    );
}

export default Name;
