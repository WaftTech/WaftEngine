import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// @material-ui/core components
import { Checkbox } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '../../../../components/Select';
import { FaCheck } from 'react-icons/fa';

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

  return (
    <>
      <div>
        <h2 className="text-2xl mb-4">Quick Edit</h2>
        <div className="w-full  pb-4">
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
        <div className="error">{errors && errors.author}</div>
        <div className="checkbox">
          <input
            checked={one.is_active || false}
            onClick={handleCheckedChange('is_active')}
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
