import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Collapse from '@material-ui/core/Collapse';
import * as mapDispatchToProps from '../actions';
import { makeSelectCategory, makeSelectLoading } from '../selectors';
import { FaFolder , FaMinus, FaPlus, FaFile} from 'react-icons/fa';

const SidebarCategoriesList = props => {
  const {
    category,
    loadOneCategoryRequest,
    loadMenuRequest,
    loading,
    setChildValue,
    setInnerStateValue,
    clearGeneralInfo,
    clearSubMenu,
  } = props;
  const [openSet, setOpenSet] = useState({});

  const handleSetClick = key => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
  };

  const handleClick = id => {
    clearSubMenu();
    loadMenuRequest(id);
  };

  const handleCollapse = () => {
    setOpenSet({});
  };

  const handleChange = (name, value) => {
    clearGeneralInfo();
    setInnerStateValue({ state: 'generalInfo', key: name, value });
  };

  const categoryFunction = (e, parentId = '') => (
    <ul key={`show-category-${e._id}-${parentId}`}>
      {e.child_menu && e.child_menu.length ? (
        <>
          <li
            key={`${e._id}-${parentId}`}
            className="py-2 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"
            onClick={() => handleSetClick(e._id)}
          >
            {openSet[e._id] ? (
              <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                <FaMinus className="mr-1 text-white"/>
                <FaFolder className="text-yellow-500 text-base"/>
              </div>
            ) : (
              <div className="flex items-center text-grey-darker text-gray-300 hover:text-white cursor-pointer">
                {e.child_menu[0]._id !== '' ? (
                  <FaPlus className="mr-1 text-white"/>
                ) : (
                  <FaMinus className="mr-1 text-white"/>
                )}
                <FaFolder className="text-yellow-500 text-base"/>
              </div>
            )}
            <div className="flex items-center cursor-pointer">
              <span
                onClick={() => handleClick(e._id)}
                className="dropdown-title capitalize ml-2 cursor-pointer text-gray-300 hover:text-white"
              >
                {e.title}
              </span>
            </div>
          </li>

          <Collapse in={openSet[e._id]} timeout="auto" unmountOnExit>
            <div className="list-reset pl-8 text-gray-300 hover:text-white">
              {e.child_menu.map(el => (
                <div key={el._id}>{categoryFunction(el, e._id)}</div>
              ))}
            </div>
          </Collapse>
        </>
      ) : (
        <>
          {e._id !== '' && (
            <div
              onClick={() => handleClick(e._id)}
              className="pt-1 pb-1 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-300 text-sm hover:text-white"
            >
              <FaFile className="mr-2 text-base text-white" />
              {`${e.title}`}
            </div>
          )}
        </>
      )}
    </ul>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => clearSubMenu()}
        className="btn w-full margin-none text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
      >
        Add New
      </button>
      {category.length <= 0 ? (
        <h1 />
      ) : (
        category.map(e => <div className="rounded my-2 bg-gray-600" key={e._id}>{categoryFunction(e)}</div>)
      )}
    </div>
  );
};

SidebarCategoriesList.propTypes = {
  category: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SidebarCategoriesList);
