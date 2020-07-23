// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { Progress } from 'reactstrap';

// const ProgressMessage = ({ percentage }) => {

//   return (
//     <Progress striped color="success" value={percentage} />

//   );
// };

// ProgressMessage.propTypes = {
//   percentage: PropTypes.number.isRequired
// };

// export default ProgressMessage;

import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
  return (
    <div className='progress'>
      <div
        className='progress-bar progress-bar-striped bg-success'
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
        
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;