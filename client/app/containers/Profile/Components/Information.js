/* eslint-disable no-underscore-dangle */
import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import Dropzone from 'react-dropzone';

import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from '../actions';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';
import DateInput from '../../../components/DateInput';

class UserPersonalInformationPage extends React.Component {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    one: PropTypes.object.isRequired,
    errors: PropTypes.object,
  };

  componentDidMount() {
    this.props.clearError();
    this.props.loadOneRequest();
  }

  state = {
    image: '',
  };

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

  onHandleUpload = files => {
    this.props.setOneValue({
      key: 'image',
      value: files[0],
    });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.setState({ image: reader.result });
      },
      false,
    );
    reader.readAsDataURL(files[0]);
  };

  render() {
    const { classes, one, errors, loading } = this.props;
    return loading ? (
      <div className="circular_loader waftloader"></div>
    ) : (
      <React.Fragment>
        <div className="flex flex-wrap">
          <div className="w-full lg:flex-1">
            <div className="w-full md:w-1/2 pb-4">
              <label>Name</label>
              <input
                className="inputbox"
                id="name"
                type="text"
                name="Name"
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
                name="Email"
                value={one.email || ''}
                onChange={this.handleChange('name')}
              />
              <div className="error">{errors.email}</div>
            </div>

            <div className="md:w-1/2 pb-4">
              <label className="text-sm">Date Of Birth</label>
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

            <div className="w-full pb-4">
              <div>
                <label className="text-sm">Role :</label>{' '}
                {one.roles.map(each => (
                  <span
                    key={each._id}
                    className="rounded-full px-2 py-1 mr-2 text-xs border"
                  >
                    {each.role_title}{' '}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="w-full  pb-4">
          Your account created at {moment(one.added_at).format(DATE_FORMAT)}
        </div> */}
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <Dropzone onDrop={this.onHandleUpload}>
              {({ getRootProps, getInputProps }) => (
                <section
                  style={{ width: '100%' }}
                  className="text-black  hover:text-primary text-center self-start  border border-gray-500 rounded-lg border-solid cursor-pointer"
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {this.state.image ? (
                      <img
                        className=" w-full "
                        src={this.state.image}
                        alt="profile"
                      />
                    ) : (
                      <div className="p-6">
                        <p>Choose Profile picture</p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>

        <button
          className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
          onClick={this.handleSave}
        >
          Save Changes
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

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

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
