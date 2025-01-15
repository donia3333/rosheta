
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
import styles from '../SignUp/signUp.module.scss';

export default function ResetPassword() {
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
    email: Yup.string().required().email(),
    otp: Yup.string().required(),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9@$%&#]{5,}$/, `Password must start with an uppercase
     letter and be at least 6 characters long,
      including lowercase letters, digits, or @, $, %, &, #.`)
      .required('Password is required'),

  })

  let Formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
      newPassword: ''
    },
    validationSchema,

    onSubmit: (values) => {
      setLoading(true);

      axios.post(`${BaseUrl}/users/reset-password`, values)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false)
            notify('Password Reset successful! 💊', 'success');
            navigate('/Login');
          }
          console.log(response);
        }).catch((error) => {
          if (error.response || error.response.status === 400) {
            setLoading(false);
            const errorMessage = error.response.data.message || "An error occurred";
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
          <h1 className={styles.text}>Reset Password</h1>
          <div className="row mb-3">
            <div className="col-12 col-md-12">
              <input type="email" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.email}
                placeholder="Email" name="email" />
              <ErrorList Formik={Formik} type={"email"} />
            </div>

          </div>


          <div className="row mb-3">
            <div className="col-12">
              <input type="text" className="form-control"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.otp}
                placeholder="otp" name="otp" />
              <ErrorList Formik={Formik} type={"otp"} />
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-12 col-md-12">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                placeholder="newPassword"
                name="newPassword"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                value={Formik.values.newPassword}

              />
              <ErrorList Formik={Formik} type={"newPassword"} />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '10px' }}>
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span>
            </div>

          </div>

          <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className={styles['gradient-button']}>

            {!loading ? ("Reset Password") :
              <i className='fa-spinner fa-spin fas mt-2'></i>

            }

          </button>
          <div className='text-center mt-2'>
            <span >Back to forget Password ? <Link to={'/ForgetPassword'} className={`linkk ${styles.text}`}>Forge tPassword</Link></span>
          </div>


        </form>
      </div>
    </main>

  )
}

