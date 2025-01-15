import React, { useContext, useEffect, useState } from "react";
import { mediaContext } from "../../../../Context/MediaStore"; 
import styles from './form.module.scss';
import girl from '../../../../images/female-icon-7877.png';
import man from '../../../../images/Admin-Profile-Vector-PNG-File.png';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { BaseUrl } from '../../../BaseUrl/base'
const Form = () => {
    const notify = (msg, type) => {
        toast[type](msg, {
            autoClose: 1000,
            theme: 'dark'
        });
    };
    const [loading, setLoading] = useState(false);
    const { userData, updateUserInfo ,saveUserData } = useContext(mediaContext);
    const [formData, setFormData] = useState({
        userName: '',
        lastName: '',
        phone: '',
        email: '',
        age: '',
        gender: '', 
        address: {
            street: '',
            city: '',
            state: '',
            country: ''
        },
        password: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData(prevData => ({
                ...prevData,
                userName: userData.userName || '',
                lastName: userData.lastName || '',
                phone: userData.phone || '',
                email: userData.email || '',
                age: userData.age || '',
                gender: (userData.gender || 'male').toLowerCase(), 
                address: {
                    street: userData.address?.street || '',
                    city: userData.address?.city || '',
                    state: userData.address?.state || '',
                    country: userData.address?.country || ''
                },
                password: '' 
            }));
        }
    }, [userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submittedData = {
            ...formData,
            gender: formData.gender.toLowerCase() 
        };
        setLoading(true);

        try {
           
            const response = await fetch(`${BaseUrl}/users/updateUserData`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submittedData)
            });

            if (!response.ok) {
                setLoading(false);
                throw new Error('Failed to update user data check your Password');
            }
            setLoading(false);
            const data = await response.json();
            console.log('User data updated successfully', data);
            notify("User data updated successfully!",'success'); 
            console.log('API Response:', data); 
            localStorage.removeItem('token');
            console.log('Hi:', data.token); 
            localStorage.setItem('token', data.token);
            saveUserData();
        } catch (error) {
            console.error('Error updating user data:', error);
            notify(error.message,'error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "gender") {
            setFormData(prevData => ({
                ...prevData,
                gender: value.toLowerCase()
            }));
        } else if (name.includes("address.")) {
            const addressField = name.split(".")[1]; 
            setFormData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h2 className={styles.info}>Profile Info</h2>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="userName">User Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            placeholder={formData.userName || ""}
                            value={formData.userName}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-user ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder={formData.lastName || ""}
                            value={formData.lastName}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-user ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder={formData.phone || ""}
                            value={formData.phone}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-phone ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={formData.email || ""}
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder={formData.age || ""}
                            value={formData.age}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-calendar-alt ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Gender</label>
                        <div className={styles.genderWrapper}>
                            <label className={styles.imageLabel}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"} 
                                    onChange={handleChange}
                                    className={styles.hiddenRadio}
                                />
                                <img
                                    src={man}
                                    alt="Male"
                                    className={`${styles.image} ${formData.gender === "male" ? styles.selected : ''}`}
                                />
                            </label>
                            <label className={styles.imageLabel}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"} 
                                    onChange={handleChange}
                                    className={styles.hiddenRadio}
                                />
                                <img
                                    src={girl}
                                    alt="Female"
                                    className={`${styles.image} ${formData.gender === "female" ? styles.selected : ''}`}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.street">Street</label>
                        <input
                            type="text"
                            id="address.street"
                            name="address.street"
                            placeholder={formData.address.street || ""}
                            value={formData.address.street}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-road ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.city">City</label>
                        <input
                            type="text"
                            id="address.city"
                            name="address.city"
                            placeholder={formData.address.city || ""}
                            value={formData.address.city}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-building ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.state">State</label>
                        <input
                            type="text"
                            id="address.state"
                            name="address.state"
                            placeholder={formData.address.state || ""}
                            value={formData.address.state}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-map ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.country">Country</label>
                        <input
                            type="text"
                            id="address.country"
                            name="address.country"
                            placeholder={formData.address.country || ""}
                            value={formData.address.country}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                        <i className={`fas fa-globe ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirm Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.formInput}
                    />
                    <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                </div>

                <Button type="submit" variant="success" className={styles.button}>
                {!loading? ("Update"):
                  
                   <i class="fa-regular fa-pen-to-square fa-spin"></i>
                   
                   }
                    </Button>
            </form>
       
        </>
    );
};

export default Form;
