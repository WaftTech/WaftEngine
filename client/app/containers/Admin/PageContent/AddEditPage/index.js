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
  makeSelectMetaTag,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import { DATE_FORMAT } from '../../../App/constants';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import Loading from '../../../../components/Loading';
import { makeSelectToken } from '../../../App/selectors';
import WECkEditior from '../../../../components/CkEditor';
import Input from '../../../../components/customComponents/Input';

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
      value: moment(date).format(DATE_FORMAT),
    });
  };

  handleGoBack = () => {
    this.props.push('/admin/page-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleTempMetaTag = e => {
    e.persist();
    this.props.setMetaTagValue(e.target.value);
  };

  insertMetaTags = event => {
    event.preventDefault();
    if (this.props.one.meta_tag.indexOf(this.props.tempMetaTag) === -1) {
      this.props.setOneValue({
        key: 'meta_tag',
        value: [...this.props.one.meta_tag, this.props.tempMetaTag],
      });
      this.props.setMetaTagValue('');
    }
    return { tempMetaTag: this.props.setMetaTagValue('') };
  };

  handleMetaTagDelete = index => () => {
    const chipData = [...this.props.one.meta_tag];

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'meta_tag', value: chipData });
  };

  render() {
    const { one, classes, match, loading, errors, tempMetaTag } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <>
        <Helmet>
          <title>
            {' '}
            {match && match.params && match.params.id
              ? 'Edit Static Page'
              : 'Add Static Page'}
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
                ? 'Edit Static Page'
                : 'Add Static Page'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Page Title"
                inputclassName="inputbox"
                inputid="grid-last-name"
                inputType="text"
                value={one.name}
                onChange={this.handleChange('name')}
                error={errors.name}
              />
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Page Key"
                inputclassName="inputbox"
                inputid="grid-last-name"
                inputType="text"
                value={one.key}
                onChange={this.handleChange('key')}
                error={errors.key}
              />
            </div>
            <div>
              <WECkEditior
                description={one.description}
                setOneValue={this.props.setOneValue}
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
              <Input
                label="Meta Title"
                inputclassName="inputbox"
                inputid="grid-last-meta_title"
                inputType="text"
                value={one.meta_title}
                onChange={this.handleChange('meta_title')}
                error={errors.meta_title}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Meta Description"
                inputclassName="inputbox"
                inputid="grid-last-meta_description"
                inputType="text"
                value={one.meta_description}
                onChange={this.handleChange('meta_description')}
                error={errors.meta_description}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="label" htmlFor="grid-last-name">
                Meta Tags
              </label>
              <form onSubmit={this.insertMetaTags}>
                <input
                  className="inputbox"
                  id="blog-meta-tags"
                  type="text"
                  value={tempMetaTag || ''}
                  name="Tags"
                  onChange={this.handleTempMetaTag}
                />
              </form>
              <Paper>
                {one.meta_tag &&
                  one.meta_tag.map((tag, index) => {
                    const icon = null;

                    return (
                      <Chip
                        key={`meta-${tag}-${index}`}
                        icon={icon}
                        label={tag}
                        onDelete={this.handleMetaTagDelete(index)}
                        className={classes.chip}
                      />
                    );
                  })}
              </Paper>
            </div>

            <div className="flex w-full justify-between md:w-1/2 px-2">
              <div className="w-full md:w-1/2 -ml-2">
                <div margin="normal" className={classes.formControl}>
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
                    onChange={this.handleDateChange('publish_from')}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 -mr-2">
                <div margin="normal" className={classes.formControl}>
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
                    onChange={this.handleDateChange('publish_to')}
                  />
                </div>
              </div>
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
                  checked={one.is_page || false}
                  onClick={this.handleCheckedChange('is_page')}
                  value="is_page"
                  color="primary"
                />
              }
              label="Is Page"
            />

            <br />
            <button
              className="block btn bg-primary hover:bg-secondary"
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
const withReducer = injectReducer({ key: 'PagecontentListing', reducer });
const withSaga = injectSaga({ key: 'PagecontentListing', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
  tempMetaTag: makeSelectMetaTag(),
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
