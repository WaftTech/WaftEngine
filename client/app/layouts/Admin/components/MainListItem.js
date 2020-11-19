import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Collapse from '@material-ui/core/Collapse';
import menus from './sidemenu';
import { FaAngleDown } from 'react-icons/fa';

import {
  makeSelectLocation,
  makeSelectAccess,
} from '../../../containers/App/selectors';

const styles = theme => ({});

const MainListItem = ({ location: { pathname }, access }) => {
  const [openSet, setOpenSet] = useState({});

  const handleSetClick = key => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
  };

  const hasAccess = link => Object.keys(access).includes(link);

  const menuFunction = e => {
    let showChildren = false;
    if (e.menu) {
      // TODO: can be optimized to break when if condition is fulfilled
      e.menu.map(each => {
        if (hasAccess(each.link)) {
          showChildren = true;
        }
      });
    }
    const isVisible = e.menu ? showChildren : hasAccess(e.link);
    if (!isVisible) return null;
    return (
      <div key={e.key}>
        {e.menu ? (
          <>
            <div
              key={e.key}
              className={`py-3 cursor-pointer flex items-center justify-between ease-in transition-opacity duration-100 opacity-75 hover:opacity-100 text-base pl-${e.key.split(
                '.',
              ).length * 4}`}
              onClick={() => handleSetClick(e.key)}
            >
              <div className="flex items-center">
                <span className="inline-block text-white">{e.icon}</span>
                <span className="dropdown-title text-white pl-4">{e.name}</span>
              </div>
              <FaAngleDown
                className={`text-sm text-white mr-4 transition-all duration-100 ease-in-out ${
                  !openSet[e.key] ? 'rotate-90' : ''
                }`}
              />
            </div>
            <Collapse in={openSet[e.key]} timeout="auto" unmountOnExit>
              {e.menu.map(el => (
                <div key={el.key}>{menuFunction(el)}</div>
              ))}
            </Collapse>
          </>
        ) : (
          <div
            selected={pathname === e.link}
            className={e.key.split('.').length === 1 ? '' : ''}
          >
            <Link
              to={`${e.link}`}
              className={`text-gray-200 text-base no-underline flex items-center ease-in transition-opacity duration-100 opacity-75 hover:opacity-100 py-3 pl-${e.key.split(
                '.',
              ).length * 4}`}
            >
              <span className="inline-block">{e.icon}</span>
              <span className="pl-4">{e.name}</span>
            </Link>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="select-none pt-16 mt-6">
      {menus.map(e => (
        <div key={e.key}>{menuFunction(e)}</div>
      ))}
    </div>
  );
};

MainListItem.propTypes = {
  location: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  access: makeSelectAccess(),
});

const withConnect = connect(mapStateToProps);
const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(MainListItem);
