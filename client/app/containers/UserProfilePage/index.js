import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import { makeSelectUser } from '../App/selectors';
import UserProfileSettingsPage from '../../components/UserProfileSettings';
import UserPersonalInformationPage from './UserPersonalInformation';

/* eslint-disable react/prefer-stateless-function */

export class UserProfilePage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Helmet>
          <title>Profile Page</title>
        </Helmet>

        <div className="container mx-auto mb-10">
          <h1 className="text-center my-5 p-3 mb-10 bg-grey-lighter px-5">
            Personal Information
          </h1>

          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 px-5 md:px-16">
              <div className="w-full pb-2 text-base md:text-lg  xl:text-xl">
                <b>Name : {user.name}</b>
              </div>
              <div className="w-full pb-4 text-base md:text-lg xl:text-xl">
                <b> E-mail : {user.email}</b>
              </div>
              <UserProfileSettingsPage />
            </div>

            <div className="w-full md:w-1/2 px-5 md:px-16 mt-10 md:mt-0">
              <UserPersonalInformationPage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  root: {
    flexGrow: 1,
  },
  success: {
    backgroundColor: green[600],
  },
});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(UserProfilePage);
