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
      <footer className="footer bg-lightest">
        <div className="w-full newsletter_wrapper p-10 text-center">
          <div className="widget-ft style1 widget-lastest">
            <h1 className="text-white mb-2 uppercase">Get updates</h1>
            <p className="mb-5 text-white">
              Never miss any updates from WaftEngine. Subcribe newsletter now.
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
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap p-5">
            <div className="w-full lg:w-1/3 mb-2 crorder">
              <Link to="/">
                <img className="grayscale" src={logo} alt="WaftEngine" />
              </Link>
            </div>
            <div className="w-full lg:w-1/3 mb-4 flex lg:justify-between">
              <a
                className="block no-underline  text-grey-darkest hover:text-primary pr-2 lg:m-auto"
                href="https://www.waftengine.org/about-us"
                target="_blank"
                rel="noopener"
              >
                About Us
              </a>
              <a
                className="block no-underline  text-grey-darkest hover:text-primary pr-2 lg:m-auto"
                href="https://www.waftengine.org/features"
                target="_blank"
                rel="noopener"
              >
                Features
              </a>
              <a
                className="display-block  no-underline  text-grey-darkest hover:text-primary pr-2 lg:m-auto"
                href="https://www.waftengine.org/contact-us"
                target="_blank"
                rel="noopener"
              >
                Contact Us
              </a>
            </div>
            <div className="w-full lg:w-1/3 mb-4 lg:flex lg:justify-end">
              <ul className="flex list-none p-0">
                <li className="pr-2 lg:m-auto lg:pr-2">
                  <a
                    href="https://www.facebook.com/waftengine/?__tn__=%2Cd%2CP-R&eid=ARAX_40QP9563fc6KG5lw6J6gUpVNZYGxmuY-DGkVQv4ZDHe_P40ZA3eBvyrqpM0Q17rniO7GpVujCKW"
                    target="_blank"
                    rel="noopener"
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
