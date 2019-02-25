import React from 'react';
import { connect } from 'react-redux';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { createStructuredSelector } from 'reselect';
import { makeSelectGender } from '../selectors';
import * as mapDispatchToProps from '../actions';

class GenderInput extends React.PureComponent {
  genderList = ['male', 'female', 'non-binary'];

  render() {
    const { classes, gender, setStoreValue } = this.props; // eslint-disable-line
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select value={gender} onChange={e => setStoreValue({ key: 'gender', value: e.target.value })}>
              {this.genderList.map(each => (
                <MenuItem key={each} name={each} value={each}>
                  {each}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
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
