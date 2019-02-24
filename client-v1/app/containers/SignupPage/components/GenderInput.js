import React from 'react';
import { connect } from 'react-redux';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown';
import InputLabel from '@material-ui/core/InputLabel';
import { createStructuredSelector } from 'reselect';
import { makeSelectGender } from '../selectors';
import * as mapDispatchToProps from '../actions';

class GenderInput extends React.PureComponent {
  render() {
    const { classes, gender } = this.props; // eslint-disable-line
    return (
      <div style={{ position: 'relative' }}>
        <InputLabel htmlFor="demo-controlled-open-dropdown">Gender</InputLabel>
        <CustomDropdown dropdownList={['navin', 'pradip']} />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  gender: makeSelectGender(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenderInput);
