import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// core components
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { IconButton } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import reducer from '../reducer';
import saga from '../saga';
import // makeSelectOne,
// makeSelectLoading,
// makeSelectErrors,
'../selectors';
import * as mapDispatchToProps from '../actions';
import { DATE_FORMAT } from '../../../App/constants';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import { makeSelectToken } from '../../../App/selectors';

import WECkEditior from '../../../../components/CkEditor';

const styles = {
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
};
const key = 'menuManage';

const AddEdit = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // componentDidMount() {
  //   props.clearErrors();
  //   if (props.match.params && props.match.params.id) {
  //     props.loadOneRequest(props.match.params.id);
  //   }
  // }

  // handleEditorChange = (e, name) => {
  //   const newContent = e.editor.getData();
  //   props.setOneValue({ key: name, value: newContent });
  // };

  // handleCheckedChange = name => event => {
  //   event.persist();
  //   props.setOneValue({ key: name, value: event.target.checked });
  // };

  // handleChange = name => event => {
  //   event.persist();
  //   props.setOneValue({ key: name, value: event.target.value });
  // };

  // handleDateChange = name => date => {
  //   props.setOneValue({
  //     key: name,
  //     value: moment(date).format(DATE_FORMAT),
  //   });
  // };

  // handleGoBack = () => {
  //   props.push('/admin/content-manage');
  // };

  // handleSave = () => {
  //   props.addEditRequest();
  // };

  const { one, classes, match, loading, errors } = props;
  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {' '}
          {match && match.params && match.params.id
            ? 'Edit Static Content'
            : 'Add Static Content'}
        </title>
      </Helmet>
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {match && match.params && match.params.id
              ? 'Edit Static Content'
              : 'Add Static Content'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Content Title
            </label>
            <input
              className="inputbox"
              id="grid-last-name"
              type="text"
              value={one.name}
              onChange={handleChange('name')}
            />
            <div id="component-error-text">{errors.name}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Content Key
            </label>
            <input
              className="inputbox"
              id="grid-last-name"
              type="text"
              value={one.key}
              onChange={handleChange('key')}
            />
            <div id="component-error-text">{errors.key}</div>
          </div>
          <div className="pb-4">
            <WECkEditior
              description={one.description}
              setOneValue={props.setOneValue}
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
                  change: e => handleEditorChange(e, 'description'),
                  value: one.description,
                }}
              /> */}
            <div id="component-error-text">{errors.description}</div>
          </div>

          <div className="w-full md:w-1/2">
            <FormControl margin="normal" className={classes.formControl}>
              <label className="label" htmlFor="grid-last-name">
                Published From
              </label>
              <DatePicker
                margin="normal"
                name="publish_from"
                className={[classes.textField, 'inputbox']}
                value={
                  (one.publish_from &&
                    moment(one.publish_from).format(DATE_FORMAT)) ||
                  ''
                }
                onChange={handleDateChange('publish_from')}
              />
            </FormControl>
          </div>
          <div className="w-full md:w-1/2">
            <FormControl margin="normal" className={classes.formControl}>
              <label className="label" htmlFor="grid-last-name">
                Published To
              </label>
              <DatePicker
                margin="normal"
                name="publish_to"
                className={[classes.textField, 'inputbox']}
                value={
                  (one.publish_to &&
                    moment(one.publish_to).format(DATE_FORMAT)) ||
                  ''
                }
                onChange={handleDateChange('publish_to')}
              />
            </FormControl>
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_active || false}
                tabIndex={-1}
                onClick={handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Is Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_feature || false}
                onClick={handleCheckedChange('is_feature')}
                value="is_feature"
                color="primary"
              />
            }
            label="Is Feature"
          />

          <br />
          <button
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
            onClick={handleSave}
          >
            Save
          </button>
        </PageContent>
      </div>
    </>
  );
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  // classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
};
export default compose(
  withRouter,
  withStyle,
  withConnect,
)(AddEdit);
