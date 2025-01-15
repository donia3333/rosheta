
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { BaseUrl } from '../../BaseUrl/base';
import ErrorList from '../ErrorList/ErrorList';
import styles from '../SignUp/signUp.module.scss';

export default function ForgetPassword() {


  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 1000,
    });
  }

  let validationSchema = Yup.object({
    email: Yup.string().required().email(),
  })

  let Formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,

    onSubmit: (values) => {
      setLoading(true);

      axios.post(`${BaseUrl}/users/forget-password`, values)
        .then((response) => {
          if (response.status === 200) {
            notify('Success 💊', 'success');
            navigate('/ResetPassword');
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
          <h1 className={styles.text}>Forget Password</h1>
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

          <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className={styles['gradient-button']}>

            {!loading ? ("Sent Otp Code") :
              <i className='fa-spinner fa-spin fas mt-2'></i>

            }

          </button>
          <div className='text-center mt-2'>
            <span >Back to login ? <Link to={'/Login'} className={`linkk ${styles.text}`}>Login</Link></span>
          </div>


        </form>
      </div>
    </main>

  )
}

