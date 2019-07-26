// import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';
import logo from '../../../assets/img/logo.svg';
import fb from '../../../assets/img/fb.png';
import instagram from '../../../assets/img/Instagram.png';
import tw from '../../../assets/img/tw.png';
import mail from '../../../assets/img/mail.png';

const styles = {};
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

    return (
      <footer className="footer">
        <div className="w-full newsletter_wrapper p-10 text-center">
          <div className="widget-ft style1 widget-lastest">
            <h1 className="text-white mb-2">Newsletter</h1>
            <p className="mb-5 text-white">
              Subscribe to our newsletter and stay updated.
            </p>
            <form onSubmit={this.handleSave}>
              <input
                type="text"
                className="appearance-none rounded py-2 px-3 text-grey-darker leading-tight md:1/2 lg:w-1/4 rounded-r-none"
                placeholder="Enter Your Email"
                value={email}
                onChange={this.handleChange('email')}
              />

              <Button
                type="submit"
                className="text-white py-2 px-4 rounded rounded-l-none btn-waft"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap p-5">
            <div className="w-full lg:w-1/3 mb-2 crorder">
              <Link to="/">
                <img src={logo} alt="WaftEngine" />
              </Link>
              <p className="mt-2">
                © WaftEngine 2019.{' '}
                <span>
                  By{' '}
                  <a
                    className="no-underline"
                    href="https://www.wafttech.com"
                    target="_blank"
                  >
                    WaftTech
                  </a>{' '}
                  For Developers.
                </span>
                <br />
                All rights reserved.
              </p>
            </div>
            <div className="w-full lg:w-1/3 mb-4 flex lg:justify-between">
              <a
                className="block no-underline  text-grey-darkest hover:text-primary pr-2 lg:m-auto"
                href="https://waftengine.org/about-us"
                target="_blank"
              >
                About Us
              </a>
              <a
                className="block no-underline  text-grey-darkest hover:text-primary pr-2 lg:m-auto"
                href="https://waftengine.org/features"
                target="_blank"
              >
                Features
              </a>
              <Link
                className="display-block  no-underline  text-grey-darkest hover:text-primary pr-2 lg:m-auto"
                to="/contact-us"
                target="_blank"
              >
                Contact Us
              </Link>
            </div>
            <div className="w-full lg:w-1/3 mb-4 lg:flex lg:justify-end">
              <ul className="flex list-none p-0">
                <li className="pr-2 lg:m-auto lg:pr-2">
                  <a
                    href="https://www.facebook.com/waftengine/?__tn__=%2Cd%2CP-R&eid=ARAX_40QP9563fc6KG5lw6J6gUpVNZYGxmuY-DGkVQv4ZDHe_P40ZA3eBvyrqpM0Q17rniO7GpVujCKW"
                    target="_blank"
                    title="Facebook"
                  >
                    <img src={fb} alt="facebook" />
                  </a>
                </li>
                <li className="pr-2 lg:m-auto lg:pr-2">
                  <a href="mailto:info@waftengine.com" title="E-mail">
                    <img src={mail} alt="email" />
                  </a>
                </li>
                <li className="pr-2 lg:m-auto lg:pr-2">
                  <a href="#" target="_blank" title="Twitter">
                    <img src={tw} alt="twitter" />
                  </a>{' '}
                </li>
                <li className="pr-2 lg:m-auto lg:pr-2">
                  {' '}
                  <a href="#" target="_blank" title="Instagram">
                    <img src={instagram} alt="instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
)(Footer);
