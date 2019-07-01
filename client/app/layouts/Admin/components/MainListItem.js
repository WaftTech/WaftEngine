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
