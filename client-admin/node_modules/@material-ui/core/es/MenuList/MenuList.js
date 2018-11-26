import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
// @inheritedComponent List
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import warning from 'warning';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';

class MenuList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentTabIndex: null
    };

    this.handleBlur = event => {
      this.blurTimer = setTimeout(() => {
        if (this.listRef) {
          const list = this.listRef;
          const currentFocus = ownerDocument(list).activeElement;

          if (!list.contains(currentFocus)) {
            this.resetTabIndex();
          }
        }
      }, 30);

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };

    this.handleKeyDown = event => {
      const list = this.listRef;
      const key = keycode(event);
      const currentFocus = ownerDocument(list).activeElement;

      if ((key === 'up' || key === 'down') && (!currentFocus || currentFocus && !list.contains(currentFocus))) {
        if (this.selectedItemRef) {
          this.selectedItemRef.focus();
        } else {
          list.firstChild.focus();
        }
      } else if (key === 'down') {
        event.preventDefault();

        if (currentFocus.nextElementSibling) {
          currentFocus.nextElementSibling.focus();
        }
      } else if (key === 'up') {
        event.preventDefault();

        if (currentFocus.previousElementSibling) {
          currentFocus.previousElementSibling.focus();
        }
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event, key);
      }
    };

    this.handleItemFocus = event => {
      const list = this.listRef;

      if (list) {
        for (let i = 0; i < list.children.length; i += 1) {
          if (list.children[i] === event.currentTarget) {
            this.setTabIndex(i);
            break;
          }
        }
      }
    };
  }

  componentDidMount() {
    this.resetTabIndex();
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimer);
  }

  setTabIndex(index) {
    this.setState({
      currentTabIndex: index
    });
  }

  focus() {
    const {
      currentTabIndex
    } = this.state;
    const list = this.listRef;

    if (!list || !list.children || !list.firstChild) {
      return;
    }

    if (currentTabIndex && currentTabIndex >= 0) {
      list.children[currentTabIndex].focus();
    } else {
      list.firstChild.focus();
    }
  }

  resetTabIndex() {
    const list = this.listRef;
    const currentFocus = ownerDocument(list).activeElement;
    const items = [];

    for (let i = 0; i < list.children.length; i += 1) {
      items.push(list.children[i]);
    }

    const currentFocusIndex = items.indexOf(currentFocus);

    if (currentFocusIndex !== -1) {
      return this.setTabIndex(currentFocusIndex);
    }

    if (this.selectedItemRef) {
      return this.setTabIndex(items.indexOf(this.selectedItemRef));
    }

    return this.setTabIndex(0);
  }

  render() {
    const _this$props = this.props,
          {
      children,
      className,
      onBlur,
      onKeyDown
    } = _this$props,
          other = _objectWithoutProperties(_this$props, ["children", "className", "onBlur", "onKeyDown"]);

    return React.createElement(List, _extends({
      role: "menu",
      ref: ref => {
        this.listRef = ReactDOM.findDOMNode(ref);
      },
      className: className,
      onKeyDown: this.handleKeyDown,
      onBlur: this.handleBlur
    }, other), React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      process.env.NODE_ENV !== "production" ? warning(child.type !== React.Fragment, ["Material-UI: the MenuList component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
      return React.cloneElement(child, {
        tabIndex: index === this.state.currentTabIndex ? 0 : -1,
        ref: child.props.selected ? ref => {
          this.selectedItemRef = ReactDOM.findDOMNode(ref);
        } : undefined,
        onFocus: this.handleItemFocus
      });
    }));
  }

}

MenuList.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func
} : {};
export default MenuList;