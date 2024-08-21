import React from 'react';
import { Col } from 'react-bootstrap';

const BottomFooter = () => {
  return (
    <div className='bottom-footer'>
      <Col className='text-center mt-3'>
        &copy;{new Date().getFullYear()} myportfolio.com
      </Col>
    </div>
  );
};

export default BottomFooter;
