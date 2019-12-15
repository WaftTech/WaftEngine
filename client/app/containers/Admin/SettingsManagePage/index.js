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
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectSettings,
  makeSelectLoading,
  makeSelectSettingsNormalized,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'settingsManagePage';

const styles = {};

export const SettingsManagePage = props => {
  const {
    loadAllSettingsRequest,
    settings,
    setValue,
    setting_normalized,
    editSettingsRequest,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllSettingsRequest();
  }, []);

  const handleDropDownChange = name => e => {
    setValue({ key: name, value: e.target.value });
  };

  const handleCheckedChange = name => e => {
    setValue({ key: name, value: e.target.checked });
  };

  const handleChange = name => e => {
    setValue({ key: name, value: e.target.value });
  };

  const handleSave = () => {
    editSettingsRequest();
  };

  const commentStatus = ['posted', 'onhold', 'approved', 'disapproved'];
  const emailChannel = ['waft', 'smtp', 'mailgun', 'sendgrid'];

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="comment-settings"
          id="comment-settings-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Comment Settings
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div className="flex">
              <label className="label" htmlFor="grid-comment-status">
                Default status of comment
              </label>
              <select
                className="inputbox"
                native="true"
                value={
                  Object.keys(setting_normalized).length &&
                  setting_normalized['default_status_of_comment'] &&
                  setting_normalized['default_status_of_comment'].value
                }
                // onChange={e => setCommentStatus(e.target.value)}
                onChange={handleDropDownChange('default_status_of_comment')}
              >
                <option value="" disabled>
                  None
                </option>
                {commentStatus.map(each => (
                  <option key={each} name="name" value={each}>
                    {each}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['recaptcha_check'] &&
                        setting_normalized['recaptcha_check'].value) ||
                      false
                    }
                    tabIndex={-1}
                    onClick={handleCheckedChange('recaptcha_check')}
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
                    checked={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['is_login_required'] &&
                        setting_normalized['is_login_required'].value) ||
                      false
                    }
                    tabIndex={-1}
                    onClick={handleCheckedChange('is_login_required')}
                    color="primary"
                  />
                }
                label="Is Login Required"
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="email-setting"
          id="email-setting-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Email Settings
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div className="flex justify-between">
              <div className="w-1/2">
                <label className="label" htmlFor="grid-email-channel">
                  Email Channel
                </label>
                <select
                  className="inputbox"
                  native="true"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized['email_channel'] &&
                      setting_normalized['email_channel'].value) ||
                    ''
                  }
                  onChange={handleDropDownChange('email_channel')}
                >
                  <option value="" disabled>
                    None
                  </option>
                  {emailChannel.map(each => (
                    <option key={each} name="name" value={each}>
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
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized['email_to_send_test_mail'] &&
                      setting_normalized['email_to_send_test_mail'].value) ||
                    ''
                  }
                  name="email_to_send_test_mail"
                  onChange={handleChange('email_to_send_test_mail')}
                />
              </div>
            </div>
            <br />
            <div className="flex">
              <div className="w-1/2">
                <div>
                  <label className="label" htmlFor="grid-protocol">
                    Protocol
                  </label>
                  <input
                    className="inputbox"
                    id="protocol"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['protocol'] &&
                        setting_normalized['protocol'].value) ||
                      ''
                    }
                    name="protocol"
                    onChange={handleChange('protocol')}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-email">
                    Email
                  </label>
                  <input
                    className="inputbox"
                    id="email"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['email'] &&
                        setting_normalized['email'].value) ||
                      ''
                    }
                    name="email"
                    onChange={handleChange('email')}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-password">
                    Password
                  </label>
                  <input
                    className="inputbox"
                    id="password"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['password'] &&
                        setting_normalized['password'].value) ||
                      ''
                    }
                    name="password"
                    onChange={handleChange('password')}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-server">
                    Server
                  </label>
                  <input
                    className="inputbox"
                    id="server"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['server'] &&
                        setting_normalized['server'].value) ||
                      ''
                    }
                    name="server"
                    onChange={handleChange('server')}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-port">
                    Port
                  </label>
                  <input
                    className="inputbox"
                    id="port"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['port'] &&
                        setting_normalized['port'].value) ||
                      ''
                    }
                    name="port"
                    onChange={handleChange('port')}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-security">
                    Security
                  </label>
                  <input
                    className="inputbox"
                    id="security"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['security'] &&
                        setting_normalized['security'].value) ||
                      ''
                    }
                    name="security"
                    onChange={handleChange('security')}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-password">
                    Secure
                  </label>
                  <select
                    className="inputbox"
                    native="true"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['secure'] &&
                        setting_normalized['secure'].value) ||
                      false
                    }
                    onChange={handleDropDownChange('secure')}
                  >
                    <option name="secure" value={true}>
                      True
                    </option>
                    <option name="secure" value={false}>
                      False
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-1/2 ml-4">
                <div>
                  <label className="label" htmlFor="grid-api-key">
                    Api Key
                  </label>
                  <input
                    className="inputbox"
                    id="api-key"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['api_key'] &&
                        setting_normalized['api_key'].value) ||
                      ''
                    }
                    name="api_key"
                    onChange={handleChange('api_key')}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="grid-domain">
                    Domain
                  </label>
                  <input
                    className="inputbox"
                    id="domain"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['domain'] &&
                        setting_normalized['domain'].value) ||
                      ''
                    }
                    name="domain"
                    onChange={handleChange('domain')}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="grid-sendgrid-api-key">
                    Api Key
                  </label>
                  <input
                    className="inputbox"
                    id="sendgrid-api-key"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['sendgrid_api_key'] &&
                        setting_normalized['sendgrid_api_key'].value) ||
                      ''
                    }
                    name="sendgrid-api-key"
                    onChange={handleChange('sendgrid_api_key')}
                  />
                </div>
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="login-settings"
          id="login-settings-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Register and login Settings
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['is_public_registration'] &&
                        setting_normalized['is_public_registration'].value) ||
                      false
                    }
                    tabIndex={-1}
                    onClick={handleCheckedChange('is_public_registration')}
                    color="primary"
                  />
                }
                label="Is Public Registration"
              />
            </div>
            <div className="flex">
              <label className="label" htmlFor="grid-secret-key">
                SecretKey
              </label>
              <input
                className="inputbox"
                id="secret-key"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized['secret_key'] &&
                    setting_normalized['secret_key'].value) ||
                  ''
                }
                name="secret_key"
                onChange={handleChange('secret_key')}
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
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized['token_expire_time'] &&
                    setting_normalized['token_expire_time'].value) ||
                  ''
                }
                name="token_expire_time"
                onChange={handleChange('token_expire_time')}
              />
            </div>
            <br />
            <div className="flex justify-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['allow_google_login'] &&
                        setting_normalized['allow_google_login'].value) ||
                      false
                    }
                    tabIndex={-1}
                    onClick={handleCheckedChange('allow_google_login')}
                    color="primary"
                  />
                }
                label="Allow Google Login"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized['allow_facebook_login'] &&
                        setting_normalized['allow_facebook_login'].value) ||
                      false
                    }
                    tabIndex={-1}
                    onClick={handleCheckedChange('allow_facebook_login')}
                    color="primary"
                  />
                }
                label="Allow Facebook Login"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <label className="label" htmlFor="grid-client-id">
                  Client Id
                </label>
                <input
                  className="inputbox"
                  id="client-id"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized['client_id'] &&
                      setting_normalized['client_id'].value) ||
                    ''
                  }
                  name="client_id"
                  onChange={handleChange('client_id')}
                />
              </div>
              <div className="w-1/2 ml-4">
                <label className="label" htmlFor="grid-app-id">
                  App Id
                </label>
                <input
                  className="inputbox"
                  id="app-id"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized['app_id'] &&
                      setting_normalized['app_id'].value) ||
                    ''
                  }
                  name="app_id"
                  onChange={handleChange('app_id')}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <label className="label" htmlFor="grid-client-secret">
                  Client Secret
                </label>
                <input
                  className="inputbox"
                  id="client-secret"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized['client_secret'] &&
                      setting_normalized['client_secret'].value) ||
                    ''
                  }
                  name="client_secret"
                  onChange={handleChange('client_secret')}
                />
              </div>
              <div className="w-1/2 ml-4">
                <label className="label" htmlFor="grid-app-secret">
                  App Secret
                </label>
                <input
                  className="inputbox"
                  id="app-secret"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized['app_secret'] &&
                      setting_normalized['app_secret'].value) ||
                    ''
                  }
                  name="app_secret"
                  onChange={handleChange('app_secret')}
                />
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="captcha-keys"
          id="captcha-keys-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Captcha Keys
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div className="flex">
              <label className="label" htmlFor="grid-email-channel">
                Secret Key
              </label>
              <input
                className="inputbox"
                id="secret-key"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized['captcha_secret_key'] &&
                    setting_normalized['captcha_secret_key'].value) ||
                  ''
                }
                name="captcha_secret_key"
                onChange={handleChange('captcha_secret_key')}
              />
            </div>
            <br />
            <div className="flex">
              <label className="label" htmlFor="grid-site-key">
                Site Key
              </label>
              <input
                className="inputbox"
                id="site-key"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized['captcha_site_key'] &&
                    setting_normalized['captcha_site_key'].value) ||
                  ''
                }
                name="site_key"
                onChange={handleChange('captcha_site_key')}
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <button
        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme justify-center"
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );
};

SettingsManagePage.propTypes = {
  loadAllSettingsRequest: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  setting_normalized: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
  setting_normalized: makeSelectSettingsNormalized(),
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
