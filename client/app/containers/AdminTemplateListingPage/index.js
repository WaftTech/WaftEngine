/**
 *
 * AdminTemplateListingPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
// import Close from '@material-ui/icons/Close';

// core components

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectOne, makeSelectLoading } from './selectors';
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
  loading,
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
    setOneValue({ key: e.target.name, value: e.target.value });
  };
  return loading && loading == true ? (
    <CircularProgress color="primary" disableShrink />
  ) : (
    <>
      <Helmet>
          <title>Email Template</title>
        </Helmet>
      <PageHeader>Email Template Manage</PageHeader>
      <PageContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Template Name</label>
            <input
              readOnly="rea"
              id="template-name"
              name="template-name"
              value={one.template_name || ''}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Template Key</label>
            <Select
              className="h-12 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey "
              id="template-key"
              name="template_key"
              value={data || ''}
              displayEmpty
              onChange={handleTemplateChange}
            >
              {all.map(each => (
                <MenuItem value={each.template_key} key={each._id}>
                  {each.template_key}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Informations</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              id="informations"
              name="informations"
              value={one.information || ''}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Variables</label>
            <Select
              multiple
              value={one.variables || ''}
              onChange={() => null}
              // input={<Input id="select-multiple" />}
            >
              {one.variables.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            id="from_email"
            label="From"
            name="from"
            value={one.from || ''}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            id="subject_email"
            label="Subject"
            name="subject"
            value={one.subject || ''}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            id="alternate_text"
            label="Alternate Text"
            name="alternate_text"
            value={one.alternate_text || ''}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            fullWidth
          />

          <div dangerouslySetInnerHTML={{ __html: one.body }} />

          <TextField
            id="body_email"
            label="Body"
            name="body"
            value={one.body || ''}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            multiline
            fullWidth
          />

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
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
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
