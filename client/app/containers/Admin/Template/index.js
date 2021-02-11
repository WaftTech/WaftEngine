/**
 *
 * Template
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectOne, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';
import WECkEditior from '../../../components/CkEditor';
import { FaArrowLeft } from 'react-icons/fa';

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
  match,
  push,
}) {
  const [data, setData] = useState('');
  useEffect(() => {
    if (match.params && match.params.key) {
      loadOneRequest(match.params.key);
      setData(match.params.key);
    }
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

  const handleGoBack = () => {
    push('/admin/template-manage');
  };

  const handleChange = e => {
    setOneValue({ key: e.target.name, value: e.target.value });
  };
  return (
    <>
      <div className="flex justify-between my-3">
        {loading && loading == true ? <Loading /> : <></>}

        <PageHeader>
          <span className="backbtn" onClick={handleGoBack}>
            <FaArrowLeft className="text-xl" />
          </span>
          Email Template Manage
        </PageHeader>
      </div>
      <PageContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* <div className="w-full md:w-1/2 pb-4">
            <label className="label">Template Key</label>
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
          </div> */}

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">Template Name</label>
            <input
              type="text"
              className="inputbox"
              id="template-name"
              name="template_name"
              value={one.template_name || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">Informations</label>
            <input
              className="inputbox"
              type="text"
              id="informations"
              name="information"
              value={one.information || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">Variables</label>
            <input
              className="inputbox"
              type="text"
              id="variables"
              name="variables"
              value={one.variables || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label">From</label>
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
            <label className="label">Subject</label>
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
            <label className="label">Alternate Text</label>
            <input
              className="inputbox"
              type="text"
              id="alternate_text"
              name="alternate_text"
              value={one.alternate_text || ''}
              onChange={handleChange}
            />
          </div>

          <div className="w-full pb-4">
            <label className="label">Body</label>
            <WECkEditior
              description={one.body || ''}
              setOneValue={setOneValue}
              is_body
            />
          </div>

          <button className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600">
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
  classes: PropTypes.object,
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

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'adminTemplateListingPage', reducer });
const withSaga = injectSaga({ key: 'adminTemplateListingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Template);
