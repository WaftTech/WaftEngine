import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
// import { withSnackbar } from 'notistack';
import { removeSnackbar, enqueueSnackbar } from '../actions';
import { makeSelectNotifications } from '../selectors';
import { toast } from 'react-toastify';

class Notifier extends React.Component {
  static propTypes = {
    removeSnackbar: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
  };

  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (!notExists) {
        notExists =
          notExists ||
          !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
      }
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      // if (this.displayed.includes(notification.key)) return;
      // Display snackbar using toast
      if (notification.options && notification.options.variant) {
        toast[notification.options.variant](notification.message, {
          ...notification.options,
        });
      } else {
        if (notification.options) {
          toast(notification.message, { ...notification.options });
        } else {
          toast(notification.message);
        }
      }
      // this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
});

export default connect(mapStateToProps, { enqueueSnackbar, removeSnackbar })(
  Notifier,
);
