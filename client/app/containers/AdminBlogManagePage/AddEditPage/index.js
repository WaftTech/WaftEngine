import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Dropzone from 'react-dropzone';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// core components
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import CustomInput from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectCategory, makeSelectChip, makeSelectTag } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import { IMAGE_BASE } from '../../App/constants';

const styles = theme => ({
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
    loadCategoryRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    category: PropTypes.array,
    tempTag: PropTypes.string,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
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

  handleCategoryChange = name => e => {
    e.persist();
    this.props.setOneValue({ key: name, value: e.target.value });
  };

  handleTempTag = e => {
    e.persist();
    this.props.setTagValue(e.target.value);
  };

  onDrop = files => {
    this.props.setOneValue({ key: 'image', value: files[0] });
  };

  handleGoBack = () => {
    this.props.push('/admin/blog-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };
 
  handleDelete = index => () => {
      const chipData = [...this.props.one.tags];

      chipData.splice(index, 1);
      this.props.setOneValue({key: 'tags', value: chipData});
  };
  insertTags = event => {
    event.preventDefault();
    if(this.props.one.tags.indexOf(this.props.tempTag) === -1){
        this.props.setOneValue({key: 'tags', value:  [...this.props.one.tags, this.props.tempTag]});
        this.props.setTagValue('');
    }
    return {tempTag: this.props.setTagValue('')};
  };

  render() {
    const { classes, one, category, tempTag } = this.props;
    return (
      <div>
        <PageHeader>Edit Blog</PageHeader>
        <PageContent>
          <Card>
            <CardBody>
              <div>
                <TextField
                  name="Blog Title"
                  id="blog-title"
                  fullWidth
                  label="Title"
                  inputProps={{
                    value: one.title || '',
                    onChange: this.handleChange('title'),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    value={one.category}
                    onChange={this.handleCategoryChange('category')}
                    inputProps={{
                      value: one.category || '',
                      name: 'category',
                    }}
                  >
                    {category.map(each => (
                      <MenuItem
                        key={each._id}
                        name={each.title}
                        value={each._id}
                      >
                        {each.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <InputLabel style={{ color: '#AAAAAA' }}>
                  Blog Description
                </InputLabel>
                <CKEditor
                  name="description"
                  content={one.description}
                  config={{ allowedContent: true }}
                  events={{
                    change: e => this.handleEditorChange(e, 'description'),
                    value: one.description || '',
                  }}
                />
              </div>
              <div>
                {one.image && one.image.filename && <img
                  src={
                    `${IMAGE_BASE}${one.image.path}`
                  }
                  alt="image"
                  width="384"
                  height="325"
                />}
              </div>
              <div>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div
                        color="primary"
                        aria-label="Add"
                        round="true"
                        elevation={0}
                      >
                        <Button variant="contained">Add Files</Button>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div>
                <CustomInput
                  name="Published On"
                  id="blog-published_on"
                  placeholder="Published On"
                  inputProps={{
                    value: one.published_on || '',
                    onChange: this.handleChange('published_on'),
                  }}
                />
              </div>
              <div>
                <form onSubmit={this.insertTags}>
                  <CustomInput
                    name="Tags"
                    id="blog-tags"
                    placeholder="tags"
                    inputProps={{
                      value: tempTag,
                      onChange: this.handleTempTag,
                    }}
                  />
                </form>
                <Paper>
                      {one.tags.map((tag, index) => {
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
              </div>
              <div>
                <CustomInput
                    name="Author"
                    id="blog-author"
                    placeholder="Author"
                    inputProps={{
                      value: one.author || '',
                      onChange: this.handleChange('author'),
                  }}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={one.is_published || false}
                      tabIndex={-1}
                      onClick={this.handleCheckedChange('is_published')}
                      color="primary"
                    />
                  }
                  label="Is Published"
                />
              </div>
            </CardBody>
            <CardFooter>
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
            </CardFooter>
          </Card>
        </PageContent>
      </div>
    );
  }
}

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
  chip: makeSelectChip(),
  tempTag: makeSelectTag(),
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
