/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from './reducer';
import saga from './saga';
import { makeSelectOne, makeSelectErrors } from './selectors';
import * as mapDispatchToProps from './actions';

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
    const { classes, one, errors } = this.props;
    return (
      <React.Fragment>

        <div className="w-full pb-4">
          <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
            Name
        </label>

          <FormControl
            error={errors && errors.name && errors.name.length > 0}
          >
            <input className="Waftinputbox" id="name" type="text" value={one.name || ''}
              onChange={this.handleChange('name')} />
            <FormHelperText id="component-error-text">
              {errors.name}
            </FormHelperText>
          </FormControl>
        </div>

        <div className="w-full pb-4">
          <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
            Email
        </label>


          <FormControl
            error={errors && errors.email && errors.email.length > 0}
          >
            <input className="Waftinputbox" id="email" type="text" value={one.email || ''}
              onChange={this.handleChange('name')} />
            <FormHelperText id="component-error-text">
              {errors.email}
            </FormHelperText>
          </FormControl>
        </div>

        <div className="w-full pb-4">
          <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
            Date Of Birth
        </label>

          <DatePicker
            margin="normal"
            fullWidth
            name="date_of_birth"
            className="Waftinputbox"
            value={
              (one.date_of_birth &&
                moment(one.date_of_birth).format('YYYY-MM-DD')) ||
              ''
            }
            onChange={this.handleDateChange('date_of_birth')}
          />
        </div>

        <FormControlLabel
          control={
            <CheckBox
              checked={one.email_verified || false}
              color="primary"
            />
          }
          label="Email Verified"
        />

        <div className="w-full pb-2">You are one of {one.roles.map(each => `${each.role_title} `)}</div>

        <div className="w-full  pb-4">Your account created at {moment(one.added_at).format('YYYY-MM-DD')}</div>


        <NavLink className="text-grey-darker hover:text-black" to="/user/change-password">Change Password</NavLink>


        <button className="text-white py-2 px-4 rounded mt-4 btn-waft" onClick={this.handleSave}>Save</button>




      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(UserPersonalInformationPage);
