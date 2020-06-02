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

// @material components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
import PageHeader from '../../../components/PageHeader/PageHeader';
import Loading from '../../../components/Loading';
import Input from '../../../components/customComponents/Input';
import Select from '../../../components/customComponents/Select';

const key = 'settingsManagePage';

const styles = theme => ({
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },

  ExpansionPanelMainWrapper: {
    marginBottom: '8px',
    boxShadow: 'none',
  },

  productRoot: {
    minHeight: '44px',
  },

  productContent: {
    margin: '6px 0px',
  },

  productExpandIcon: {
    padding: '0px 12px',
  },

  productExpanded: {
    borderBottom: '1px solid gainsboro',
    margin: '6px 0px !important',
    '& > div': {
      borderBottom: 'none',
      margin: '6px 0px',
    },
  },

  detail: {
    width: '100%',
  },
});

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
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>General Settings</PageHeader>
      </div>
      <ExpansionPanel className={classes.ExpansionPanelMainWrapper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="comment-settings"
          id="comment-settings-header"
          classes={{
            root: classes.productRoot,
            content: classes.productContent,
            expandIcon: classes.productExpandIcon,
            expanded: classes.productExpanded,
          }}
        >
          <Typography className={classes.heading}>Common Setting</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.detail}>
            <div className="bg-white rounded p-4 shadow">
              <div className="flex items-center">
                <label
                  className="font-bold text-gray-700 mr-2"
                  htmlFor="grid-comment-status"
                >
                  Default status of comment :
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
                          setting_normalized.recaptcha_check &&
                          setting_normalized.recaptcha_check.value) ||
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
                          setting_normalized.is_login_required &&
                          setting_normalized.is_login_required.value) ||
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
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.ExpansionPanelMainWrapper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="email-setting"
          id="email-setting-header"
          classes={{
            root: classes.productRoot,
            content: classes.productContent,
            expandIcon: classes.productExpandIcon,
            expanded: classes.productExpanded,
          }}
        >
          <Typography className={classes.heading}>Email Setting</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.detail}>
            <div className="bg-white rounded p-4 shadow">
              <div className="flex justify-between px-4">
                <div className="w-1/3 -ml-4 pb-4">
                  <label
                    className="font-bold text-gray-700"
                    htmlFor="grid-email-channel"
                  >
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
                    {emailChannel.map(each => (
                      <option key={each} name="name" value={each}>
                        {each}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/3 pb-4">
                  <Input
                    label="Email to send test mail"
                    inputclassName="inputbox"
                    inputid="email-to-send-test-mail"
                    inputType="email"
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
                    className="block btn bg-primary hover:bg-secondary"
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
                    <div className="w-1/2 pb-4  ">
                      <Input
                        label="Protocol"
                        inputclassName="inputbox"
                        inputid="protocol"
                        inputType="text"
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
                    <div className="w-1/2 pb-4 ">
                      <Input
                        label="Email"
                        inputclassName="inputbox"
                        inputid="email"
                        inputType="text"
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
                    <div className="w-1/2 pb-4 ">
                      <Input
                        label="Password"
                        inputclassName="inputbox"
                        inputid="password"
                        inputType="text"
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
                    <div className="w-1/2 pb-4  ">
                      <Input
                        label="Server"
                        inputclassName="inputbox"
                        inputid="server"
                        inputType="text"
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

                    <div className="w-1/2 pb-4  ">
                      <Input
                        label="Port"
                        inputclassName="inputbox"
                        inputid="port"
                        inputType="text"
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
                    <div className="w-1/2 pb-4 ">
                      <Input
                        label="Security"
                        inputclassName="inputbox"
                        inputid="security"
                        inputType="text"
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
                    <div className="w-1/2 pb-4 ">
                      <label className="font-bold text-gray-700">Secure</label>
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
                  <div className="flex justify-between px-4 flex">
                    <div className="w-1/3 pb-4 -ml-4">
                      <Input
                        label="Api Key"
                        inputclassName="inputbox"
                        inputid="api-key"
                        inputType="text"
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
                    <div className="w-1/3 pb-4 ">
                      <Input
                        label="Domain"
                        inputclassName="inputbox"
                        inputid="domain"
                        inputType="text"
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
                  <div className="flex justify-between px-4 flex">
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.ExpansionPanelMainWrapper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="login-settings"
          id="login-settings-header"
          classes={{
            root: classes.productRoot,
            content: classes.productContent,
            expandIcon: classes.productExpandIcon,
            expanded: classes.productExpanded,
          }}
        >
          <Typography className={classes.heading}>
            Register & Login Setting
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.detail}>
            <div className="bg-white rounded p-4 shadow">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        (Object.keys(setting_normalized).length &&
                          setting_normalized.is_public_registration &&
                          setting_normalized.is_public_registration.value) ||
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
              <div className="flex justify-between px-4">
                <div className="w-1/2 -ml-4">
                  <Input
                    label="SecretKey"
                    inputclassName="inputbox"
                    inputid="secret-key"
                    inputType="text"
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
                  <Input
                    label="Token Expire Time"
                    inputclassName="inputbox"
                    inputid="token-expire-time"
                    inputType="text"
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
              <div className="flex">
                <FormControlLabel
                  control={
                    <Checkbox
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
                      tabIndex={-1}
                      onClick={handleCheckedChange('allow_facebook_login')}
                      color="primary"
                    />
                  }
                  label="Allow Facebook Login"
                />
              </div>
              <div className="flex justify-between px-4">
                <div className="w-1/2 pb-4 -ml-4">
                  <div>
                    <Input
                      label="Client Id"
                      inputclassName="inputbox"
                      inputid="client-id"
                      inputType="text"
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
                    <Input
                      label="Client Secret"
                      inputclassName="inputbox"
                      inputid="client-secret"
                      inputType="text"
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
                    <Input
                      label="App Id"
                      inputclassName="inputbox"
                      inputid="app-id"
                      inputType="text"
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
                    <Input
                      label="App Secret"
                      inputclassName="inputbox"
                      inputid="app-secret"
                      inputType="text"
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.ExpansionPanelMainWrapper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="captcha-keys"
          id="captcha-keys-header"
          classes={{
            root: classes.productRoot,
            content: classes.productContent,
            expandIcon: classes.productExpandIcon,
            expanded: classes.productExpanded,
          }}
        >
          <Typography className={classes.heading}>Captcha Keys</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.detail}>
            <div className="bg-white rounded p-4 shadow">
              <div className="flex justify-between px-4">
                <div className="w-1/2 pb-4 -ml-4">
                  <Input
                    label="Secret Key"
                    inputclassName="inputbox"
                    inputid="secret-key"
                    inputType="text"
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
                  <Input
                    label="Site Key"
                    inputclassName="inputbox"
                    inputid="site-key"
                    inputType="text"
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <button
        className="block btn bg-primary hover:bg-secondary"
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );
};

const withStyle = withStyles(styles);

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
  withStyle,
  memo,
)(SettingsManagePage);
