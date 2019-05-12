/**
 *
 * AdminTemplateListingPage
 *
 */

import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
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
    <div>
      <PageHeader>Email Template Manage</PageHeader>
      <PageContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Template Name</label>
            <input
              readOnly="rea"
              id="template-name"
              value={one.template_name || ''}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Template Key</label>
            <select
              className="h-12 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey "
              id="template-key"
              value={data || ''}
              onChange={handleTemplateChange}
            >
              <option value="">
                <em>None</em>
              </option>
              {all.map(each => (
                <option value={each.template_key} key={each._id}>
                  {each.template_key}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Informations</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              id="informations"
              value={one.information || ''}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Variables</label>
            <select
              multiple
              value={one.variables}
              onChange={() => null}
              // input={<Input id="select-multiple" />}
            >
              {one.variables.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
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

          <div dangerouslySetInnerHTML={{ __html: one.body }} />

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

          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </PageContent>
    </div>
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
