/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import Helmet from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import * as mapDispatchToProps from './actions';
import saga from './saga';
import { makeSelectOne, makeSelectLoading } from './selectors';
import PageContent from '../../components/PageContent/PageContent';
import PageHeader from '../../components/PageHeader/PageHeader';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';


export class ViewSubscriber extends React.Component {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  // handleCheckedChange = name => event => {
  //   event.persist();
  //   const tempUser = { ...this.props.one.users };
  //   tempUser[name] = event.target.checked;
  //   this.props.setOneValue({ key: 'users', value: tempUser });
  // };

  handleBack = () => {
    this.props.push('/admin/subscribe-manage');
  };

  render() {
    const { classes, one, loading} = this.props;
    return loading && loading == true ? (
        <div>loading</div>
       ) : (
      <React.Fragment>


        <Helmet>
          <title> Subscriber Details </title>
        </Helmet>
   <div class="flex justify-between mt-1 mb-1">
        <PageHeader>
        <IconButton className="cursor-pointer"	 onClick={this.handleBack} aria-label="Back">
          <BackIcon />
        </IconButton> Subscribe Details</PageHeader>
        </div>
        <PageContent>
          <Paper className={classes.paper}>
  
           
                <div>
                  <b>Email: </b>
                  {one && one.email ? one.email : ''}
                </div>
         
             
                <div>
                  <b>Is Subscribed: </b>
                  {one && one.is_subscribed ? '' + one.is_subscribed : ''}
                </div>
         
           
                <div>
                  <b>Added At: </b>
                  {moment(one && one.added_at).format('YYYY-MM-DD')}
                </div>
           
           
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleBack}
                className={classes.button}
              >
                Back
              </Button>
        
              </Paper>
          
        </PageContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminSubscribePage', reducer });
const withSaga = injectSaga({ key: 'adminSubscribePage', saga });

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
  success: {
    backgroundColor: blue[600],
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(ViewSubscriber);
