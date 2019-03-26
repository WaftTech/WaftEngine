import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/NavLink';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExtensionIcon from '@material-ui/icons/Extension';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import PeopleIcon from '@material-ui/icons/People';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SliderIcon from '@material-ui/icons/Slideshow';
import LayersIcon from '@material-ui/icons/Layers';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import InboxIcon from '@material-ui/icons/MoveToInbox';

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

const MainListItems = ({ classes }) => {
  const [openFirstSet, setOpenFirstSet] = useState(false);
  const [openSecondSet, setOpenSecondSet] = useState(false);
  const [openThirdSet, setOpenThirdSet] = useState(false);

  const handleFirstSetClick = () => {
    setOpenFirstSet(openFirstSetVal => !openFirstSetVal);
  };
  const handleSecondSetClick = () => {
    setOpenSecondSet(openSecondSetVal => !openSecondSetVal);
  };
  const handleThirdSetClick = () => {
    setOpenThirdSet(openThirdSetVal => !openThirdSetVal);
  };

  return (
    <List component="nav">
      <ListItem button onClick={handleFirstSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="First Set" />
        {openFirstSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openFirstSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/dashboard" className={classes.nested}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/admin/role-manage" className={classes.nested}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Role Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/module-manage" className={classes.nested}>
            <ListItem button>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="Module Manage" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={handleSecondSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Second Set" />
        {openSecondSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSecondSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/user-manage" className={classes.nested}>
            <ListItem button>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="User Manage" />
            </ListItem>
          </Link>
          <Link to="/admin/content-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
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
            >
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ Manage" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={handleThirdSetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Third Set" />
        {openThirdSet ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openThirdSet} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/media-manage" className={classes.nested}>
            <ListItem
              style={{
                textDecoration: 'none',
                fontSize: '0.8em',
                textTransform: 'uppercase',
              }}
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
            >
              <ListItemIcon>
                <SliderIcon />
              </ListItemIcon>
              <ListItemText primary="Slider Manage" />
            </ListItem>
          </Link>
          <Link to="/" className={classes.nested}>
            <ListItem>
              <ListItemIcon>
                <InsertChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </Link>
          <Link to="/" className={classes.nested}>
            <ListItem>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
};

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainListItems);
