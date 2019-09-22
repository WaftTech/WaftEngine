import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import menus from './sidemenu';

import {
  makeSelectLocation,
  makeSelectAccess,
} from '../../../containers/App/selectors';

const styles = theme => ({
});

const MainlistItem = ({ location: { pathname }, access }) => {
  const [openSet, setOpenSet] = useState({});

  const handleSetClick = key => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
  };

  const hasAccess = link => Object.keys(access).includes(link);

  const menuFunctn = e => {
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
              className={`pt-2 pb-2 pr-4 pl-4 cursor-pointer flex items-center justify-between text-gray-800 hover:bg-gray-200 text-sm pl-${e.key.split(
                '.',
              ).length * 4}`}
              onClick={() => handleSetClick(e.key)}
            >
              <div className="flex items-center">
                <i key={e} className="material-icons mr-3 text-sm">
                  {e.icon}
                </i>
                <span className="dropdown-title">{e.name}</span>
              </div>
              {openSet[e.key] ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={openSet[e.key]} timeout="auto" unmountOnExit>
              {e.menu.map(el => (
                <div key={el.key}>{menuFunctn(el)}</div>
              ))}
            </Collapse>
          </>
        ) : (
            <div
              selected={pathname === e.link}
              className={
                e.key.split('.').length === 1
                  ? ''
                  : ''
              }
            >
              <Link
                to={`${e.link}`}
                className={`text-gray-800 text-sm no-underline flex items-center text-gray-800 hover:text-black hover:bg-gray-200 ${
                  e.key.split('.').length > 1 ? 'pt-2 pb-2 pl-8 pr-6' : 'pt-2 pr-4 pb-2 pl-4'
                  }`}
              >
                <i key={e} className="material-icons mr-3 text-sm">
                  {e.icon}
                </i>
                {e.name}
              </Link>
            </div>
          )}
      </div>
    );
  };
  return (
    <div className="select-none">
      {menus.map(e => (
        <div key={e.key}>{menuFunctn(e)}</div>
      ))}
    </div>
  );
};

MainlistItem.propTypes = {
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
)(MainlistItem);
