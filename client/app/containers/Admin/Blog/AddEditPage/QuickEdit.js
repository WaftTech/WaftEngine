import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCheck } from 'react-icons/fa';
import Select from '../../../../components/Select';

const customStyles = {
  chip: () => {},
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
    handleCheckedChange,
    handleChange,
    handleDropDownChange,
    handleMultipleSelectCategoryChange,
    handlePublishedOn,
    handleMultipleSelectAuthorChange,
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
  const cats = {};
  category.map(e => {
    cats[e._id] = e;
    return null;
  });

  let listAuthorNormalized = {};
  const listAuthor = users.map(each => {
    const obj = {
      label: each.name,
      value: each._id,
    };
    listAuthorNormalized = {
      ...listAuthorNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  return (
    <>
      <div>
        <div className="w-full pb-4">
          <label>Title</label>
          <input
            className="inputbox"
            id="blog-title"
            type="text"
            value={(one && one.title) || ''}
            name="Blog Title"
            onChange={handleChange('title')}
          />
          <div className="error">{errors && errors.title}</div>
        </div>

        <div className="w-full  pb-4">
          <label htmlFor="category" className="text-sm">
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

        <div className="w-full md:w-1/2 pb-4">
          <label htmlFor="blog_author">Author</label>
          <Select
            className="React_Select"
            id="category"
            value={
              (one.author &&
                one.author.map((each, index) => {
                  const authorObj = listAuthorNormalized[each];
                  if (!authorObj) {
                    return {
                      label: null,
                      value: index,
                    };
                  }
                  return authorObj;
                })) ||
              []
            }
            name="author"
            placeholder="Select Blog Author"
            onChange={handleMultipleSelectAuthorChange}
            isSearchable
            isMulti
            options={listAuthor}
            styles={customStyles}
          />
        </div>
        {errors && errors.author && errors.author.trim() !== '' && (
          <div className="error">{errors && errors.author}</div>
        )}
        <div className="checkbox">
          <input
            checked={one.is_active || false}
            onClick={handleCheckedChange('is_active')}
            id="is_active"
            type="checkbox"
            onChange={null}
          />
          <label htmlFor="is_active">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Is Active
          </label>
        </div>
        <div className="checkbox">
          <input
            checked={one.is_published || false}
            onClick={handleCheckedChange('is_published')}
            id="is_published"
            type="checkbox"
          />
          <label htmlFor="is_published">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Is Published
          </label>
        </div>
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
