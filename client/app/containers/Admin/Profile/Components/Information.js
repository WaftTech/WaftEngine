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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectErrors } from '../selectors';
import * as mapDispatchToProps from '../actions';

import { FaCheck } from 'react-icons/fa';

import { DATE_FORMAT } from '../../../App/constants';
import DateInput from '../../../../components/DateInput';

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
      value: moment(date).format(DATE_FORMAT),
    });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, errors } = this.props;
    return (
      <div className="ml-4 p-4 border">
        <div className="w-full md:w-1/2 pb-4">
          <label>Name</label>
          <input
            className="inputbox"
            id="name"
            type="text"
            value={one.name || ''}
            onChange={this.handleChange('name')}
          />
          <div className="error">{errors.name}</div>
        </div>

        <div className="w-full md:w-1/2 pb-4">
          <label>Email</label>

          <input
            className="inputbox"
            id="email"
            type="text"
            value={one.email || ''}
            onChange={this.handleChange('name')}
          />
          <div className="error">{errors.email}</div>
        </div>

        <div className="w-full md:w-1/2">
          <label>Date Of Birth</label>

          <div className="border-2 p-2 mb-2 rounded">
            <DateInput
              onDateChange={date => {
                this.props.setOneValue({
                  key: 'date_of_birth',
                  value: moment(date).format('YYYY-MM-DD'),
                });
              }}
              birth_date={moment(one.date_of_birth).format('YYYY-MM-D')}
            />
          </div>
        </div>

        <div className="checkbox pb-4">
          <input
            checked={one.email_verified || false}
            id="is_active"
            type="checkbox"
          />
          <label htmlFor="is_active">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Email Verified
          </label>
        </div>

        <div className="w-full mb-2 ">
          Role:
          <span className="ml-2 inline-flex btn margin-none text-blue-500 bg-blue-100 border border-blue-200 mr-2">
            {one.roles.map(each => `${each.role_title} `)}
          </span>
        </div>

        <div className="w-full">
          Account Created:
          <span className="ml-2 font-bold">
            {moment(one.added_at).format(DATE_FORMAT)}
          </span>
        </div>

        <button
          type="button"
          className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
          onClick={this.handleSave}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectErrors(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withConnect)(UserPersonalInformationPage);
