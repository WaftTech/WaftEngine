import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectGender, makeSelectGenderError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const GenderInput = props => {
  const { gender, setStoreValue, error, classes } = props;

  const handleChange = e =>
    setStoreValue({ key: 'gender', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <div className={classes.root}>
      <FormControl
        component="fieldset"
        className={classes.formControl}
        error={hasError}
      >
        <FormLabel component="legend">{error || 'Gender'}</FormLabel>
        <RadioGroup
          aria-label="Gender"
          name="gender"
          className={classes.group}
          value={gender}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

GenderInput.propTypes = {
  gender: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gender: makeSelectGender(),
  error: makeSelectGenderError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(GenderInput);
