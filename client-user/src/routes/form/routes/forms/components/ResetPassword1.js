import React from 'react';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MaterialIcon from 'components/MaterialIcon';

class NormalForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e)
    // this.props.history.push(DEMO.home2);
  }
  render() {
    return (
      <section className="form-v1-container">
        <h2>Forgot Password?</h2>
        <p className="additional-info col-lg-10 mx-lg-auto mb-3">Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
        <form onSubmit={this.handleSubmit} className="form-v1">
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="email" />
              </div>
              <TextField
                id="resetpassword1-email"
                label="Email"
                fullWidth
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-group">
            <Button variant="contained" color="primary" type="submit" className="btn-cta btn-block">
              Send Reset Instructions
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(NormalForm);
