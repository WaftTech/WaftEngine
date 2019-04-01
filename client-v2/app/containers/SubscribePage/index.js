import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

class ContactPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Subscribe Newsletter</h1>

        <form noValidate autoComplete="off">
          <div className="mb-2">
            <TextField fullWidth label="Enter Your Email" margin="normal" />
          </div>
          <Button variant="contained" color="primary">
            Subscribe
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactPage;
