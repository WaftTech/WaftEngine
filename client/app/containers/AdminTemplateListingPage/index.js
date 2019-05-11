/**
 *
 * AdminTemplateListingPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
// import Close from '@material-ui/icons/Close';

// core components

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectOne } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export function AdminTemplateListingPage({
  classes,
  loadAllRequest,
  loadOneRequest,
  addEditRequest,
  setOneValue,
  all,
  one,
}) {
  const [data, setData] = useState('');
  useEffect(() => {
    loadAllRequest();
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (data) {
      console.log('submit');
      addEditRequest();
    }
  };
  const handleTemplateChange = e => {
    // if template is not loaded call api
    // else load template to one from store
    const { value } = e.target;
    setData(value);
    value && loadOneRequest(value);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setOneValue({ key: name, value });
  };
  return (
    <>
      <PageHeader>Template Manage</PageHeader>
      <PageContent>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField
                id="template-name"
                label="Template Name"
                value={one.template_name || ''}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="template-key">Template Key</InputLabel>
                <Select
                  value={data || ''}
                  onChange={handleTemplateChange}
                  inputProps={{
                    id: 'template-key',
                  }}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {all.map(each => (
                    <MenuItem value={each.template_key} key={each._id}>
                      {each.template_key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="informations"
                label="Information"
                value={one.information || ''}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple">Variables</InputLabel>
                <Select
                  multiple
                  value={one.variables}
                  onChange={() => null}
                  input={<Input id="select-multiple" />}
                  fullWidth
                >
                  {one.variables.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="from_email"
                label="From"
                value={one.from || ''}
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
                inputProps={{ name: 'from' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="subject_email"
                label="Subject"
                value={one.subject || ''}
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
                inputProps={{ name: 'subject' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="alternate_text"
                label="Alternate Text"
                value={one.alternate_text || ''}
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
                inputProps={{ name: 'alternate_text' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <div dangerouslySetInnerHTML={{ __html: one.body }} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="body_email"
                label="Body"
                value={one.body || ''}
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
                multiline
                inputProps={{ name: 'body' }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </PageContent>
    </>
  );
}

AdminTemplateListingPage.propTypes = {
  all: PropTypes.array.isRequired,
  one: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  loadOneRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'adminTemplateListingPage', reducer });
const withSaga = injectSaga({ key: 'adminTemplateListingPage', saga });

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminTemplateListingPage);
