/**
 *
 * StaticMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectMenu } from '../../containers/App/selectors';
import { loadMenuRequest } from '../../containers/App/actions';

/* eslint-disable react/prefer-stateless-function */
class StaticMenu extends React.PureComponent {
  static propTypes = {
    menuKey: PropTypes.string.isRequired,
    loadMenuRequest: PropTypes.func.isRequired,
    menuObj: PropTypes.object.isRequired,
  };

  state = { checked: '', anchorEL: null, anchored: null };

  handleToggle = () => {
    this.state.checked === ''
      ? this.setState({ checked: 'checked' })
      : this.setState({ checked: '' });
  };

  componentDidMount() {
    if (this.props.menuObj[this.props.menuKey]) {
      return;
    }
    this.props.loadMenuRequest(this.props.menuKey);
  }

  getChildElement = parentObj => {
    const childContent = [];
    if (parentObj.child_menu.length) {
      parentObj.child_menu.map(childElement => {
        childContent.push(
          <ul className="relative menu-child text-sm">
            <li>
              <Link to={childElement.url} onClick={this.handleToggle}>
                {childElement.title}
              </Link>
              {childElement.child_menu &&
                childElement.child_menu.length &&
                this.getChildElement(childElement)}
            </li>
          </ul>,
        );
      });
      return childContent;
    }
  };

  render() {
    const { checked } = this.state;
    const { menuObj } = this.props;
    const data = menuObj[this.props.menuKey];
    if (!data) return null;
    return data.map(each => {
      if (each.is_internal) {
        if (each.child_menu && each.child_menu[0]._id !== '') {
          return (
            <NavLink
              to="#"
              className="hidden md:block menu uppercase text-white text-center block no-underline py-2 hover:bg-primary md:text-black md:hover:bg-transparent md:hover:text-primary md:inline-block md:mr-5"
              onClick={this.handleToggle}
            >
              {each.title}
              {each.child_menu &&
                each.child_menu[0]._id !== '' &&
                checked === 'checked' &&
                this.getChildElement(each)}
            </NavLink>
          );
        }
        return (
          <NavLink
            to={each.url}
            className="hidden md:block menu uppercase text-white text-center block no-underline py-2 hover:bg-primary md:text-black md:hover:bg-transparent md:hover:text-primary md:inline-block md:mr-5"
            onClick={this.handleToggle}
          >
            {each.title}
            {each.child_menu &&
              each.child_menu[0]._id !== '' &&
              this.getChildElement(each)}
          </NavLink>
        );
      }
      return (
        <a
          className="hidden md:block menu uppercase text-white text-center block no-underline py-2 hover:bg-primary md:text-black md:hover:bg-transparent md:hover:text-primary md:inline-block md:mr-5"
          href={each.url}
          target={each.target}
        >
          {each.title}
        </a>
      );
    });
  }
}

const mapStateToProps = createStructuredSelector({
  menuObj: makeSelectMenu(),
});

const mapDispatchToProps = dispatch => ({
  loadMenuRequest: payload => dispatch(loadMenuRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StaticMenu);
// return data.map(each => (
//   <div key={each._id}>
//     {each.is_internal ? (
//       <Link
//         to={each.url}
//         className="my-auto mr-8 sm:mr-0 items-center hover:text-primary"
//       >
//         {each.title}
//       </Link>
//     ) : (
//       <a
//         className="my-auto mr-8 sm:mr-0 items-center hover:text-primary"
//         href={each.url}
//         target={each.target}
//       >
//         {each.title}
//       </a>
//     )}
//   </div>
// ));
