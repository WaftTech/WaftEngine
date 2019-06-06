import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Paper } from '@material-ui/core';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

const styles = theme => ({
  p20: { padding: 20 },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: { margin: theme.spacing.unit / 2 },
});

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleGoBack = () => {
    this.props.push('/admin/blog-cat-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, match } = this.props;
    return (
      <div>
        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Blog'
              : 'Add Blog'}
          </title>
        </Helmet>
        <PageHeader>
          {match && match.params && match.params.id
            ? 'Edit Blog Category'
            : 'Add Blog Category'}
        </PageHeader>
        <PageContent>
          <Paper className={classes.p20}>
            <div>
              <TextField
                name="Title"
                id="title"
                label="Title"
                value={one.title || ''}
                onChange={this.handleChange('title')}
                margin="normal"
                fullWidth
              />
            </div>
            <div>
              <InputLabel style={{ color: '#AAAAAA' }}>
                Activity Type
              </InputLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={one.is_active || false}
                    tabIndex={-1}
                    onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Is Active"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleGoBack}
            >
              Back
            </Button>
          </Paper>
        </PageContent>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({
  key: 'adminBlogCategoryManagePage',
  reducer,
});
const withSaga = injectSaga({ key: 'adminBlogCategoryManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
