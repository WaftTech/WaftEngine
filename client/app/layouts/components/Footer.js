import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  footer: {
    background: '#dadada',
    paddingTop: 50,
    paddingBottom: 50,
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
  powredWrapper: {
    background: '#53813A',
    color: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
  },
  poweredBy: {
    display: 'flex',
    justifyContent: 'flex-End',
    margin: 0,
  },
};
class Footer extends React.Component {
  state = { email: '' };

  handleSave = e => {
    e.preventDefault();
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.footer}>
          <footer>
            <div className="container">
              <Grid container spacing={24}>
                <Grid item lg={3}>
                  <h3>About Us</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <h4>Follow Us</h4>
                </Grid>
                <Grid item lg={3}>
                  <h3 className="title">Links</h3>
                  <Link to="/contact-us">Contact Us</Link>
                  <br />
                  <br />
                  <Link to="/about-us">About Us</Link>
                  <br />
                  <Link to="/">Site Map</Link>
                  <br />
                  <Link to="/">How it works</Link>
                  <br />
                  <Link to="/">Team</Link>
                </Grid>
                <Grid item lg={3}>
                  <h3 className="title">Contact Us</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
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
                        <Button
                          variant="contained"
                          onClick={this.handleSave}
                          color="primary"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </div>
          </footer>
        </div>
        <div className={classes.powredWrapper}>
          <div className="container">
            <p className={classes.poweredBy}>Powered By: Waft Technology</p>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = { classes: PropTypes.object.isRequired };
const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
)(Footer);
