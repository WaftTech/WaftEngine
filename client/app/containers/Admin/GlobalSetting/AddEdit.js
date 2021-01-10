/**
 *
 * GlobalSetting
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectLoading, makeSelectOne } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import { FaPencilAlt, FaPlus, FaArrowLeft } from 'react-icons/fa';

const key = 'globalSetting';

export const GlobalSetting = props => {
  const {
    loading,
    one,
    loadOneRequest,
    push,
    setOneValue,
    saveRequest,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (props.match.params && props.match.params.id) {
      loadOneRequest(props.match.params.id);
    }
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleBack = () => {
    push('/admin/global-setting');
  };

  const handleSave = () => {
    saveRequest();
  };

  return (
    <>
      <Helmet>
        <title>Global Settings </title>
      </Helmet>
      <div className="flex justify-between my-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>
          <span className="backbtn" onClick={handleBack}>
            <FaArrowLeft className="text-xl" />
          </span>
          Global Setting {props.match.params.id ? 'Edit' : 'Add'}
        </PageHeader>
      </div>
      <PageContent loading={loading}>
        <div className="w-full md:w-1/2 pb-4">
          <label>Key</label>
          <input
            className="inputbox"
            id="key"
            type="text"
            name="key"
            value={one.key || ''}
            onChange={handleChange('key')}
          />
        </div>
        <div className="w-full md:w-1/2 pb-4">
          <label>Value</label>
          <input
            className="inputbox"
            id="value"
            type="text"
            name="value"
            value={one.value || ''}
            onChange={handleChange('value')}
          />
        </div>
        <div className="w-full md:w-1/2 pb-4">
          <button
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </PageContent>
    </>
  );
};

GlobalSetting.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  one: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
  withRouter,
)(GlobalSetting);
