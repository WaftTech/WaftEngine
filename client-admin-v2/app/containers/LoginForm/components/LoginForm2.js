import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';
import APPCONFIG from 'constants/appConfig';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';

class NormalForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    // console.log(e)
    // this.props.history.push(DEMO.home2);
  };

  render() {
    return (
      <section className="form-v1-container">
        <h2>Login to Continue</h2>
        <p className="lead">
          Welcome back, sign in with your {APPCONFIG.brand} account
        </p>
        <form onSubmit={this.handleSubmit} className="form-v1">
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="account_circle" />
              </div>
              <UsernameInput />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group-v1">
              <div className="input-group-icon">
                <MaterialIcon icon="lock" />
              </div>
              <PasswordInput />
            </div>
          </div>
          <div className="form-group">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn-cta btn-block"
            >
              Log in
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(NormalForm);
