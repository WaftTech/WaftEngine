import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import { makeSelectUser } from '../App/selectors';
import PageHeader from '../../components/PageHeader/PageHeader';
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
        
        <div className="container m-auto flex justify-between">
      
              <div className="w-1/3 m-auto"> <div className="p-5 mb-5">
            <b>{user.name}</b>
            <br />
            <b style={{ fontSize: 16 }}>{user.email}</b>
          </div><UserProfileSettingsPage /></div>
         
           
              <div className="w-2/3 m-auto"><UserPersonalInformationPage /></div>
           
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
