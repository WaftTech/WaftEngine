import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
// core components
import GridItem from 'components/Grid/GridItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import reducer from '../reducer';
import saga from '../saga';
import CKEditor from 'react-ckeditor-component';
import Chip from '@material-ui/core/Chip';
import { makeSelectOne, makeSelectCategory } from '../selectors';
import { loadOneRequest, addEditRequest, loadCategoryRequest } from '../actions';
import { TYPE, IMAGE_BASE } from '../../App/constants';
import defaultImage from 'assets/img/logo.svg';

const styles = theme => ({
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: { margin: theme.spacing.unit / 2 },
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
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class AddEdit extends Component {
  state = {
    chipData: [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ],

    data: {
      Title: '',
      Description: '',
      Summary: '',
      Category: {},
      Tags: [],
      Keywords: [],
      PublishedOn: '',
      IsPublished: false,
      IsActive: false,
      Image: null,
    },
    images: {
      Image: defaultImage,
    },
    categoryId: '',
    tempTag: '',
  };

  handleChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.value },
    }));
  };
  handleCheckedChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.checked },
    }));
  };

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState(state => ({ data: { ...state.data, [name]: newContent } }));
  };

  handleDelete = index => () => {
    this.setState(state => {
      const chipData = [...state.data.Tags];

      chipData.splice(index, 1);
      return { data: { ...state.data, Tags: chipData } };
    });
  };

  handleGoBack = () => {
    this.props.history.push('/wt/blog-manage');
  };
  handleSave = () => {
    this.props.addEdit({ ...this.state.data, Category: this.state.data.Category.slug_url });
  };
  onDrop = (files, name) => {
    const file = files[0];
    this.setState(state => ({
      data: { ...state.data, [name]: file },
      images: { ...state.images, [name]: file.preview },
    }));
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
    if (this.props.category.size === 0) {
      this.props.loadCategory();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      const categoryId = (oneObj.Category && oneObj.Category._id) || '';
      const Image = oneObj.Image && oneObj.Image.path && `${IMAGE_BASE}${oneObj.Image.path}`;

      this.setState(
        state => ({
          data: { ...state.data, ...oneObj },
          images: { Image },
          categoryId,
        }),
        // () => console.log(this.state),
      );
    }
  }
  handleCategoryChange = e => {
    e.persist();
    this.setState(state => ({
      data: { ...state.data, Category: { slug_url: e.target.value, Name: e.target.name } },
      categoryId: e.target.value,
    }));
  };
  insertTag = event => {
    event.preventDefault();
    this.setState(state => {
      console.log(state.data.Tags.indexOf(state.tempTag));
      if (state.data.Tags.indexOf(state.tempTag) === -1) {
        return {
          data: { ...state.data, Tags: [...state.data.Tags, state.tempTag] },
          tempTag: '',
        };
      }
      return { tempTag: '' };
    });
  };
  handleTempTag = e => this.setState({ tempTag: e.target.value });
  render() {
    const { data, images, categoryId } = this.state;
    const { classes, category } = this.props;
    const categoryObj = category.toJS();
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit Blogs</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Blog Title"
                      id="blog-title"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{ value: data.Title, onChange: this.handleChange('Title') }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>Blog Description</InputLabel>
                    <CKEditor
                      name="Description"
                      content={data.Description}
                      events={{
                        change: e => this.handleEditorChange(e, 'Description'),
                        value: data.Description,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Summary"
                      multiline
                      inputProps={{
                        value: data.Summary,
                        onChange: this.handleChange('Summary'),
                      }}
                      rowsMax="7"
                      className={classes.textField}
                      margin="normal"
                      // variant="outlined"
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="company">Category</InputLabel>
                      <Select
                        value={categoryId}
                        onChange={this.handleCategoryChange}
                        inputProps={{
                          name: 'Category',
                        }}
                      >
                        {categoryObj.map(each => (
                          <MenuItem key={each._id} name={each.title} value={each._id}>
                            {each.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={this.insertTag}>
                      <CustomInput
                        labelText="Tags"
                        id="blog-tags"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: this.state.tempTag,
                          onChange: this.handleTempTag,
                        }}
                      />
                    </form>
                    <Paper className={classes.root}>
                      {data.Tags.map((tag, index) => {
                        let icon = null;

                        return (
                          <Chip
                            key={`${tag}-${index}`}
                            icon={icon}
                            label={tag}
                            onDelete={this.handleDelete(index)}
                            className={classes.chip}
                          />
                        );
                      })}
                    </Paper>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Keywords"
                      id="blog-keywords"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{ value: data.Keywords, onChange: this.handleChange('Keywords') }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Published On"
                      id="published-on"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.PublishedOn,
                        onChange: this.handleChange('PublishedOn'),
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Dropzone onDrop={files => this.onDrop(files, 'Image')} multiple={false}>
                      <img
                        className=""
                        width="200px"
                        height="200px"
                        src={images.Image}
                        alt="blogImage"
                      />
                    </Dropzone>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.IsPublished || false}
                          tabIndex={-1}
                          onClick={this.handleCheckedChange('IsPublished')}
                          value="IsPublished"
                          color="primary"
                        />
                      }
                      label="Is Published"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.IsActive || false}
                          tabIndex={-1}
                          onClick={this.handleCheckedChange('IsActive')}
                          value="IsActive"
                          color="primary"
                        />
                      }
                      label="Is Active"
                    />
                  </GridItem>
                </GridContainer>
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
        </GridContainer>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePageAddEdit', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload)),
  loadCategory: () => dispatch(loadCategoryRequest()),
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
