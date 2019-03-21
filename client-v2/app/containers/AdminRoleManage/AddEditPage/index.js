import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  };

  state = {
    one: { role_title: '', description: '', is_active: false },
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return { one: nextProps.one };
  }

  handleChange = name => event => {
    this.setState(state => ({
      one: { ...state.one, [name]: event.target.value },
    }));
  };

  handleChecked = name => event => {
    this.setState(state => ({
      one: { ...state.one, [name]: event.target.checked },
    }));
  };

  handleSave = () => {
    this.props.addEditRequest(this.state.one);
  };

  render() {
    const { one } = this.state;
    return (
      <div>
        <Input
          label="Role Title"
          inputProps={{
            value: one.role_title,
            onChange: this.handleChange('role_title'),
          }}
        />
        <Input
          inputProps={{
            value: one.description,
            onChange: this.handleChange('description'),
          }}
        />
        <Button color="primary" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'adminRoleManage', reducer });
const withSaga = injectSaga({ key: 'adminRoleManageAddEdit', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
