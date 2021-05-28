import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft, FaCheck, FaTimesCircle } from 'react-icons/fa';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import EditorFileSelect from '../../../EditorFileSelect';
import Dialog from '../../../../components/Dialog';
import { IMAGE_BASE } from '../../../App/constants';

const AddEdit = props => {
  const {
    clearErrors,
    clearOne,
    loadOneRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    addEditRequest,
    push,
    addFromMedia,
  } = props;

  const [openMedia, setOpenMedia] = useState(false);
  const maxDescriptionCount = 150
  useEffect(() => {
    clearErrors();
    clearOne();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);
  useEffect(() => {
    clearErrors();
    clearOne();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const handleChange = name => event => {
    event.persist();
    const value = event.target.value
    if (name === 'description') {
      var length = value.length
      if (length <= maxDescriptionCount) {
        setOneValue({ key: name, value: value });
      } else {
        //just in case: previously saved description is more than 150 charecter
        setOneValue({ key: name, value: value.slice(0, 150) })
      }
    } else
      setOneValue({ key: name, value: value });
  };

  const handleGoBack = () => {
    push('/admin/testimonial-manage');
  };

  const handleSave = () => {
    clearErrors();
    addEditRequest();
  };

  const handleDate = date => {
    // setStartDate(date);
    if (date === null) {
      date = '';
    }
    setOneValue({
      key: 'date',
      value: date,
    });
  };

  const handleClose = () => {
    setOpenMedia(false);
  };

  const handleSetImage = () => {
    setOpenMedia(true);
  };

  const handleImageChange = file => {
    addFromMedia(file);
    setOpenMedia(false);
  };

  const handleDelete = () => {
    setOneValue({ key: 'image', value: '' });
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <span className="backbtn" onClick={handleGoBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {match && match.params && match.params.id
              ? 'Edit Testimonial'
              : 'Add Testimonial'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="bg-white p-4 border">
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Name</label>

              <input
                label="Name"
                className="inputbox"
                id="grid-name"
                type="text"
                value={one.name}
                onChange={handleChange('name')}
              // error={errors.name}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Designation</label>

              <input
                label="Designation"
                className="inputbox"
                id="grid-designation"
                type="text"
                value={one.designation}
                onChange={handleChange('designation')}
              // error={errors.designation}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Company</label>

              <input
                label="Company"
                className="inputbox"
                id="grid-company"
                type="text"
                value={one.company}
                onChange={handleChange('company')}
              // error={errors.company}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="font-bold text-gray-700" htmlFor="grid-title">
                Date
              </label>
              <DatePicker
                className="inputbox"
                placeholderText="Click to select a date"
                selected={
                  one.date !== '' && one.date !== null ? new Date(one.date) : ''
                }
                onChange={handleDate}
                isClearable
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="font-bold text-gray-700" htmlFor="grid-image">
                Image
              </label>
              <div className="flex justify-between">
                <div className="w-full  pb-4">
                  {one && one.image && one.image.path ? (
                    <div>
                      <section>
                        <div className="relative p-2 flex border">
                          <img
                            src={`${IMAGE_BASE}${one.image.path}`}
                            className="m-auto h-24 object-contain"
                          />

                          <button
                            type="button"
                            className="absolute"
                            style={{ top: '-10px', right: '-20px' }}
                            onClick={handleDelete}
                          >
                            <FaTimesCircle className="text-lg text-red-400 hover:text-red-500" />
                          </button>
                        </div>
                      </section>
                    </div>
                  ) : (
                    <section onClick={handleSetImage} style={{ width: '100%' }}>
                      <button
                        type="button"
                        className="w-full text-black hover:border-primary hover:text-primary text-center self-start py-5 px-10 border border-gray-500 rounded-lg border-dashed cursor-pointer"
                      >
                        Upload Image from Media
                      </button>
                    </section>
                  )}

                  {errors && errors.image && (
                    <div id="component-error-text">{errors.image}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label
                className="font-bold text-gray-700"
                htmlFor="grid-last-name"
              >
                Description
              </label>
              <textarea
                className="inputbox border border-grey-darker"
                id="product-category-description"
                type="text"
                value={one.description || ''}
                name="description"
                onChange={handleChange('description')}
              />
              {errors.description && (
                <div id="component-error-text">{errors.description}</div>
              )}
              {
                `${one.description.length} / ${maxDescriptionCount}`
              }
            </div>

            <div>
              <button
                type="button"
                className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"

                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </PageContent>

        <Dialog
          className="w-5/6 h-full overflow-auto"
          open={openMedia}
          onClose={handleClose}
          title={`Select Media`}
          body={
            <div>
              <EditorFileSelect
                location={location}
                selectFile={file => handleImageChange(file)}
              />
              <div className="mt-2 text-xs">
                Note: Please Double Click to open folder and select images.
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),

  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({ key: 'testimonial', reducer });
const withSaga = injectSaga({ key: 'testimonial', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
