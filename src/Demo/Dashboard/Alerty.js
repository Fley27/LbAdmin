import React , { useState }from 'react';
import PropTypes from 'prop-types';
import {
    Row, Col, Table, Tabs, Tab, Form,
    Button,Alert,
    FormControl
} from 'react-bootstrap';
const Message = ({ msg ,varient }) => {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant={varient} onClose={() => setShow(false)} dismissible>
            {msg}
        </Alert>
      );
    }
    return (null)
  }

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;