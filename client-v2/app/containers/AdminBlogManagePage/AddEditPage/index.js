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
import FormControl from '@material-ui/core/FormControl';

// core components
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectCategory } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

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

  handleGoBack = () => {
    this.props.push('/admin/blog-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, category } = this.props;
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
                  placeholder="title of the blog"
                  inputProps={{
                    value: one.title,
                    onChange: this.handleChange('title'),
                  }}
                />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    value={one.category}
                    onChange={this.handleCategoryChange('category')}
                    inputProps={{
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
                    value: one.description,
                  }}
                />
              </div>
              <div sm={12} md={6}>
                <TextField
                  name="Published On"
                  id="blog-published_on"
                  fullWidth
                  placeholder="published on"
                  inputProps={{
                    value: one.published_on,
                    onChange: this.handleChange('published_on'),
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
