import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
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
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import Loading from '../../../../components/Loading';
import { makeSelectToken } from '../../../App/selectors';

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

class AddEdit extends React.PureComponent {
  static propTypes = {
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

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setOneValue({ key: name, value: newContent });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleDateChange = name => date => {
    this.props.setOneValue({
      key: name,
      value: moment(date).format('YYYY/MM/DD'),
    });
  };

  handleGoBack = () => {
    this.props.push('/admin/content-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { one, classes, match, loading, errors } = this.props;
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
                onClick={this.handleGoBack}
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
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                htmlFor="grid-last-name"
              >
                Content Title
              </label>
              <input
                className="inputbox"
                id="grid-last-name"
                type="text"
                value={one.name}
                onChange={this.handleChange('name')}
              />
              <div id="component-error-text">{errors.name}</div>
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                htmlFor="grid-last-name"
              >
                Content Key
              </label>
              <input
                className="inputbox"
                id="grid-last-name"
                type="text"
                value={one.key}
                onChange={this.handleChange('key')}
              />
              <div id="component-error-text">{errors.key}</div>
            </div>
            <div className="pb-4">
              <CKEditor
                name="description"
                content={one.description}
                // scriptUrl="https://cdn.ckeditor.com/4.6.2/full/ckeditor.js"
                config={{
                  allowedContent: true,
                  filebrowserBrowseUrl: '/editor-file-select',
                  filebrowserUploadUrl: '/api/media/multiple',
                }}
                events={{
                  change: e => this.handleEditorChange(e, 'description'),
                  value: one.description,
                }}
              />
              <div id="component-error-text">{errors.description}</div>
            </div>

            <div className="w-full md:w-1/2">
              <FormControl margin="normal" className={classes.formControl}>
                <label
                  className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                  htmlFor="grid-last-name"
                >
                  Published From
                </label>
                <DatePicker
                  margin="normal"
                  name="publish_from"
                  className={[classes.textField, 'inputbox']}
                  value={
                    (one.publish_from &&
                      moment(one.publish_from).format('YYYY/MM/DD')) ||
                    ''
                  }
                  onChange={this.handleDateChange('publish_from')}
                />
              </FormControl>
            </div>
            <div className="w-full md:w-1/2">
              <FormControl margin="normal" className={classes.formControl}>
                <label
                  className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                  htmlFor="grid-last-name"
                >
                  Published To
                </label>
                <DatePicker
                  margin="normal"
                  name="publish_to"
                  className={[classes.textField, 'inputbox']}
                  value={
                    (one.publish_to &&
                      moment(one.publish_to).format('YYYY/MM/DD')) ||
                    ''
                  }
                  onChange={this.handleDateChange('publish_to')}
                />
              </FormControl>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={one.is_active || false}
                  tabIndex={-1}
                  onClick={this.handleCheckedChange('is_active')}
                  color="primary"
                />
              }
              label="Is Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={one.is_feature || false}
                  onClick={this.handleCheckedChange('is_feature')}
                  value="is_feature"
                  color="primary"
                />
              }
              label="Is Feature"
            />

            <br />
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
              onClick={this.handleSave}
            >
              Save
            </button>
          </PageContent>
        </div>
      </>
    );
  }
}

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

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

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
