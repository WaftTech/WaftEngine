/**
 *
 * AdminTemplateListingPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
// import Close from '@material-ui/icons/Close';

// core components

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectOne, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export function AdminTemplateListingPage({
  classes,
  loadAllRequest,
  loadOneRequest,
  addEditRequest,
  setOneValue,
  all,
  one,
  loading,
}) {
  console.log(all);
  const [data, setData] = useState('');
  useEffect(() => {
    loadAllRequest();
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (data) {
      console.log('submit');
      addEditRequest();
    }
  };
  const handleTemplateChange = e => {
    // if template is not loaded call api
    // else load template to one from store
    const { value } = e.target;
    setData(value);
    value && loadOneRequest(value);
  };
  const handleChange = e => {
    setOneValue({ key: e.target.name, value: e.target.value });
  };
  return loading && loading == true ? (
    <CircularProgress color="primary" disableShrink />
  ) : (
    <>
      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>Email Template Manage</PageHeader>
      </div>
      <PageContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Template Key
            </label>
            <select
              className="Waftinputbox"
              id="template-key"
              name="template_key"
              value={data || ''}
              onChange={handleTemplateChange}
            >
              {all.map(each => (
                <option value={each.template_key} key={each._id}>
                  {each.template_key}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Template Name
            </label>
            <input
              type="text"
              className="Waftinputbox"
              readOnly
              id="template-name"
              name="template-name"
              value={one.template_name || ''}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Informations
            </label>
            <input
              className="Waftinputbox"
              type="text"
              readOnly
              id="informations"
              name="informations"
              value={one.information || ''}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Variables
            </label>
            <input
              className="Waftinputbox"
              type="text"
              id="variables"
              name="variables"
              readOnly
              value={one.variables || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              From
            </label>
            <input
              className="Waftinputbox"
              type="text"
              id="from_email"
              name="from"
              value={one.from || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Subject
            </label>
            <input
              className="Waftinputbox"
              type="text"
              id="subject_email"
              name="subject"
              value={one.subject || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Alternate Text
            </label>
            <input
              className="Waftinputbox"
              type="text"
              id="alternate_text"
              name="alternate_text"
              value={one.alternate_text || ''}
              onChange={handleChange}
            />
          </div>

          <div dangerouslySetInnerHTML={{ __html: one.body }} />

          <div className="w-full pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Body
            </label>
            <textarea
              className="Waftinputbox"
              type="text"
              id="body_email"
              name="body"
              value={one.body || ''}
              onChange={handleChange}
              style={{height:'400px'}}
            />
          </div>

          <button className="text-white py-2 px-4 rounded mt-4 btn-waft">
            Save
          </button>
        </form>
      </PageContent>
    </>
  );
}

AdminTemplateListingPage.propTypes = {
  all: PropTypes.array.isRequired,
  one: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  loadOneRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'adminTemplateListingPage', reducer });
const withSaga = injectSaga({ key: 'adminTemplateListingPage', saga });

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminTemplateListingPage);
