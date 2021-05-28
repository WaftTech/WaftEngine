import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import WECkEditior from '../../../../components/CkEditor';
import Dialog from '../../../../components/Dialog';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import EditorFileSelect from '../../../EditorFileSelect';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';

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

  // console.log('one', one);

  const [openMedia, setOpenMedia] = useState(false);

  useEffect(() => {
    clearErrors();
    clearOne();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/admin/social-media');
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

  const handleChecked = name => e => {
    setOneValue({ key: name, value: e.target.checked });
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {match && match.params && match.params.id
            ? 'Edit Social Media'
            : 'Add Social Media'}
        </title>
      </Helmet>
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <span className="backbtn" onClick={handleGoBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {match && match.params && match.params.id
              ? 'Edit Social Media'
              : 'Add Social Media'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="bg-white p-4 border">
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Title</label>
              <input
                label="Title"
                className="inputbox"
                id="grid-title"
                type="text"
                value={one.title}
                onChange={handleChange('title')}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Url</label>
              <input
                label="Url"
                className="inputbox"
                id="grid-url"
                type="text"
                value={one.url}
                onChange={handleChange('url')}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Description</label>
              <WECkEditior
                description={one.description}
                setOneValue={props.setOneValue}
                config={{
                  allowedContent: true,
                }}
              />
              {/* <CKEditor
                name="description"
                content={one.description}
                // scriptUrl="https://cdn.ckeditor.com/4.6.2/full/ckeditor.js"
                config={{
                  allowedContent: true,
                  // filebrowserBrowseUrl: '/editor-file-select',
                  // filebrowserUploadUrl: '/api/media/multiple',
                }}
                events={{
                  change: e => this.handleEditorChange(e, 'description'),
                  value: one.description,
                }}
              /> */}
              <div id="component-error-text">{errors.description}</div>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm font-bold text-gray-700 inline-flex items-center">Order</label>
              <input
                label="Order"
                className="inputbox"
                id="grid-order"
                type="text"
                value={one.order}
                onChange={handleChange('order')}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <div className="checkbox">
                <input
                  onChange={handleChecked('is_active')}
                  name="is_active"
                  tabIndex={-1}
                  checked={one.is_active || false}
                  id="is_active"
                  type="checkbox"
                />
                <label htmlFor="is_active">
                  <span className="box">
                    <FaCheck className="check-icon" />
                  </span>
                  Is Active
                </label>
              </div>
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
          open={openMedia}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={'lg'}
        >
          <PageHeader>Select Image</PageHeader>
          <PageContent>
            <EditorFileSelect
              location={location}
              selectFile={file => handleImageChange(file)}
            />
            <div className="mt-2 text-xs">
              Note: Please Double Click to open folder and select images.
            </div>
          </PageContent>
        </Dialog>
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

const withReducer = injectReducer({ key: 'socialMedia', reducer });
const withSaga = injectSaga({ key: 'socialMedia', saga });

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

// import React from 'react';

// function AddEdit() {
//   return <div>social media add edit page</div>;
// }

// export default AddEdit;
