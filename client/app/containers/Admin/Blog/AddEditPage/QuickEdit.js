import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// @material-ui/core components
import { Checkbox } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

// import { IMAGE_BASE, DATE_FORMAT } from '../../../App/constants';
import Inputs from '../../../../components/customComponents/Input';
import Select from '../../../../components/Select';

const customStyles = {
  chip: () => { },
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused || state.isSelected ? '#5897FB' : 'white',
    color: state.isFocused || state.isSelected ? 'white' : 'black',
    padding: '6px 12px',
  }),

  menuList: () => ({
    background: '#FFFFFF',
    border: '1px solid #d4d9df',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
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

const QuickEdit = props => {
  const {
    handleEditorChange,
    handleCheckedChange,
    handleChange,
    slugify,
    handleDropDownChange,
    handleMultipleSelectCategoryChange,
    handleTempMetaKeyword,
    handleTempMetaTag,
    handleTempTag,
    handlePublishedOn,
    handleSave,
    handleMetaKeywordDelete,
    handleMetaTagDelete,
    handleDelete,
    insertTags,
    insertMetaTags,
    insertMetaKeywords,
  } = props;
  const {
    one,
    category,
    users,
    tempTag,
    tempMetaTag,
    tempMetaKeyword,
    errors,
  } = props;

  const [startDate, setStartDate] = useState(new Date());

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
  const cats = {};
  category.map(e => {
    cats[e._id] = e;
    return null;
  });

  return (
    <>
      <div>
        <h2 className="text-2xl mb-4">Quick Edit</h2>
        <div className="w-full  pb-4">
          <Inputs
            label="Title"
            inputclassName="inputbox"
            inputid="blog-title"
            inputType="text"
            value={(one && one.title) || ''}
            name="Blog Title"
            onChange={handleChange('title')}
            error={errors && errors.title}
          />
        </div>
        {/* <div className="w-full  pb-4">
          <Inputs
            label="Slug"
            inputclassName="inputbox"
            inputid="blog-slug-url"
            inputType="text"
            value={(one && one.slug_url) || ''}
            name="Blog Slug"
            onChange={handleChange('slug_url')}
            error={errors && errors.slug_url}
          />
        </div> */}
        <div className="w-full  pb-4">
          <label htmlFor="category" className="font-bold text-gray-700">
            Category
          </label>
          <Select
            className="React_Select"
            id="category"
            value={
              (one.category &&
                one.category.map((each, index) => {
                  const catObj = listCategoryNormalized[each];
                  if (!catObj) {
                    return {
                      label: 'loading',
                      value: index,
                    };
                  }
                  return catObj;
                })) ||
              []
            }
            name="category"
            placeholder="Select Blog Category"
            onChange={handleMultipleSelectCategoryChange}
            isSearchable
            isMulti
            options={listCategory}
            styles={customStyles}
          />
        </div>
        {/* <div className="w-full  pb-4">
          <label className="font-bold text-gray-700" htmlFor="grid-blog-title">
            Short Description
          </label>
          <textarea
            className="inputbox"
            id="short_description"
            type="text"
            value={one.short_description || ''}
            name="short_description"
            onChange={handleChange('short_description')}
          />
        </div> */}
        <div className="w-full  pb-4">
          <label className="label" htmlFor="grid-last-name">
            Published On
          </label>
          <DatePicker
            dateFormat="Pp"
            showTimeSelect
            className="inputbox"
            selected={
              one.published_on !== '' && one.published_on !== null
                ? new Date(one.published_on)
                : ''
            }
            onChange={handlePublishedOn}
          />
        </div>
        {/* <div className="w-full  pb-4">
          <label className="label" htmlFor="grid-last-name">
            Tags
          </label>
          <form onSubmit={insertTags}>
            <input
              className="inputbox"
              id="blog-tags"
              type="text"
              value={tempTag || ''}
              name="Tags"
              onChange={handleTempTag}
            />
          </form>
          <Paper elevation={2} >
            {one.tags.map((tag, index) => {
              const icon = null;
              return (
                <Chip
                  key={`${tag}-${index}`}
                  icon={icon}
                  label={tag}
                  onDelete={handleDelete(index)}
                  className={customStyles.chip}
                />
              );
            })}
          </Paper>
        </div>

        <div className="w-full  pb-4">
          <label className="label" htmlFor="grid-last-name">
            Meta Tags
          </label>
          <form onSubmit={insertMetaTags}>
            <input
              className="inputbox"
              id="blog-meta-tags"
              type="text"
              value={tempMetaTag || ''}
              name="Tags"
              onChange={handleTempMetaTag}
            />
          </form>
          <Paper elevation={2} >
            {one.meta_tag.map((tag, index) => {
              const icon = null;

              return (
                <Chip
                  key={`meta-${tag}-${index}`}
                  icon={icon}
                  label={tag}
                  onDelete={handleMetaTagDelete(index)}
                  className={customStyles.chip}
                />
              );
            })}
          </Paper>
        </div>
        <div className="w-full  pb-4">
          <label className="label" htmlFor="grid-last-name">
            Meta Keywords
          </label>

          <form onSubmit={insertMetaKeywords}>
            <input
              className="inputbox"
              id="blog-meta-keyword"
              type="text"
              value={tempMetaKeyword || ''}
              name="Tags"
              onChange={handleTempMetaKeyword}
            />
          </form>
          <Paper elevation={2} >
            {one.keywords.map((tag, index) => {
              const icon = null;
              return (
                <Chip
                  key={`metakeywords-${tag}-${index}`}
                  icon={icon}
                  label={tag}
                  onDelete={handleMetaKeywordDelete(index)}
                  className={customStyles.chip}
                />
              );
            })}
          </Paper>
        </div>

        <div className="w-full  pb-4">
          <label className="label" htmlFor="grid-last-name">
            Meta Description
          </label>
          <textarea
            className="inputbox"
            id="blog-tags"
            type="text"
            value={one.meta_description || ''}
            name="meta-description"
            onChange={handleChange('meta_description')}
          />
        </div> */}

        <div className="w-full  pb-4">
          <label className="label" htmlFor="grid-last-name">
            Author
          </label>
          <select
            className="inputbox"
            native="true"
            value={(one && one.author) || ''}
            onChange={handleDropDownChange('author')}
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
              checked={one.is_published || false}
              tabIndex={-1}
              onClick={handleCheckedChange('is_published')}
              color="primary"
            />
          }
          label="Is Published"
        />
      </div>
    </>
  );
};

QuickEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  one: PropTypes.object.isRequired,
  category: PropTypes.array,
  tempTag: PropTypes.string,
};

export default QuickEdit;
