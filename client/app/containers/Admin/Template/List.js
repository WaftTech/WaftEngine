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
import Table from '../../../components/Table';
import { FaPencilAlt, FaPlus, FaSearch } from 'react-icons/fa';

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
  push,
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

  const handleAdd = () => {
    clearOne();
    push(`/admin/template-manage/add`);
  };
  const handleEdit = key => {
    clearOne();
    push(`/admin/template-manage/edit/${key}`);
  };

  const tableData = all.map(({ template_name, template_key }) => [
    template_name,
    template_key,
    <div className="flex">
      <span
        className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
        onClick={() => handleEdit(template_key)}
      >
        <FaPencilAlt className="pencil" />
        <span className="bg-blue-500 dash" />
      </span>
    </div>,
  ]);
  return (
    <>
      <div className="flex justify-between my-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Email Template List</PageHeader>
        <div className="flex items-center">
          <button
            className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
            onClick={handleAdd}
          >
            <FaPlus />
            <span className="pl-2">Add Template</span>
          </button>
        </div>
      </div>
      <PageContent>
        <Table
          tableData={tableData}
          tableHead={['Name', 'Key', 'Edit']}
          pagination={{ totaldata: all.length }}
        />
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

export default compose(withReducer, withSaga, withConnect)(Template);
