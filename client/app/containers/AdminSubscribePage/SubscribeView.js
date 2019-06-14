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
   <div className="flex justify-between mt-3 mb-3">
        <PageHeader>
        <IconButton className={`${classes.backbtn} cursor-pointer`}	onClick={this.handleBack} aria-label="Back">
          <BackIcon />
        </IconButton> Subscribe Details</PageHeader>
        </div>
        <PageContent>
        
  
           
                <div className="mb-2 Capitalize">
                  <b>Email: </b>
                  {one && one.email ? one.email : ''}
                </div>
         
             
                <div className="mb-2 Capitalize">
                  <b>Is Subscribed: </b>
                  {one && one.is_subscribed ? '' + one.is_subscribed : ''}
                </div>
         
           
                <div className="mb-2 Capitalize">
                  <b>Added At: </b>
                  {moment(one && one.added_at).format('YYYY-MM-DD')}
                </div>
          
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
  backbtn:{
    padding:0,
    height:'40px',
    width:'40px',
    marginTop:'auto',
    marginBottom:'auto',
    borderRadius:'50%',
    marginRight:'5px',
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(ViewSubscriber);
