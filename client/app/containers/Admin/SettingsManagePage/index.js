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
import Loading from '../../../components/Loading';
import { FaCheck } from 'react-icons/fa';

const key = 'settingsManagePage';

export const SettingsManagePage = props => {
  const {
    loadAllSettingsRequest,
    settings,
    setValue,
    classes,
    setting_normalized,
    editSettingsRequest,
    loading,
    sendTestMailRequest,
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

  const sendTestMail = () => {
    sendTestMailRequest();
  };

  const commentStatus = ['posted', 'onhold', 'approved', 'disapproved'];
  const emailChannel = ['waft', 'smtp', 'mailgun', 'sendgrid'];

  return (
    <>
      <div className="flex justify-between my-3">
        {loading && loading === true ? <Loading /> : <></>}
      </div>

      <div>
        <div className="bg-white rounded p-6 shadow">
          <div className="max-w-xl">
            <h3 className="text-lg font-bold pb-2">Basic Settings</h3>
            <label className="text-sm mt-4 mr-2" htmlFor="grid-comment-status">
              Default status of comment
            </label>
            <select
              className="inputbox flex-1"
              native="true"
              value={
                Object.keys(setting_normalized).length &&
                setting_normalized.default_status_of_comment &&
                setting_normalized.default_status_of_comment.value
              }
              // onChange={e => setCommentStatus(e.target.value)}
              onChange={handleDropDownChange('default_status_of_comment')}
            >
              <option value="" disabled>
                None
              </option>
              {commentStatus.map((each, index) => (
                <option key={`${each}-${index}`} name="name" value={each}>
                  {each}
                </option>
              ))}
            </select>
            <div className="checkbox mt-4">
              <input
                checked={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.recaptcha_check &&
                    setting_normalized.recaptcha_check.value) ||
                  false
                }
                onClick={handleCheckedChange('recaptcha_check')}
                id="is_active"
                type="checkbox"
              />
              <label htmlFor="is_active">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Recaptcha Check
              </label>
            </div>
            <div className="checkbox">
              <input
                checked={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.is_login_required &&
                    setting_normalized.is_login_required.value) ||
                  false
                }
                onClick={handleCheckedChange('is_login_required')}
                id="is_login"
                type="checkbox"
              />
              <label htmlFor="is_login">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Is Login Required
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded p-6 shadow mt-6">
          <h3 className="text-lg font-bold pb-2">Email Settings</h3>
          <div className="max-w-xl">
            <div className="pt-4">
              <label className="text-sm mt-4" htmlFor="grid-email-channel">
                Email Channel
              </label>
              <select
                className="inputbox"
                native="true"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.email_channel &&
                    setting_normalized.email_channel.value) ||
                  ''
                }
                onChange={handleDropDownChange('email_channel')}
              >
                <option value="" disabled>
                  None
                </option>
                {emailChannel.map((each, index) => (
                  <option key={`${each}-${index}`} name="name" value={each}>
                    {each}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-4">
              <label>Email to send test mail</label>
              <input
                className="inputbox"
                id="email-to-send-test-mail"
                type="email"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.email_to_send_test_mail &&
                    setting_normalized.email_to_send_test_mail.value) ||
                  ''
                }
                name="email_to_send_test_mail"
                onChange={handleChange('email_to_send_test_mail')}
              />
              <button
                type="button"
                className="btn bg-blue-500 hover:bg-blue-600"
                onClick={sendTestMail}
              >
                Send Test Mail
              </button>
            </div>
          </div>
          {Object.keys(setting_normalized).length &&
            setting_normalized.email_channel &&
            setting_normalized.email_channel.value === 'smtp' && (
              <div className="flex-wrap px-4">
                <div className="w-1/2 pb-4">
                  <label>Protocal</label>
                  <Input
                    className="inputbox"
                    id="protocol"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.protocol &&
                        setting_normalized.protocol.value) ||
                      ''
                    }
                    name="protocol"
                    onChange={handleChange('protocol')}
                  />
                </div>
                <div className="w-1/2 pb-4">
                  <label>Email</label>
                  <input
                    className="inputbox"
                    id="email"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.email &&
                        setting_normalized.email.value) ||
                      ''
                    }
                    name="email"
                    onChange={handleChange('email')}
                  />
                </div>
                <div className="w-1/2 pb-4">
                  <label>Password</label>
                  <input
                    className="inputbox"
                    id="password"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.password &&
                        setting_normalized.password.value) ||
                      ''
                    }
                    name="password"
                    onChange={handleChange('password')}
                  />
                </div>
                <div className="w-1/2 pb-4">
                  <label>Server</label>
                  <input
                    className="inputbox"
                    id="server"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.server &&
                        setting_normalized.server.value) ||
                      ''
                    }
                    name="server"
                    onChange={handleChange('server')}
                  />
                </div>

                <div className="w-1/2 pb-4">
                  <label>Port</label>
                  <input
                    className="inputbox"
                    id="port"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.port &&
                        setting_normalized.port.value) ||
                      ''
                    }
                    name="port"
                    onChange={handleChange('port')}
                  />
                </div>
                <div className="w-1/2 pb-4">
                  <label>Security</label>
                  <input
                    className="inputbox"
                    id="security"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.security &&
                        setting_normalized.security.value) ||
                      ''
                    }
                    name="security"
                    onChange={handleChange('security')}
                  />
                </div>
                <div className="w-1/2 pb-4">
                  <label className="text-sm mt-4">Secure</label>
                  <select
                    className="inputbox"
                    native="true"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.secure &&
                        setting_normalized.secure.value) ||
                      false
                    }
                    onChange={handleDropDownChange('secure')}
                  >
                    <option name="secure" value>
                      True
                    </option>
                    <option name="secure" value={false}>
                      False
                    </option>
                  </select>
                </div>
              </div>
            )}

          {Object.keys(setting_normalized).length &&
            setting_normalized.email_channel &&
            setting_normalized.email_channel.value === 'mailgun' && (
              <div className="flex justify-between px-4">
                <div className="w-1/3 pb-4 -ml-4">
                  <label>API Key</label>
                  <input
                    className="inputbox"
                    id="api-key"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.api_key &&
                        setting_normalized.api_key.value) ||
                      ''
                    }
                    name="api_key"
                    onChange={handleChange('api_key')}
                  />
                </div>
                <div className="w-1/3 pb-4">
                  <label>Domain</label>
                  <input
                    className="inputbox"
                    id="domain"
                    type="text"
                    value={
                      (Object.keys(setting_normalized).length &&
                        setting_normalized.domain &&
                        setting_normalized.domain.value) ||
                      ''
                    }
                    name="domain"
                    onChange={handleChange('domain')}
                  />
                </div>
              </div>
            )}
          {Object.keys(setting_normalized).length &&
            setting_normalized.email_channel &&
            setting_normalized.email_channel.value === 'sendgrid' && (
              <div className="flex justify-between px-4">
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
            )}
        </div>
      </div>

      <div className="bg-white rounded p-6 shadow mt-6">
        <h3 className="text-lg font-bold pb-2">Register & Login Setting</h3>
        <div>
          <div>
            <div className="checkbox">
              <input
                checked={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.is_public_registration &&
                    setting_normalized.is_public_registration.value) ||
                  false
                }
                tabIndex={-1}
                onClick={handleCheckedChange('is_public_registration')}
                id="is_fb_login"
                type="checkbox"
              />
              <label htmlFor="is_fb_login">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Is Public Registration
              </label>
            </div>
          </div>
          <div className="flex justify-between px-4">
            <div className="w-1/2 -ml-4">
              <label>Secret Key</label>
              <input
                className="inputbox"
                id="secret-key"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.secret_key &&
                    setting_normalized.secret_key.value) ||
                  ''
                }
                name="secret_key"
                onChange={handleChange('secret_key')}
              />
            </div>
            <div className="w-1/2 -mr-4">
              <label>Token Expire Time</label>
              <input
                className="inputbox"
                id="token-expire-time"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.token_expire_time &&
                    setting_normalized.token_expire_time.value) ||
                  ''
                }
                name="token_expire_time"
                onChange={handleChange('token_expire_time')}
              />
            </div>
          </div>
          <div className="flex my-4">
            <div className="checkbox">
              <input
                checked={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.allow_google_login &&
                    setting_normalized.allow_google_login.value) ||
                  false
                }
                disabled={
                  Object.keys(setting_normalized).length &&
                  setting_normalized.is_public_registration
                    ? !setting_normalized.is_public_registration.value
                    : true
                }
                tabIndex={-1}
                onClick={handleCheckedChange('allow_google_login')}
                id="is_fb_login"
                type="checkbox"
              />
              <label htmlFor="is_fb_login">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Allow Google Login
              </label>
            </div>

            <div className="checkbox">
              <input
                checked={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.allow_facebook_login &&
                    setting_normalized.allow_facebook_login.value) ||
                  false
                }
                disabled={
                  Object.keys(setting_normalized).length &&
                  setting_normalized.is_public_registration
                    ? !setting_normalized.is_public_registration.value
                    : true
                }
                onClick={handleCheckedChange('allow_facebook_login')}
                id="is_fb_login"
                type="checkbox"
              />
              <label htmlFor="is_fb_login">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Allow Facebook Login
              </label>
            </div>
          </div>
          <div className="flex justify-between px-4">
            <div className="w-1/2 pb-4 -ml-4">
              <div>
                <label>Client ID</label>
                <input
                  className="inputbox"
                  id="client-id"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized.client_id &&
                      setting_normalized.client_id.value) ||
                    ''
                  }
                  disabled={
                    Object.keys(setting_normalized).length &&
                    setting_normalized.allow_google_login
                      ? !setting_normalized.allow_google_login.value
                      : true
                  }
                  name="client_id"
                  onChange={handleChange('client_id')}
                />
              </div>
              <div>
                <label>Client Secret</label>
                <input
                  className="inputbox"
                  id="client-secret"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized.client_secret &&
                      setting_normalized.client_secret.value) ||
                    ''
                  }
                  disabled={
                    Object.keys(setting_normalized).length &&
                    setting_normalized.allow_google_login
                      ? !setting_normalized.allow_google_login.value
                      : true
                  }
                  name="client_secret"
                  onChange={handleChange('client_secret')}
                />
              </div>
            </div>
            <div className="w-1/2 pb-4 -mr-4">
              <div>
                <label>App ID</label>
                <input
                  className="inputbox"
                  id="app-id"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized.app_id &&
                      setting_normalized.app_id.value) ||
                    ''
                  }
                  disabled={
                    Object.keys(setting_normalized).length &&
                    setting_normalized.allow_facebook_login
                      ? !setting_normalized.allow_facebook_login.value
                      : true
                  }
                  name="app_id"
                  onChange={handleChange('app_id')}
                />
              </div>
              <div>
                <label>App Secret</label>
                <input
                  className="inputbox"
                  id="app-secret"
                  type="text"
                  value={
                    (Object.keys(setting_normalized).length &&
                      setting_normalized.app_secret &&
                      setting_normalized.app_secret.value) ||
                    ''
                  }
                  disabled={
                    Object.keys(setting_normalized).length &&
                    setting_normalized.allow_facebook_login
                      ? !setting_normalized.allow_facebook_login.value
                      : true
                  }
                  name="app_secret"
                  onChange={handleChange('app_secret')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded p-6 shadow mt-6">
        <h3 className="text-lg font-bold pb-2">Captcha Keys</h3>
        <div className="max-w-xl">
          <div className="flex justify-between px-4">
            <div className="w-1/2 pb-4 -ml-4">
              <label>Secret Key</label>
              <input
                className="inputbox"
                id="secret-key"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.captcha_secret_key &&
                    setting_normalized.captcha_secret_key.value) ||
                  ''
                }
                name="captcha_secret_key"
                onChange={handleChange('captcha_secret_key')}
              />
            </div>

            <div className="w-1/2 pb-4 -mr-4">
              <label>Site Key</label>
              <input
                className="inputbox"
                id="site-key"
                type="text"
                value={
                  (Object.keys(setting_normalized).length &&
                    setting_normalized.captcha_site_key &&
                    setting_normalized.captcha_site_key.value) ||
                  ''
                }
                name="site_key"
                onChange={handleChange('captcha_site_key')}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="block btn bg-blue-500 border border-blue-600 hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Settings
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
