import React from 'react';
import { Link } from 'react-router-dom';


export const GenericNotFound = () => {

  return (
    <div id='generic-not-found' className='container h-100'>
      <div className='row h-100 d-flex flex-fill justify-content-center align-content-center mt-5'>
        {/* <Spinner
          as="span"
          animation="border"
          size="lg"
          role="status"
          aria-hidden="true"
        /> */}
        not found
      </div>
    </div>
  );
};
