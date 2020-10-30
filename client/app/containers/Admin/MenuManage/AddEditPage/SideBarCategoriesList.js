import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import Collapse from '@material-ui/core/Collapse';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import * as mapDispatchToProps from '../actions';

import { makeSelectCategory, makeSelectLoading } from '../selectors';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

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
            className="abc pt-1 pb-1 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"
            onClick={() => handleSetClick(e._id)}
          >
            {openSet[e._id] ? (
              <div className="text-grey-darker hover:text-primary cursor-pointer">
                <IndeterminateCheckBoxOutlinedIcon />
                <FolderIcon />
              </div>
            ) : (
                <div className="text-grey-darker hover:text-primary cursor-pointer">
                  {e.child_menu[0]._id !== '' ? (
                    <AddBoxOutlinedIcon />
                  ) : (
                      <CheckBoxOutlineBlankOutlinedIcon />
                    )}
                  <FolderIcon />
                </div>
              )}
            <div className="flex items-center cursor-pointer">
              <span
                onClick={() => handleClick(e._id)}
                className="dropdown-title capitalize ml-2 cursor-pointer"
              >
                {e.title}
              </span>
            </div>
          </li>

          <Collapse in={openSet[e._id]} timeout="auto" unmountOnExit>
            <div className="list-reset pl-8">
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
                className="pt-1 pb-1 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"
              >
                <DescriptionIcon />
                {`${e.title}`}
              </div>
            )}
          </>
        )}
    </ul>
  );

  return (
    <div className="list-reset">
      <button
        type="button"
        onClick={() => clearSubMenu()}
        className="py-2 px-6 w-full rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
      >
        Add New
      </button>
      {category.length <= 0 ? (
        <h1 />
      ) : (
          category.map(e => <div key={e._id}>{categoryFunction(e)}</div>)
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
const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(SidebarCategoriesList);
