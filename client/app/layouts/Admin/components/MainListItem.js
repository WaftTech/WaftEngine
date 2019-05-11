import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/NavLink';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import { makeSelectLocation } from '../../../containers/App/selectors';

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

const MainListItems = ({ classes, location: { pathname } }) => {
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

  return (
    <List component="nav">
      <Link to="/admin/dashboard">
        <ListItem button selected={pathname === '/admin/dashboard'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <ListItem button onClick={handleFirstSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Content Management" />
        {openFirstSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openFirstSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/content-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
              selected={pathname === '/admin/content-manage'}
            >
              <ListItemIcon>
                <FormatSizeIcon />
              </ListItemIcon>
              <ListItemText primary="Content Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/faq-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
              selected={pathname === '/admin/faq-manage'}
            >
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/media-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
              selected={pathname === '/admin/media-manage'}
            >
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Media Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/slider-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
              selected={pathname === '/admin/slider-manage'}
            >
              <ListItemIcon>
                <SliderIcon />
              </ListItemIcon>
              <ListItemText primary="Slider Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/blog-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
              selected={pathname === '/admin/blog-manage'}
            >
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Blog Manage" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <ListItem button onClick={handleSecondSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Access Management" />
        {openSecondSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSecondSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/user-manage" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/user-manage'}>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="User Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/role-manage" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/role-manage'}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Role Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/module-manage" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/module-manage'}>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="Module Manage" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={handleThirdSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Settings" />
        {openThirdSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openThirdSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/template-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
              selected={pathname === '/admin/template-manage'}
            >
              <ListItemIcon>
                <SliderIcon />
              </ListItemIcon>
              <ListItemText primary="Template Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/reports" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/reports'}>
              <ListItemIcon>
                <InsertChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </Link>
          <Link to="/admin/integration" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/integration'}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <ListItem button onClick={handleFourthSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Reports" />
        {openFourthSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openFourthSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/reports" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/reports'}>
              <ListItemIcon>
                <InsertChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </Link>
          <Link to="/admin/errors" className={classes.nested}>
            <ListItem button selected={pathname === '/admin/errors'}>
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText primary="Errors" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
};

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps);
const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(MainListItems);
