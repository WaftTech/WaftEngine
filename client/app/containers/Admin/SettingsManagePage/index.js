/**
 *
 * SettingsManagePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

//@material components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectSettings, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'settingsManagePage';

export const SettingsManagePage = props => {
  const { loadAllSettingsRequest, settings, setValue } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllSettingsRequest();
  }, []);

  const [comment_status, setCommentStatus] = useState('');

  const handleDropDownChange = name => {
    const data = [...settings.data];
    setValue(data);
  };

  console.log(settings, 'settings');
  const commentStatus = ['posted', 'onhold', 'approved', 'disapproved'];
  const emailChannel = ['waft', 'smtp', 'mailgun', 'sendgri'];

  return (
    <>
      <div className="bg-white rounded p-4 shadow">
        <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
          Comment Settings
        </h3>
        {/* {settings.data.map((each, index) => (
        <div key={each._id} className="flex">
          <label>{each.title}</label>
          {typeof each.value === 'string' && <input value={each.value} />}
          {typeof each.value === 'boolean' && (
            <input type="checkbox" checked={each.value} />
          )}
        </div>
      ))} */}
        <div className="flex">
          <label className="label" htmlFor="grid-comment-status">
            Default status of comment
          </label>
          <select
            className="inputbox"
            native="true"
            value={comment_status}
            onChange={e => setCommentStatus(e.target.value)}
          >
            <option value="" disabled>
              None
            </option>
            {commentStatus.map(each => (
              <option name="name" value={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                tabIndex={-1}
                // onClick={this.handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Recaptcha Check"
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={false}
                tabIndex={-1}
                // onClick={this.handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Is Login Required"
          />
        </div>
      </div>
      <div className="bg-white rounded p-4 shadow">
        <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
          Email Settings
        </h3>
        <div className="flex justify-between">
          <div className="w-1/2">
            <label className="label" htmlFor="grid-email-channel">
              Email Channel
            </label>
            <select
              className="inputbox"
              native="true"
              value="waft"
              // onChange={e => setCommentStatus(e.target.value)}
            >
              <option value="" disabled>
                None
              </option>
              {emailChannel.map(each => (
                <option name="name" value={each}>
                  {each}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 ml-4">
            <label className="label" htmlFor="grid-email-to-send-mail">
              Email to send test mail
            </label>
            <input
              className="inputbox"
              id="email-to-send-test-mail"
              type="text"
              value=""
              name="email_to_send_test_mail"
              // onChange={this.handleTempMetaKeyword}
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded p-4 shadow">
        <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
          Register and login Settings
        </h3>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                tabIndex={-1}
                // onClick={this.handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Is Public Registration"
          />
        </div>
        <div className="flex">
          <label className="label" htmlFor="grid-secret-key">
            Secret Key
          </label>
          <input
            className="inputbox"
            id="secret-key"
            type="text"
            value=""
            name="secret_key"
            // onChange={this.handleTempMetaKeyword}
          />
        </div>
        <br />
        <div className="flex">
          <label className="label" htmlFor="grid-token-expire-time">
            Token Expire Time
          </label>
          <input
            className="inputbox"
            id="token-expire-time"
            type="text"
            value=""
            name="token_expire_time"
            // onChange={this.handleTempMetaKeyword}
          />
        </div>
        <br />
        <div className="flex justify-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                tabIndex={-1}
                // onClick={this.handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Allow Google Login"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                tabIndex={-1}
                // onClick={this.handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Allow Facebook Login"
          />
        </div>
      </div>
    </>
  );
};

SettingsManagePage.propTypes = {
  loadAllSettingsRequest: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(SettingsManagePage);
