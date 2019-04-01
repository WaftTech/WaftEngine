import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

class ContactPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Contact Us</h1>

        <form noValidate autoComplete="off">
          <div className="mb-2">
            <TextField fullWidth label="Name" margin="normal" />
          </div>
          <div className="mb-2">
            <TextField fullWidth label="Email" margin="normal" />
          </div>

          <div className="mb-2">
            <TextField fullWidth label="Subject" margin="normal" />
          </div>

          <div className="mb-2">
            <TextField fullWidth multiline label="Message" margin="normal" />
          </div>

          <Button variant="contained" color="primary">
            Send Message
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactPage;
