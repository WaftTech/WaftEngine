/**
 *
 * Testimonial
 *
 */

import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Table from '../../../components/Table';
import { makeSelectAccess } from '../../App/selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectErrors, makeSelectLoading, makeSelectQuery, makeSelectshowPopUp, makeSelectSliderSetting } from './selectors';
import Dialog from '../../../components/Dialog';


const key = 'testimonial';

export const Testimonial = props => {
  const {
    all: { data, page, size, totalData, sort },
    loadAllRequest,
    clearOne,
    clearQuery,
    setQueryValue,
    query,
    loading,
    errors,
    push,
    access,
    deleteOneRequest,
    slider_setting,
    sliderSettingChange,
    sliderSettingRequest, loadSliderSettingRequest, showPopUp, closePopUp, openPopUp
  } = props;

  useEffect(() => {
    clearQuery();
  }, []);
  useEffect(() => {
    loadSliderSettingRequest()
  }, [showPopUp]);
  useEffect(() => {
    loadAllRequest(query);
  }, [query.size, query.page]);

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState(false);
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {

    setAccessList(access[window.location.pathname]);
  }, [access]);

  console.log(accessList, 'accesslist');

  const handleEdit = id => {
    push(`/admin/testimonial-manage/edit/${id}`);
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleAdd = () => {
    clearOne();
    push('/admin/testimonial-manage/add');
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = name => {
    let value = 'desc';
    console.log(sort[name]);
    if (sort[name] === -1) {
      value = 'asc';
    }
    setQueryValue({ key: 'sort', value: `${name}:${value}` });
  };

  const tablePagination = { page, size, totalData };
  const tableData = data && data.map(
    ({ _id, name, designation, company, description, date }) => [
      name,
      designation,
      company,
      description,
      moment(date).format('ll'),
      <>
        <div className="flex justify-center">
          {accessList.includes('edit') && (
            <button
              type="button"
              aria-label="Edit"
              className="w-6 inline-flex justify-center items-center leading-none cursor-pointer relative"
              onClick={() => handleEdit(_id)}
            >
              <FaPencilAlt className="tblpencil text-xs text-blue-400 hover:text-blue-500" />
            </button>
          )}

          {accessList.includes('delete') && (
            <button
              type="button"
              className="w-6 inline-flex justify-center items-center leading-none cursor-pointer relative"
              onClick={() => handleOpen(_id)}
            >
              <FaTrash className="tbltrash text-xs text-red-400 hover:text-red-500" />
            </button>
          )}
        </div>
      </>,
    ],
  );
  const handleSliderSettings = name => event => {
    const value = event.target.value
    debugger
    if (event.target.type === 'number') {
      sliderSettingChange({
        key: name,
        value: parseInt(value),
      })
    } else {
      sliderSettingChange({ key: name, value: value });
    }
  }
  const handleSliderSettingsCheckbox = key => event => {
    const value = event.target.checked
    sliderSettingChange({ key, value })
  }
  return (
    <>
      <div>
        <Helmet>
          <title>Testimonial Manage</title>
        </Helmet>
      </div>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Testimonial Manage</PageHeader>
        {accessList.includes('add/edit') && (
          <div className="flex items-center">
            <button className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"
              onClick={handleAdd}>
              <div className="flex items-center">
                <FaPlus />
                <span className="pl-2"> Add New</span>
              </div>
            </button>
          </div>
        )}
      </div>
      <PageContent loading={loading}>

        <Dialog
          className="w-2/3 overflow-auto"
          open={showPopUp}
          onClose={closePopUp}
          title={`Testimonial Settings`}
          body={
            <>
              <div className="w-full flex justify-between px-2">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Arrow</th>
                      <th className="border px-2 py-1">Dots</th>
                      <th className="border px-2 py-1">Slides To Show</th>
                      <th className="border px-2 py-1">Slides To Scroll</th>
                      <th className="border px-2 py-1">Slides Per Row</th>
                      <th className="border px-2 py-1">AutoPlay </th>
                      <th className="border px-2 py-1">AutoPlay Speed </th>
                      <th className="border px-2 py-1">Center Mode </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle text-center border px-2 py-1">
                        <div className="checkbox" style={{ marginRight: '0px' }}>
                          <input
                            onChange={handleSliderSettingsCheckbox('arrows')}
                            name="arrows"
                            checked={slider_setting.arrows || false}
                            id="arrow"
                            type="checkbox"
                          />
                          <label htmlFor="arrow">
                            <span className="box">
                              <FaCheck className="check-icon" />
                            </span>
                          </label>
                        </div>
                      </td>
                      <td className="align-middle text-center border px-2 py-1">
                        <div className="checkbox" style={{ marginRight: '0px' }}>
                          <input
                            onChange={handleSliderSettingsCheckbox('dots')}
                            checked={slider_setting.dots || false}
                            id="dots"
                            name="dots"
                            type="checkbox"
                          />
                          <label htmlFor="dots">
                            <span className="box">
                              <FaCheck className="check-icon" />
                            </span>
                          </label>
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          className="inputbox"
                          id="slidesToShow"
                          type="number"
                          value={slider_setting.slidesToShow}
                          name="slidesToShow"
                          onChange={handleSliderSettings('slidesToShow')}
                        // error={errors.slidesToShow}
                        />
                      </td>

                      <td className="border px-2 py-1">
                        {' '}
                        <input
                          className="inputbox"
                          id="slidesToScroll"
                          type="number"
                          value={slider_setting.slidesToScroll}
                          name="slidesToScroll"
                          onChange={handleSliderSettings('slidesToScroll')}
                        // error={errors.slidesToScroll}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        {' '}
                        <input
                          className="inputbox"
                          id="slidesPerRow"
                          type="number"
                          value={slider_setting.slidesPerRow}
                          name="slidesPerRow"
                          onChange={handleSliderSettings('slidesPerRow')}
                        // error={errors.slidesPerRow}
                        />
                      </td>
                      <td className="align-middle text-center border px-2 py-1">
                        {' '}
                        {/* <Checkbox
                      color="primary"
                      checked={slider_setting.autoplay || false}
                      name="autoplay"
                      onChange={handleSliderSettingsCheckbox('autoplay', null)}
                      style={{ padding: '6px' }}
                    /> */}
                        <div className="checkbox" style={{ marginRight: '0px' }}>
                          <input
                            onChange={handleSliderSettingsCheckbox('autoplay')}
                            checked={slider_setting.autoplay || false}
                            id="autoplay"
                            name="autoplay"
                            style={{ padding: '6px' }}
                            type="checkbox"
                          />
                          <label htmlFor="autoplay">
                            <span className="box">
                              <FaCheck className="check-icon" />
                            </span>
                          </label>
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        {' '}
                        <input
                          className="inputbox"
                          id="autoplaySpeed"
                          type="number"
                          value={slider_setting.autoplaySpeed}
                          name="autoplaySpeed"
                          onChange={handleSliderSettings('autoplaySpeed')}
                        // error={errors.autoplaySpeed}
                        />
                      </td>
                      <td className="align-middle text-center border px-2 py-1">
                        {/* <Checkbox
                      color="primary"
                      checked={slider_setting.centerMode || false}
                      name="centerMode"
                      onChange={handleSliderSettingsCheckbox('centerMode', null)}
                      style={{ padding: '6px' }}
                    /> */}
                        <div className="checkbox" style={{ marginRight: '0px' }}>
                          <input
                            onChange={handleSliderSettingsCheckbox(
                              'centerMode'
                            )}
                            checked={slider_setting.centerMode || false}
                            id="centerMode"
                            name="centerMode"
                            style={{ padding: '6px' }}
                            type="checkbox"
                          />
                          <label htmlFor="centerMode">
                            <span className="box">
                              <FaCheck className="check-icon" />
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <div className="w-full flex flex-warp">
                        <label className="font-bold text-gray-700 inline-flex items-center">
                          Responsive Settings
                        </label>
                        <textarea
                          placeholder="{responsive: [
                          {
                            breakpoint: 1024,
                            settings: {
                              slidesToShow: 3,
                              slidesToScroll: 3,
                              infinite: true,
                              dots: true
                            }
                          }]}"
                          className="inputbox"
                          value={
                            slider_setting.extra_setting || ''
                          }
                          onChange={handleSliderSettings(
                            'extra_setting'
                          )}
                        // error={errors.extra_setting}
                        />
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-waft">
                <div onClick={sliderSettingRequest} className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"
                >
                  <FaCheck />
                  <span className="pl-2"> Submit</span>
                </div>
              </button>
            </>
          }
        />
        <div className="bg-white p-2 border border-b-0">
          <div className="flex justify-end">
            <div className="waftformgroup flex relative mr-2">
              <input
                type="text"
                name="find_testimonial"
                id="contents-name"
                placeholder="Search Testimonials by name"
                className="m-auto inputbox"
                value={query.find_testimonial}
                onChange={handleQueryChange}
                style={{ minWidth: '300px', paddingRight: '50px' }}
                onKeyPress={handleKeyPress}
              />
              <span
                className="bg-primary inline-flex absolute right-0 top-0 h-full px-2 items-center cursor-pointer text-white hover:bg-secondary"
                onClick={handleSearch}
              >
                <FaSearch />
              </span>
            </div>

          </div>
          <button
            type="button"
            className="underline cursor-pointer hover:text-primary"
            onClick={
              openPopUp
            }
          >
            Testimonial Setting{' '}
          </button>
        </div>
        {accessList.includes('view') && (
          <Table
            tableHead={[
              'Name',
              'Designation',
              'Company',
              'Description',
              'Date',
              '',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={handlePagination}
            emptyDataMsg="No Testimonial Found"
            loading={loading}
            isSN
            ispublic
          />
        )}
      </PageContent>
    </>
  );
};

Testimonial.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,

    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totalData: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  access: makeSelectAccess(),
  errors: makeSelectErrors(),
  slider_setting: makeSelectSliderSetting(),
  showPopUp: makeSelectshowPopUp()
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'testimonial', reducer });
const withSaga = injectSaga({ key: 'testimonial', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Testimonial);
