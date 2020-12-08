/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @material-ui/core

import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectErrors,
  makeSelectLoading,
} from '../selectors';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from '../actions';

class UserPersonalInformationPage extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    errors: PropTypes.object,
  };

  componentDidMount() {
    this.props.clearError();
    this.props.loadOneRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleDateChange = name => date => {
    this.props.setOneValue({
      key: name,
      value: moment(date).format('YYYY-MM-DD'),
    });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, errors, loading } = this.props;
    return loading ? (
      <div>Loading</div>
    ) : (
      <React.Fragment>
        <div
          className="w-full md:w-1/2 pb-4"
          error={errors && errors.name && errors.name.length > 0}
        >
          <input
            label="Name"
            className="inputbox"
            id="name"
            type="text"
            name="Name"
            value={one.name || ''}
            onChange={this.handleChange('name')}
            error={errors.name}
          />
        </div>

        <div
          className="w-full md:w-1/2 pb-4"
          error={errors && errors.email && errors.email.length > 0}
        >
          <input
            label="Email"
            className="inputbox"
            id="email"
            type="text"
            name="Email"
            value={one.email || ''}
            onChange={this.handleChange('name')}
            error={errors.email}
          />
        </div>

        <div className="md:w-1/2 pb-4">
          <label className="text-sm">Date Of Birth</label>

          <DatePicker
            name="date_of_birth"
            className="inputbox"
            value={
              (one.date_of_birth &&
                moment(one.date_of_birth).format(DATE_FORMAT)) ||
              ''
            }
            onChange={this.handleDateChange('date_of_birth')}
          />
        </div>

        {/* <FormControlLabel
          control={
            <CheckBox checked={one.email_verified || false} color="primary" />
          }
          label="Email Verified"
        /> */}

        <div className="w-full pb-4">
          <div>
            <span className="text-sm">Role :</span>{' '}
            {one.roles.map(each => (
              <span key={each._id} className="rounded border px-4 py-2 mr-2">
                {each.role_title}{' '}
              </span>
            ))}
          </div>
        </div>

        {/* <div className="w-full  pb-4">
          Your account created at {moment(one.added_at).format(DATE_FORMAT)}
        </div> */}

        <button
          className="block btn bg-blue-500 border border-blue-600 hover:bg-blue-600"
          onClick={this.handleSave}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectErrors(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(UserPersonalInformationPage);
