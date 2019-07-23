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
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
import { Paper } from '@material-ui/core';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectLoading, makeSelectErrors} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import Loading from '../../../../components/loading';

const styles = theme => ({
  backbtn:{
    padding:0,
    height:'40px',
    width:'40px',
    marginTop:'auto',
    marginBottom:'auto',
    borderRadius:'50%',
    marginRight:'5px',
  },
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
    this.props.clearErrors();
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
    const { classes, one, match, loading, errors } = this.props;
    return loading && loading == true ? (
      <Loading/>
    ) : (
      <div>
        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Blog'
              : 'Add Blog'}
          </title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
        <PageHeader>
        <IconButton className={`${classes.backbtn} cursor-pointer`}	 onClick={this.handleGoBack} aria-label="Back">
          <BackIcon />
        </IconButton>
        {match && match.params && match.params.id
            ? 'Edit Blog Category'
            : 'Add Blog Category'}</PageHeader>
        </div>
      
        <PageContent>
      
        <div className="w-full md:w-1/2 pb-4">
        <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2" htmlFor="grid-last-name">
        Blog Title
        </label>
        <input className="Waftinputbox" id="title" type="text" value= {one.title || ''} name="Title"
          onChange={this.handleChange('title')} />
          <div id="component-error-text">
            {errors.title }
          </div>
        </div>
            <div>
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
        

            <button className="text-white py-2 px-4 rounded mt-4 btn-waft" onClick={this.handleSave}>
              Save
              </button>
             
       
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
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
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
