
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import Styles from './Footer.module.scss';

export default function Footer() {
  return (
    <MDBFooter className={['text-center text-lg-start text-light ', Styles.footer]}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset text-light' style={{ textDecoration: 'none' }}>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset text-light' style={{ textDecoration: 'none' }}>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset text-light' style={{ textDecoration: 'none' }}>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset text-light' style={{ textDecoration: 'none' }}>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset text-light' style={{ textDecoration: 'none' }}>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset text-light' style={{ textDecoration: 'none' }}>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>
                <MDBIcon icon="gem" className="me-3" />
                Rosheta
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>Category</h6>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Eyes
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Ears
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Pain Killer
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Internal Dieases
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Bones
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Mental Health
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-light' style={{ textDecoration: 'none' }}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Egypt, Cairo
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                rosheta950@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +20 109 423 1021
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright
      </div>
    </MDBFooter>
  );
}