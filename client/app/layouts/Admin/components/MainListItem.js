import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/NavLink';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExtensionIcon from '@material-ui/icons/Extension';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import PeopleIcon from '@material-ui/icons/People';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ErrorIcon from '@material-ui/icons/Error';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SliderIcon from '@material-ui/icons/Slideshow';
import LayersIcon from '@material-ui/icons/Layers';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Settings from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermMedia from '@material-ui/icons/PermMedia';
import Phone from '@material-ui/icons/Phone';
import NoteAdd from '@material-ui/icons/NoteAdd';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import MailOutline from '@material-ui/icons/MailOutline';
import menus from './sidemenu';

import {
  makeSelectLocation,
  makeSelectRoles,
} from '../../../containers/App/selectors';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const Mainlis = ({ classes, location: { pathname }, roles }) => {
  let [openSet, setOpenSet] = useState({});
  // let openSet =[];
  const [openFirstSet, setOpenFirstSet] = useState(false);
  const [openSecondSet, setOpenSecondSet] = useState(false);
  const [openThirdSet, setOpenThirdSet] = useState(false);
  const [openFourthSet, setOpenFourthSet] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [accesses, setAccesses] = useState([]);

  useEffect(() => {
    loadCheckRoutes();
  }, []);
  const handleSetClick = key => {
    setOpenSet({...openSet, [key]:!openSet[key]});

  };
  const handleFirstSetClick = () => {
    setOpenFirstSet(openFirstSetVal => !openFirstSetVal);
  };
  const handleSecondSetClick = () => {
    setOpenSecondSet(openSecondSetVal => !openSecondSetVal);
  };
  const handleThirdSetClick = () => {
    setOpenThirdSet(openThirdSetVal => !openThirdSetVal);
  };
  const handleFourthSetClick = () => {
    setOpenFourthSet(openFourthSetVal => !openFourthSetVal);
  };

  const route = window.localStorage.getItem('routes');
  const arr = JSON.parse(route);
  const availableRoutes = arr;

  const loadCheckRoutes = () => {
    for (let i = 0; i < availableRoutes.length; i++) {
      for (let j = 0; j < availableRoutes[i].admin_routes.length; j++) {
        accesses.push(availableRoutes[i].admin_routes[j]);
      }
    }
    setAccesses(accesses);
    // console.log(accesses);
  };
  const hasAccess = key => false; //! accesses.includes(key);
  const menuFunctn = e => {
    return( <li
      key={e.key}
      hidden={hasAccess(e.link)}
      selected={pathname === e.link}
      className={e.key.split('.').length ===1?'pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm':''}
    ><Link
      to={`${e.link}`}
      className={`text-grey-darker hover:text-black text-sm no-underline flex items-center ${e.key.split('.').length >1?"pt-2 pb-2 pl-6 pr-6":'' }`}//pt-2 pb-2 pl-6 pr-6
    >
      <i key={e} className="material-icons mr-3">
        {e.icon}
      </i>
      {e.name}
  </Link></li>);
  };
  return (
    <div>
      <ul className="list-reset">
        {menus.map(e =>
        
        <div key={e.key}>{
          e.link ? (
              menuFunctn(e)
          ) : (
            <>
              <li
                key={e.key}
                className="pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm"
                onClick={() => handleSetClick(e.key)}
              >
                <div className="flex items-center">
                  <i key={e} className="material-icons mr-3">
                    {e.icon}
                  </i>
                  <span className="dropdown-title">{e.name}</span>
                </div>
                {openSet[e.key] ? <ExpandLess /> : <ExpandMore />}
              </li>
              <Collapse in={openSet[e.key]} timeout="auto" unmountOnExit>
                <ul className="list-reset">
                  {e.menu.map(ei => (
                       menuFunctn(ei)
                  ))}
                </ul>
              </Collapse>
            </>
          )}</div>,
        )}
      </ul>
      <ul className="list-reset">
        <li
          hidden={hasAccess('/admin/dashboard')}
          className="pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm"
          selected={pathname === '/admin/dashboard'}
        >
          <Link
            to="/admin/dashboard"
            className="text-grey-darker hover:text-black text-sm no-underline flex items-center"
          >
            <DashboardIcon className="mr-3" />
            Dashboard
          </Link>
        </li>
        <li
          className="pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm"
          onClick={handleFirstSetClick}
        >
          <div className="flex items-center">
            <FormatSizeIcon className="mr-3" />
            <span className="dropdown-title">Content Manage</span>
          </div>
          {openFirstSet ? <ExpandLess /> : <ExpandMore />}
        </li>
        <Collapse in={openFirstSet} timeout="auto" unmountOnExit>
          <ul className="list-reset">
            <li
              hidden={hasAccess('/admin/content-manage')}
              selected={pathname === '/admin/content-manage'}
            >
              <Link
                to="/admin/content-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <FormatSizeIcon className="mr-3" />
                Static Content
              </Link>
            </li>
            <li
              hidden={hasAccess('/admin/faq-manage')}
              selected={pathname === '/admin/faq-manage'}
            >
              <Link
                to="/admin/faq-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
              >
                <QuestionAnswerIcon className="mr-3" />
                FAQ
              </Link>
            </li>
            <li
              hidden={hasAccess('/admin/faq-cat-manage')}
              selected={pathname === '/admin/faq-cat-manage'}
            >
              <Link
                to="/admin/faq-cat-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
              >
                <QuestionAnswerIcon className="mr-3" />
                FAQ Category
              </Link>
            </li>
            <li
              hidden={hasAccess('/admin/media-manage')}
              selected={pathname === '/admin/media-manage'}
            >
              <Link
                to="/admin/media-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
              >
                <PermMedia className="mr-3" />
                Media
              </Link>
            </li>
            <li
              hidden={hasAccess('/admin/slider-manage')}
              selected={pathname === '/admin/slider-manage'}
            >
              <Link
                to="/admin/slider-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
              >
                <SliderIcon className="mr-3" />
                Slider
              </Link>
            </li>
            <li
              hidden={hasAccess('/admin/blog-manage')}
              selected={pathname === '/admin/blog-manage'}
            >
              <Link
                to="/admin/blog-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
              >
                <NoteAdd className="mr-3" />
                Blog
              </Link>
            </li>
            <li
              hidden={hasAccess('/admin/blog-cat-manage')}
              selected={pathname === '/admin/blog-cat-manage'}
            >
              <Link
                to="/admin/blog-cat-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
              >
                <NoteAdd className="mr-3" />
                Blog Category
              </Link>
            </li>
          </ul>
        </Collapse>
        <li
          className="pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm"
          onClick={handleSecondSetClick}
        >
          <div className="flex items-center">
            <InboxIcon className="mr-3" />
            <span className="dropdown-title">Access Manage</span>
          </div>
          {openSecondSet ? <ExpandLess /> : <ExpandMore />}
        </li>
        <Collapse in={openSecondSet} timeout="auto" unmountOnExit>
          <li
            hidden={hasAccess('/admin/user-manage')}
            selected={pathname === '/admin/user-manage'}
          >
            <Link
              to="/admin/user-manage"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <AccountCircle className="mr-3" />
              Users
            </Link>
          </li>
          <li
            hidden={hasAccess('/admin/role-manage')}
            selected={pathname === '/admin/role-manage'}
          >
            <Link
              to="/admin/role-manage"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <PeopleIcon className="mr-3" />
              Roles
            </Link>
          </li>
          <li
            hidden={hasAccess('/admin/module-manage')}
            selected={pathname === '/admin/module-manage'}
          >
            <Link
              to="/admin/module-manage"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <ExtensionIcon className="mr-3" />
              Modules
            </Link>
          </li>
        </Collapse>

        <li
          className="pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm"
          onClick={handleThirdSetClick}
        >
          <div className="flex items-center">
            {' '}
            <Settings className="mr-3" />
            <span className="dropdown-title">Settings</span>
          </div>
          {openThirdSet ? <ExpandLess /> : <ExpandMore />}
        </li>
        <Collapse in={openThirdSet} timeout="auto" unmountOnExit>
          <li
            hidden={hasAccess('/admin/template-manage')}
            selected={pathname === '/admin/template-manage'}
          >
            <Link
              to="/admin/template-manage"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <ViewQuilt className="mr-3" />
              Template
            </Link>
          </li>
        </Collapse>
        <li
          className="pt-2 pr-4 pb-2 pl-4 cursor-pointer flex items-center justify-between text-grey-darker hover:text-black text-sm"
          onClick={handleFourthSetClick}
        >
          <div className="flex items-center">
            <InsertChartIcon className="mr-3" />
            <span className="dropdown-title">Reports</span>
          </div>
          {openFourthSet ? <ExpandLess /> : <ExpandMore />}
        </li>
        <Collapse in={openFourthSet} timeout="auto" unmountOnExit>
          <li
            hidden={hasAccess('/admin/contact-manage')}
            selected={pathname === '/admin/contact-manage'}
          >
            <Link
              to="/admin/contact-manage"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <Phone className="mr-3" />
              Contacts
            </Link>
          </li>
          <li
            hidden={hasAccess('/admin/subscribe-manage')}
            selected={pathname === '/admin/subscribe-manage'}
          >
            <Link
              to="/admin/subscribe-manage"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <MailOutline className="mr-3" />
              Subscribes
            </Link>
          </li>
          <li
            hidden={hasAccess('/admin/reports')}
            selected={pathname === '/admin/reports'}
          >
            <Link
              to="/admin/reports"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <InsertChartIcon className="mr-3" />
              Reports
            </Link>
          </li>
          <li selected={pathname === '/admin/errors'}>
            <Link
              to="/admin/errors"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
            >
              <ErrorIcon className="mr-3" />
              Errors
            </Link>
          </li>
        </Collapse>
      </ul>
    
    </div>
  );
};

Mainlis.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  roles: makeSelectRoles(),
});

const withConnect = connect(mapStateToProps);
const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(Mainlis);
