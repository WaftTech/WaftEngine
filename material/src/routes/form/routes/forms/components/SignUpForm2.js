import React from 'react';
import DEMO from 'constants/demoData';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialIcon from 'components/MaterialIcon';
import { Icon } from 'antd';

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
        <a href={DEMO.link} className="btn btn-block icon-btn-v2 bg-facebook mb-2"><Icon type="facebook" /><span className="btn-text">Sign up with Facebook</span></a>
        <a href={DEMO.link} className="btn btn-block icon-btn-v2 bg-twitter"><Icon type="twitter" /><span className="btn-text">Sign up with Twitter</span></a>
        <div className="divider divider-with-content my-4"><span className="divider-inner-content">OR</span></div>
        <form onSubmit={this.handleSubmit} className="form-v1">
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="account_circle" />
              </div>
              <TextField
                id="signup2-name"
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
                id="signup2-email"
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
                id="signup2-password"
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
                  value="signup2-agreement"
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
