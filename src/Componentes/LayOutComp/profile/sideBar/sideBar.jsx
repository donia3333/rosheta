import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mediaContext } from '../../../../Context/MediaStore'; 
import styles from './sideBar.module.scss'; 
import { Button } from 'react-bootstrap';

const Sidebar = () => {
    const { userData, LogOut,Role } = useContext(mediaContext);
    const userEmail = userData?.email || 'Guest'; 
    const userName = userData?.userName || 'Guest'; 

    return (
        <div className={styles.cont}>
            <div className={styles.sidebar}>
                <h2 className={styles.greeting}> {userName}</h2>
                <p className={styles.email}>{userEmail}</p>
                <nav className={styles.nav}>
                    <ul>
                        {Role==='user'&&
                        <li>
                            <Link to="/cart" className={styles.link}>
                                <i className={`${styles.icon} fas fa-shopping-cart`}></i> Cart
                            </Link>
                        </li>}
                        {Role==='user'&&
                        <li>
                            <Link to="/wishlist" className={styles.link}>
                                <i className={`${styles.icon} fas fa-heart`}></i> Wishlist
                            </Link>
                        </li>}
                        {Role==='user'&&
                        <li>
                            <Link to="/products" className={styles.link}>
                                <i className={`${styles.icon} fas fa-th-list`}></i> Products
                            </Link>
                        </li>}
                        <li>
                            <Link to="/profile" className={styles.link}>
                                <i className={`${styles.icon} fas fa-user`}></i> Profile
                            </Link>
                        </li>
                        
                    </ul>
                    <Button onClick={LogOut} variant='' className={`btn-outline-success ${styles.button}`}>
                                <i className={`me-1 fas fa-sign-out-alt`}></i> Logout
                    </Button>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
