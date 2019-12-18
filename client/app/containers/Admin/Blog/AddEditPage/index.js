import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { Checkbox, IconButton } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import BackIcon from '@material-ui/icons/ArrowBack';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectUsers,
  makeSelectCategory,
  makeSelectChip,
  makeSelectTag,
  makeSelectMetaTag,
  makeSelectMetaKeyword,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';

import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import { IMAGE_BASE, DATE_FORMAT } from '../../../App/constants';
import defaultImage from '../../../../assets/img/logo.svg';
import Loading from '../../../../components/Loading';
import WECkEditior from '../../../../components/CkEditor';
import Inputs from '../../../../components/customComponents/Input';
import Select from '../../../../components/Select';

const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },

  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
});

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    loadUsersRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    category: PropTypes.array,
    tempTag: PropTypes.string,
    push: PropTypes.func.isRequired,
  };

  state = {
    tempImage: defaultImage,
    startDate: new Date(),
    selected: [],
  };

  componentDidMount() {
    this.props.clearOne();
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
    this.props.loadUsersRequest();
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const { one } = nextProps;
      if (one.image && one.image.fieldname) {
        const tempImage =
          one.image && one.image.path && `${IMAGE_BASE}${one.image.path}`;
        this.setState({ ...one, tempImage });
      }
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

  slugify = text => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const slug = this.slugify(event.target.value);
      this.props.setOneValue({ key: 'slug_url', value: slug });
    }
  };

  handleDropDownChange = name => e => {
    e.persist();
    this.props.setOneValue({ key: name, value: e.target.value });
  };

  // handleMultipleSelectChange = e => {
  //   e.persist();
  //   this.props.setCategoryValue(e.target.value);
  // };

  handleMultipleSelectCategoryChange = e => {
    this.props.setCategoryValue({value: e && e.map(each=> each.value)});
  };

  handleTempMetaKeyword = e => {
    e.persist();
    this.props.setMetaKeywordValue(e.target.value);
  };

  handleTempMetaTag = e => {
    e.persist();
    this.props.setMetaTagValue(e.target.value);
  };

  handleTempTag = e => {
    e.persist();
    this.props.setTagValue(e.target.value);
  };

  onDrop = (files, name) => {
    const file = files[0];
    this.props.setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.setState({ tempImage: reader.result });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  // handlePublishedOn = event => {
  //   event.persist();
  //   const published_on = moment(event.target.value);
  //   this.props.setOneValue({
  //     key: 'published_on',
  //     value: published_on.format(DATE_FORMAT),
  //   });
  // };

  handlePublishedOn = date => {
    this.setState({ startDate: date });
    this.props.setOneValue({
      key: 'published_on',
      value: moment(date).format('YYYY-MM-DD'),
    });
  };

  handleGoBack = () => {
    this.props.push('/admin/blog-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleMetaKeywordDelete = index => () => {
    const chipData = [...this.props.one.keywords];

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'keywords', value: chipData });
  };

  handleMetaTagDelete = index => () => {
    const chipData = [...this.props.one.meta_tag];

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'meta_tag', value: chipData });
  };

  handleDelete = index => () => {
    const chipData = [...this.props.one.tags];
    // const tags = [...chipData.slice(0, index), ...chipData.slice(index + 1)];
    chipData.splice(index, 1);
    this.props.setOneValue({
      key: 'tags',
      value: chipData,
    });
  };

  insertTags = event => {
    event.preventDefault();
    if (this.props.one.tags.indexOf(this.props.tempTag) === -1) {
      this.props.setOneValue({
        key: 'tags',
        value: [...this.props.one.tags, this.props.tempTag],
      });
      this.props.setTagValue('');
    }
    return { tempTag: this.props.setTagValue('') };
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

  insertMetaKeywords = event => {
    event.preventDefault();
    if (this.props.one.keywords.indexOf(this.props.tempMetaKeyword) === -1) {
      this.props.setOneValue({
        key: 'keywords',
        value: [...this.props.one.keywords, this.props.tempMetaKeyword],
      });
      this.props.setMetaKeywordValue('');
    }
    return { tempMetaKeyword: this.props.setMetaKeywordValue('') };
  };

  handleSelectedValue = (ids, cats) => {
    const selected = ids.map(
      each => Object.keys(cats).length && cats[each].title,
    );
    return selected.join(', ');
  };

  render() {
    const {
      classes,
      one,
      category,
      users,
      tempTag,
      tempMetaTag,
      tempMetaKeyword,
      match,
      loading,
      errors,
    } = this.props;
    const { tempImage } = this.state;
  
    let listCategoryNormalized = {};
    const listCategory = category.map(each => {
      const obj = {
        label: each.title,
        value: each._id,
      };
      listCategoryNormalized = {
        ...listCategoryNormalized,
        [each._id]: obj,
      };
      return obj;
    });

    const menuProps = {
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
        },
      },
    };
    let cats = {};
    category.map(e => {
      cats[e._id] = e;
      return null;
    });
    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Blog'
              : 'Add Blog'}
          </title>
        </Helmet>
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
              ? 'Edit Blog'
              : 'Add Blog'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <Inputs
              label="Title"
              inputclassName="inputbox"
              inputid="blog-title"
              inputType="text"
              value={(one && one.title) || ''}
              name="Blog Title"
              onChange={this.handleChange('title')}
              error={errors && errors.title}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <Inputs
              label="Slug"
              inputclassName="inputbox"
              inputid="blog-slug-url"
              inputType="text"
              value={(one && one.slug_url) || ''}
              name="Blog Slug"
              onChange={this.handleChange('slug_url')}
              error={errors && errors.slug_url}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label className="font-bold text-gray-700">Category</label>

            {/* <FormControl className={classes.formControl}>
              <Select
                // className="inputbox"
                multiple
                displayEmpty
                name="template_key"
                value={one.category || []}
                input={<Input />}
                onChange={this.handleMultipleSelectChange}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em>Select Categories</em>;
                  } else {
                    return selected.join(', ');
                  }
                }}
                MenuProps={menuProps}
              >
                <MenuItem value="" name="none" disabled>
                  None
                </MenuItem>
                {category.map(each => (
                  <MenuItem key={each._id} value={each._id} name={each.title}>
                    {each.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            {/* <FormControl className={classes.formControl}> */}
            <Select
              className="React_Select"
              id="category"
              value={
                one.category && one.category.map((each, index)=> {
                  const catObj = listCategoryNormalized[each];
                  if (!catObj) {
                    return {
                      label: 'loading',
                      value: index,
                    }
                  }
                  return catObj;
                }) || []
              }
              name="category"
              placeholder="Select Blog Category"
              onChange={this.handleMultipleSelectCategoryChange}
              isSearchable
              isMulti
              options={listCategory}
              styles={customStyles}
            />
              {/* <Select
                multiple
                displayEmpty
                name="template_key"
                value={one.category || []}
                input={<Input />}
                onChange={this.handleMultipleSelectChange}
                renderValue={selected =>
                  this.handleSelectedValue(selected, cats)
                }
                MenuProps={menuProps}
              >
                <MenuItem value="" name="none" disabled>
                  None
                </MenuItem>
                {category.map(each => (
                  <MenuItem key={each._id} value={each._id} name={each.title}>
                    <Checkbox checked={one.category.indexOf(each._id) > -1} />
                    {each.title}
                  </MenuItem>
                ))}
              </Select> */}
            {/* </FormControl> */}
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="font-bold text-gray-700"
              htmlFor="grid-blog-title"
            >
              Short Description
            </label>
            <textarea
              className="inputbox"
              id="short_description"
              type="text"
              value={one.short_description || ''}
              name="short_description"
              onChange={this.handleChange('short_description')}
            />
          </div>
          <div>
            <label className="font-bold text-gray-700">Blog Description</label>
            <WECkEditior
              description={one.description}
              setOneValue={this.props.setOneValue}
            />

            <div id="component-error-text">{errors && errors.description}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4 mt-4">
            <label className="label" htmlFor="Image">
              Image
            </label>
            <Dropzone onDrop={files => this.onDrop(files, 'image')}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <img
                    className="inputbox cursor-pointer"
                    src={tempImage}
                    alt="Blogimage"
                    style={{ height: '120px', width: '60%' }}
                  />
                </div>
              )}
            </Dropzone>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Published On
            </label>
            <DatePicker
              className="inputbox"
              selected={this.state.startDate}
              onChange={this.handlePublishedOn}
            />
            {/* <input
              className="inputbox"
              id="blog-title"
              type="date"
              value={
                (one.published_on &&
                  moment(one.published_on).format("YYYY-MM-DD")) ||
                moment(Date.now()).format("YYYY-MM-DD")
              }
              name="published_on"
              onChange={this.handlePublishedOn}
            /> */}
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Tags
            </label>
            <form onSubmit={this.insertTags}>
              <input
                className="inputbox"
                id="blog-tags"
                type="text"
                value={tempTag || ''}
                name="Tags"
                onChange={this.handleTempTag}
              />
            </form>
            <Paper>
              {one.tags.map((tag, index) => {
                const icon = null;
                return (
                  <Chip
                    key={`${tag}-${index}`}
                    icon={icon}
                    label={tag}
                    onDelete={this.handleDelete(index)}
                    className={classes.chip}
                  />
                );
              })}
            </Paper>
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
              {one.meta_tag.map((tag, index) => {
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
          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Meta Keywords
            </label>

            <form onSubmit={this.insertMetaKeywords}>
              <input
                className="inputbox"
                id="blog-meta-keyword"
                type="text"
                value={tempMetaKeyword || ''}
                name="Tags"
                onChange={this.handleTempMetaKeyword}
              />
            </form>
            <Paper>
              {one.keywords.map((tag, index) => {
                const icon = null;

                return (
                  <Chip
                    key={`metakeywords-${tag}-${index}`}
                    icon={icon}
                    label={tag}
                    onDelete={this.handleMetaKeywordDelete(index)}
                    className={classes.chip}
                  />
                );
              })}
            </Paper>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Meta Description
            </label>

            <textarea
              className="inputbox"
              id="blog-tags"
              type="text"
              value={one.meta_description || ''}
              name="meta-description"
              onChange={this.handleChange('meta_description')}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="label" htmlFor="grid-last-name">
              Author
            </label>

            <select
              className="inputbox"
              native="true"
              value={(one && one.author) || ''}
              onChange={this.handleDropDownChange('author')}
            >
              <option value="" disabled>
                None
              </option>
              {users &&
                users.map(each => (
                  <option key={each._id} name={each.name} value={each._id}>
                    {each.name}
                  </option>
                ))}
            </select>
          </div>
          <div id="component-error-text">{errors && errors.author}</div>

          {/* <InputLabel style={{ color: '#AAAAAA' }}>Activity Type</InputLabel> */}
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
                checked={one.is_published || false}
                tabIndex={-1}
                onClick={this.handleCheckedChange('is_published')}
                color="primary"
              />
            }
            label="Is Published"
          />

          <br />
          <button
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
            onClick={this.handleSave}
          >
            Save
          </button>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePage', saga });

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused || state.isSelected ? '#5897FB' : 'white',
    color: state.isFocused || state.isSelected ? 'white' : 'black',
    padding: '6px 12px',
  }),

  menuList: () => ({
    background: '#FFFFFF',
    border: '1px solid #d4d9df',
    boxShadow:'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  }),

  indicatorSeparator: () => ({
    background: 'transparent',
  }),

  container: provided => ({
    ...provided,
    width: '100%',
    minWidth: '100px',
  }),
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
  chip: makeSelectChip(),
  tempTag: makeSelectTag(),
  tempMetaTag: makeSelectMetaTag(),
  tempMetaKeyword: makeSelectMetaKeyword(),
  loading: makeSelectLoading(),
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
