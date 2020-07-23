import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const Message = ({ success, errors }) => {

    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

  return (
    <Alert color="success" isOpen={visible} toggle={onDismiss}>
      {errors}
    </Alert>,

    <Alert color="primary" isOpen={visible} toggle={onDismiss}>
      {success}
    </Alert>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;