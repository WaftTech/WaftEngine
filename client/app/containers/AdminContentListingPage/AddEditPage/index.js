import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// core components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { spacing, palette } from '@material-ui/system';

const styles = { 

}


class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    // classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setOneValue({ key: name, value: newContent });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleGoBack = () => {
    this.props.push('/admin/content-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { one } = this.props;
    return (
      <div>
        <PageHeader>
        <IconButton className="cursor-pointer"	 onClick={this.handleGoBack} aria-label="Back">
          <BackIcon />
        </IconButton></PageHeader>
        <PageContent>

           <div class="w-full md:w-1/2 px-3 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
        Content Title
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-last-name" type="text" value= {one.name}
                    onChange= {this.handleChange('name')} />
    </div>

               <div class="w-full md:w-1/2 px-3 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
        Content Key
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-last-name" type="text" value= {one.key}
                    onChange= {this.handleChange('key')} />
    </div>
    <div className="mb-4 px-3">
                <CKEditor
                  name="description"
                  content={one.description}
                  config={{ allowedContent: true }}
                  events={{
                    change: e => this.handleEditorChange(e, 'description'),
                    value: one.description,
                  }}
                />
                </div>

                 <div class="w-full md:w-1/2 px-3 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
      Published From
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-last-name" type="text" value= {one.publish_from}
                    onChange= {this.handleChange('publish_from')} />
    </div>
    <div class="w-full md:w-1/2 px-3 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
      Published To
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-last-name" type="text" value= {one.publish_to}
                    onChange= {this.handleChange('publish_to')} />
    </div>

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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={one.is_feature || false}
                      onClick={this.handleCheckedChange('is_feature')}
                      value="is_feature"
                      color="primary"
                    />
                  }
                  label="Is Feature"
                />

<br/>
              <Button
              
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                Save
              </Button>
        </PageContent>
      </div>
    );
  }
}

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
