import React from 'react';
import APPCONFIG from 'constants/appConfig';
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
        <h2>Login to Continue</h2>
        <p className="lead">Welcome back, sign in with your {APPCONFIG.brand} account</p>

        <a href={DEMO.link} className="btn btn-block icon-btn-v2 bg-facebook mb-2"><Icon type="facebook" /><span className="btn-text">Login with Facebook</span></a>
        <a href={DEMO.link} className="btn btn-block icon-btn-v2 bg-twitter"><Icon type="twitter" /><span className="btn-text">Login with Twitter</span></a>
        <div className="divider divider-with-content my-4"><span className="divider-inner-content">OR</span></div>

        <form onSubmit={this.handleSubmit} className="form-v1">
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="account_circle" />
              </div>
              <TextField
                id="login2-name"
                label="Name"
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
                id="login2-password"
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
                  value="login2-remember"
                  color="primary"
                />
              }
              label="Remember Me"
            />
          </div>
          <div className="form-group">
            <Button variant="contained" color="primary" type="submit" className="btn-cta btn-block">
              Log in
            </Button>
          </div>
        </form>
        <p className="additional-info">Don't have an account yet? <a href={DEMO.signUp}>Sign up</a></p>
        <p className="additional-info">Forgot your username or password? <a href={DEMO.forgotPassword}>Reset password</a></p>
      </section>
    );
  }
}

export default withRouter(NormalForm);
