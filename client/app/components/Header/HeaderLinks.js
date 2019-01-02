import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import classNames from "classnames";
import { createStructuredSelector } from "reselect";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Search from "@material-ui/icons/Search";
// core components

import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../containers/App/reducer";
import saga from "../../containers/App/saga";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import { makeSelectAll } from "../../containers/App/selectors";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import { logout, loadAllRequest } from "../../containers/App/actions";
import LanguageSwitcher from "../LanguageSwitcher";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  searchClicked = e => {
    e.preventDefault();
    console.log("hello");
  };
  handleClick = () => {
    this.props.loadNotification();
  };

  render() {
    const { classes, allLinks } = this.props;
    const { open } = this.state;
    const allLinksObj = allLinks.toJS();
    console.log(allLinksObj);
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: `${classes.margin} ${classes.search}`
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button
            color="Black"
            aria-label="edit"
            justIcon
            round
            onClick={this.searchClicked}
          >
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <LanguageSwitcher
            render={changeLocale => (
              <React.Fragment>
                <span onClick={() => changeLocale("en")}>En</span>|
                <span onClick={() => changeLocale("nl")}>ने</span>
              </React.Fragment>
            )}
          />

          <Hidden mdUp implementation="css">
            <LanguageSwitcher />
          </Hidden>
        </Button>
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Notifications
              className={classes.icons}
              onClick={this.handleClick}
            />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Notification</p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={`${classNames({ [classes.popperClose]: !open })} ${
              classes.pooperNav
            }`}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      {<MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Mike John responded to your email
                      </MenuItem>}
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        You have 5 new tasks
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        You're now friend with Andrew
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another Notification
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          onClick={this.props.logout}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Logout</p>
          </Hidden>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll()
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loadNotification: () => dispatch(loadAllRequest())
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withStyle = withStyles(headerLinksStyle);
export default compose(
  withConnect,
  withStyle
)(HeaderLinks);
