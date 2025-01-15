import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { BaseUrl } from '../../BaseUrl/base';
import ErrorList from '../ErrorList/ErrorList';
import styles from './signUp.module.scss';

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 1000,
    });
  }

  let validationSchema = Yup.object({
    userName: Yup.string().required().min(3).max(15),
    lastName: Yup.string().required().min(3).max(15),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 11 digits')
      .required('Phone number is required'),
    email: Yup.string().required().email(),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9@$%&#]{5,}$/, `Password must start with an uppercase
     letter and be at least 6 characters long,
      including lowercase letters, digits, or @, $, %, &, #.`)
      .required('Password is required'),
    confirmPassword: Yup.string().required()
      .oneOf([Yup.ref('password')], "password and confirmPassword must be matched"),
    age: Yup.number(),
    gender: Yup.string(),
    street: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required()
  })

  let Formik = useFormik({
    initialValues: {
      userName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: ''
      }
    },
    validationSchema
    ,

    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        userName: values.userName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        age: values.age,
        gender: values.gender,
        phone: values.phone,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          country: values.country,
        },
      };

      axios.post(`${BaseUrl}/users/signUp`, payload)
        .then((response) => {
          if (response.status === 201) {
            notify('Registration successful! 💊', 'success');
            navigate('/Login');
          }
          console.log(response);
        }).catch((error) => {
          if (error.response || error.response.status === 400) {
            setLoading(false);
            const errorMessage = error.response.data.msg || "An error occurred";
            notify(errorMessage, 'error');
          }
        });
    }


  })


  return (


    <main>

      <div className={`${styles.bg}`}> </div>

      <div className={`${styles.container}`}>

        <form className={styles.form} onSubmit={Formik.handleSubmit}>
          <h1 className={styles.text}>Register</h1>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.userName}
                placeholder="User Name" name="userName" />
              <ErrorList Formik={Formik} type={"userName"} />
            </div>
            <div className="col-12 col-md-6">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.lastName}
                placeholder="Last Name" name="lastName" />
              <ErrorList Formik={Formik} type={"lastName"} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.phone}
                placeholder="Phone" name="phone" />
              <ErrorList Formik={Formik} type={"phone"} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                name="password"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.password}

              />
              <ErrorList Formik={Formik} type={"password"} />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '10px' }}>
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="col-12 col-md-6">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.confirmPassword}
              />
              <ErrorList Formik={Formik} type={"confirmPassword"} />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '10px' }}>
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <input type="email" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.email}
                placeholder="Email" name="email" />
              <ErrorList Formik={Formik} type={"email"} />
            </div>
            <div className="col-12 col-md-6">
              <input type="number" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.age}
                placeholder="Age" name="age" />
              <ErrorList Formik={Formik} type={"age"} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <select className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.gender}

                name="gender">

                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ErrorList Formik={Formik} type={"gender"} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.street}

                placeholder="Street" name="street" />
              <ErrorList Formik={Formik} type={"street"} />
            </div>
            <div className="col-12 col-md-6">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.city}
                placeholder="City" name="city" />
              <ErrorList Formik={Formik} type={"city"} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.state}
                placeholder="State" name="state" />
              <ErrorList Formik={Formik} type={"state"} />
            </div>
            <div className="col-12 col-md-6">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.country}
                placeholder="Country" name="country" />
              <ErrorList Formik={Formik} type={"country"} />
            </div>
          </div>
          <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className={styles['gradient-button']}>

            {!loading ? ("SignUp") :
              <i className='fa-spinner fa-spin fas mt-2'></i>

            }

          </button>
          <div className='text-center mt-2'>
            <span > have an account ? <Link to={'/Login'} className={`linkk ${styles.text}`}>Login</Link></span>
          </div>



        </form>
      </div>
    </main>

  )
}

