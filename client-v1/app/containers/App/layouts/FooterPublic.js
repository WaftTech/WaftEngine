import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import { createStructuredSelector } from 'reselect';
import { makeSelectSuccess, makeSelectIsRequesting, makeSelectMsg, makeSelectErrorMsg, makeSelectContent } from '../selectors';
import { subscribeRequest } from '../actions';
import StaticContentDiv from '../../../components/StaticContentDiv';
import fb from '../../../assets/img/fbIcon.svg';
const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {},
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};
class Footer extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    success: PropTypes.bool,
    isRequesting: PropTypes.bool,
    msg: PropTypes.string,
    error: PropTypes.string,
  };

  state = { email: '' };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.success !== this.props.success && nextProps.success) {
      this.setState({ email: '' });
    }
  }

  handleSave = e => {
    e.preventDefault();
    this.props.save(this.state);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { isRequesting, msg, error } = this.props;
    const { email } = this.state;
    return (
      <footer>
        <hr />
        <div className="container">
          <Grid container spacing={24}>
            <Grid item lg={3}>
              <StaticContentDiv contentKey="homepagefooteraboutus" />
            </Grid>
            <Grid item lg={3}>
              <h3 className="title">Links</h3>
              <ul className="one-half first">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about-us">About us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact us</Link>
                </li>
              </ul>
            </Grid>
            <Grid item lg={3}>
              <h3 className="title">Follow Us</h3>
              <a href="http://facebook.com/waft-engine" target="_blank">
                <img alt="waft-engine" style={{ maxWidth: '40px' }} src={fb} />
              </a>
            </Grid>

            <Grid item lg={3}>
              <div className="widget-ft style1 widget-lastest">
                <h3 className="title">Subscribe Newsletter</h3>
                <form onSubmit={this.handleSave}>
                  <input
                    style={{
                      background: '#fff',
                      width: '100%',
                      fontSize: '12px',
                      padding: '5px 15px',
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={this.handleChange('email')}
                  />
                  <br />
                  <br />
                  <div className="text-right">
                    <Button variant="contained" onClick={this.handleSave} color="primary" disabled={isRequesting}>
                      Submit
                    </Button>
                  </div>
                </form>
                <div>
                  <h1>{error}</h1>
                </div>
              </div>
              <div>
                <h1>{msg}</h1>
              </div>
            </Grid>
          </Grid>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  success: makeSelectSuccess(),
  msg: makeSelectMsg(),
  error: makeSelectErrorMsg(),
  aboutUs: makeSelectContent(),
});

const mapDispatchToProps = dispatch => ({
  save: payload => dispatch(subscribeRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withConnect,
)(Footer);
