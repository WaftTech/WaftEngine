import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import moment from 'moment';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// core components
import GridItem from '@material-ui/core/Grid';
import CustomInput from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class AddEdit extends Component {
  state = {
    name: '',
    key: '',
    description: '',
    publish_from: '',
    is_active: false,
    is_feature: false,
    publish_to: '',
  };
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState({ [name]: newContent });
  };

  // handleCheckedChange = name => event => {
  //   event.persist();
  //   this.setState(state => ({
  //     data: { ...state.data, [name]: event.target.checked },
  //   }));
  // };
  handleCheckedChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  // handleChange = name => event => {
  //   event.persist();
  //   this.setState(state => ({
  //     data: { ...state.data, [name]: event.target.value },
  //   }));
  // };
  handleGoBack = () => {
    this.props.history.push('/admin/content-manage');
  };
  handleSave = () => {
    this.props.addEditRequest(this.state);
    this.props.history.push('/admin/content-manage');
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one;
      this.setState(state => ({
        ...oneObj,
      }));
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary"
                title="Content"
                subheader="Content info"
              />
              <CardBody>
                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      name="Content Name"
                      id="contents-name"
                      formControl={true}
                      fullWidth = {true}
                      placeholder = "name of the content"
                      inputProps={{
                        value: this.state.name,
                        onChange: this.handleChange('name'),
                      }}
                    />
                  </GridItem>
                </GridItem>
                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      name="key"
                      id="contents-key"
                      formControl={true}
                      fullWidth={true}
                      placeholder="name of the content key"
                      inputProps={{ value: this.state.key, onChange: this.handleChange('key') }}
                    />
                  </GridItem>
                </GridItem>

                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>Content Description</InputLabel>
                    <CKEditor
                      name="description"
                      content={this.state.description}
                      events={{
                        change: e => this.handleEditorChange(e, 'description'),
                        value: this.state.description,
                      }}
                    />
                  </GridItem>
                </GridItem>

                <GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      name="Published From"
                      id="contents-from-date"
                      formControl={true}
                      fullWidth={true}
                      placeholder="published from"
                      inputProps={{
                        value: this.state.publish_from,
                        onChange: this.handleChange('publish_from'),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      name="Published To"
                      id="contents-to-date"
                      formControl={true}
                      fullWidth={true}
                      placeholder="publish to"
                      inputProps={{
                        value: this.state.publish_to,
                        onChange: this.handleChange('publish_to'),
                      }}
                    />
                  </GridItem>
                </GridItem>
                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>Activity Type</InputLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.is_active || false}
                          tabIndex={-1}
                          onClick={this.handleCheckedChange('is_active')}
                          value="is_active"
                          color="primary"
                        />
                      }
                      label="Is Active"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.is_feature || false}
                          onClick={this.handleCheckedChange('is_feature')}
                          value="is_feature"
                          color="primary"
                        />
                      }
                      label="Is Feature"
                    />
                  </GridItem>
                </GridItem>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSave}>
                  Save
                </Button>
                <Button color="primary" onClick={this.handleGoBack}>
                  Back
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridItem>
      </div>
    );
  }
}

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'contentManagePage', reducer });
const withSaga = injectSaga({ key: 'contentManagePageAddEdit', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
