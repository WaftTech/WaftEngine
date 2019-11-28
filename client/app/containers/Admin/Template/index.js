/**
 *
 * Template
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// import Close from '@material-ui/icons/Close';

// core components

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectOne, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';

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

export function Template({
  classes,
  loadAllRequest,
  loadOneRequest,
  addEditRequest,
  setOneValue,
  clearOne,
  all,
  one,
  loading,
}) {
  const [data, setData] = useState('');
  useEffect(() => {
    clearOne();
    loadAllRequest();
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (data) {
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
  return (
    <>
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Email Template Manage</PageHeader>
      </div>
      <PageContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              Template Key
            </label>
            <select
              className="inputbox"
              id="template-key"
              name="template_key"
              value={data || ''}
              onChange={handleTemplateChange}
            >
              <option value="" name="none" disabled>
                None
              </option>
              {all.map(each => (
                <option value={each.template_key} key={each._id}>
                  {each.template_key}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              Template Name
            </label>
            <input
              type="text"
              className="inputbox"
              readOnly
              id="template-name"
              name="template-name"
              value={one.template_name || ''}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              Informations
            </label>
            <input
              className="inputbox"
              type="text"
              readOnly
              id="informations"
              name="informations"
              value={one.information || ''}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              Variables
            </label>
            <input
              className="inputbox"
              type="text"
              id="variables"
              name="variables"
              readOnly
              value={one.variables || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              From
            </label>
            <input
              className="inputbox"
              type="text"
              id="from_email"
              name="from"
              value={one.from || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              Subject
            </label>
            <input
              className="inputbox"
              type="text"
              id="subject_email"
              name="subject"
              value={one.subject || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">
              Alternate Text
            </label>
            <input
              className="inputbox"
              type="text"
              id="alternate_text"
              name="alternate_text"
              value={one.alternate_text || ''}
              onChange={handleChange}
            />
          </div>

          <div dangerouslySetInnerHTML={{ __html: one.body }} />

          <div className="w-full pb-4">
            <label className="label">
              Body
            </label>
            <textarea
              className="inputbox"
              type="text"
              id="body_email"
              name="body"
              value={one.body || ''}
              onChange={handleChange}
              style={{ height: '400px' }}
            />
          </div>

          <button className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme">
            Save
          </button>
        </form>
      </PageContent>
    </>
  );
}

Template.propTypes = {
  all: PropTypes.array.isRequired,
  one: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  loadOneRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
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
)(Template);
