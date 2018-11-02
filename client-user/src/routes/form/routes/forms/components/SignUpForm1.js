import React from 'react';
import DEMO from 'constants/demoData';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
        <h2>Create an Account</h2>
        <p className="lead col-lg-10 mx-lg-auto">Discovering and connecting with creative talent around the globe.</p>
        <form onSubmit={this.handleSubmit} className="form-v1">
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="account_circle" />
              </div>
              <TextField
                id="signup1-name"
                label="Name"
                fullWidth
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="email" />
              </div>
              <TextField
                id="signup1-email"
                label="Email"
                fullWidth
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="lock" />
              </div>
              <TextField
                id="signup1-password"
                label="Password"
                type="password"
                fullWidth
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  value="signup1-agreement"
                  color="primary"
                />
              }
              label={<div>I have read the <a href={DEMO.link}>agreement</a></div>}
            />
          </div>
          <div className="form-group">
            <Button variant="contained" color="primary" type="submit" className="btn-cta btn-block">
              Sign Up
            </Button>
          </div>
        </form>
        <p className="additional-info">Already have an account? <a href={DEMO.login}>Login</a></p>
      </section>
    );
  }
}

export default withRouter(NormalForm);

