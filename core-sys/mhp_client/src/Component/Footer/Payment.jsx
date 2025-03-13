import React from 'react';
import SSLCOMMERZLOGO from '../../Images/SSL-commerz-pay-with-logo.jpg';

function Payment({ setPaymentModelOpen }) {
  return (
    <>
      <span
        className='float-end'
        style={{ fontSize: '15px', cursor: 'pointer', marginTop: '-5px' }}
        onClick={() => setPaymentModelOpen(false)}
      >
        <i className='fal fa-times'></i>
      </span>
      <h2 className='text-center lead fw-semibold'>Payment Gateway</h2>
      <hr className='top-hr' />

      <div className='d-flex my-3 justify-content-center'>
        <img
          style={{
            // width: '300px',
            height: '400px',
            objectFit: 'contain',
          }}
          src={SSLCOMMERZLOGO}
          alt='ssl-commerz-logo'
        />
      </div>
    </>
  );
}

export default Payment;
