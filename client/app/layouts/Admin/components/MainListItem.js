import React, { useState } from 'react';
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
  const [openFirstSet, setOpenFirstSet] = useState(false);
  const [openSecondSet, setOpenSecondSet] = useState(false);
  const [openThirdSet, setOpenThirdSet] = useState(false);
  const [openFourthSet, setOpenFourthSet] = useState(false);

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

  // is SuperAdmin?
  const isSuperAdmin = roles.includes('5bf7ae3694db051f5486f845');
  // is NormalUser?
  const isNormalUser = roles.includes('5bf7ae90736db01f8fa21a24');
  // is Admin?
  const isAdmin = roles.includes('5bf7af0a736db01f8fa21a25');
  // is NoticeUploadUser?
  const isNoticeUploadUser = roles.includes('5cbdaa39a1892e16b344d19a');
  // is Approval?
  const isApproval = roles.includes('5cbdada4a1892e16b344d1da');

  if (isSuperAdmin) {
    return (
      <div>
        <ul className="list-reset">
          <li
            className="pl-2 pr-2 pointer"
            selected={pathname === '/admin/dashboard'}
          >
            <Link
              to="/admin/dashboard"
              className="text-grey-darker hover:text-black text-sm no-underline flex items-center p-2"
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
              <li selected={pathname === '/admin/content-manage'}>
                <Link
                  to="/admin/content-manage"
                  className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
                >
                  <FormatSizeIcon className="mr-3" />
                  Static Content
                </Link>
              </li>
              <li selected={pathname === '/admin/faq-manage'}>
                <Link
                  to="/admin/faq-manage"
                  className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
                >
                  <QuestionAnswerIcon className="mr-3" />
                  FAQ
                </Link>
              </li>
              <li selected={pathname === '/admin/faq-cat-manage'}>
                <Link
                  to="/admin/faq-cat-manage"
                  className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
                >
                  <QuestionAnswerIcon className="mr-3" />
                  FAQ Category
                </Link>
              </li>
              <li selected={pathname === '/admin/media-manage'}>
                <Link
                  to="/admin/media-manage"
                  className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
                >
                  <QuestionAnswerIcon className="mr-3" />
                  Media
                </Link>
              </li>
              <li selected={pathname === '/admin/slider-manage'}>
                <Link
                  to="/admin/slider-manage"
                  className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
                >
                  <SliderIcon className="mr-3" />
                  Slider
                </Link>
              </li>
              <li selected={pathname === '/admin/blog-manage'}>
                <Link
                  to="/admin/blog-manage"
                  className="text-grey-darker hover:text-black text-sm no-underline flex items-center  pt-2 pb-2 pl-6 pr-6"
                >
                  <QuestionAnswerIcon className="mr-3" />
                  Blog
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
            <li selected={pathname === '/admin/user-manage'}>
              <Link
                to="/admin/user-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <ExtensionIcon className="mr-3" />
                Users
              </Link>
            </li>
            <li selected={pathname === '/admin/role-manage'}>
              <Link
                to="/admin/role-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <PeopleIcon className="mr-3" />
                Roles
              </Link>
            </li>
            <li selected={pathname === '/admin/module-manage'}>
              <Link
                to="/admin/module-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <ExtensionIcon className="mr-3" />
                Modules
              </Link>
            </li>
            <li selected={pathname === '/admin/contact-manage'}>
              <Link
                to="/admin/contact-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <ExtensionIcon className="mr-3" />
                Contacts
              </Link>
            </li>
            <li selected={pathname === '/admin/subscribe-manage'}>
              <Link
                to="/admin/subscribe-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <ExtensionIcon className="mr-3" />
                Subscribes
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
            <li selected={pathname === '/admin/template-manage'}>
              <Link
                to="/admin/template-manage"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <SliderIcon className="mr-3" />
                Template
              </Link>
            </li>
            <li selected={pathname === '/admin/reports'}>
              <Link
                to="/admin/reports"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <InsertChartIcon className="mr-3" />
                Reports
              </Link>
            </li>
            <li selected={pathname === '/admin/integration'}>
              <Link
                to="/admin/integration"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <LayersIcon className="mr-3" />
                Integrations
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
            <li selected={pathname === '/admin/reports'}>
              <Link
                to="/admin/reports"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <InsertChartIcon />
                Reports
              </Link>
            </li>
            <li selected={pathname === '/admin/errors'}>
              <Link
                to="/admin/errors"
                className="text-grey-darker hover:text-black text-sm no-underline flex items-center pt-2 pb-2 pl-6 pr-6"
              >
                <ErrorIcon />
                Errors
              </Link>
            </li>
          </Collapse>
        </ul>
      </div>
    );
  }
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
