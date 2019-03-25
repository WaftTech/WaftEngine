import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import GridItem from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CustomInput from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectCategory } from '../selectors';
import * as mapDispatchToProps from '../actions';

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
      question: '',
      title: '',
      category: {},
      added_at: '',
      updated_at: '',
    },
    category_id: '',
  };

  handleChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.value },
    }));
  };

  handleDelete = index => () => {
    this.setState(state => {
      const chipData = [...state.data.Tags];

      chipData.splice(index, 1);
      return { data: { ...state.data, Tags: chipData } };
    });
  };

  handleGoBack = () => {
    this.props.history.push('/admin/faq-manage');
  };

  handleSave = () => {
    this.props.addEditRequest({
      ...this.state.data,
      category: this.state.data.category.slug_url,
    });
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    if (this.props.category.size === 0) {
      this.props.loadCategoryRequest();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one;
      console.log(oneObj);
      const category_id = (oneObj.category && oneObj.category) || '';

      this.setState(
        state => ({
          data: { ...state.data, ...oneObj },
          category_id,
        }),
        // () => console.log(this.state),
      );
    }
  }

  handleCategoryChange = e => {
    e.persist();
    this.setState(state => ({
      data: {
        ...state.data,
        category: { slug_url: e.target.value, title: e.target.name },
      },
      category_id: e.target.value,
    }));
  };

  render() {
    const { classes, category } = this.props;
    const { data, category_id } = this.state;
    return (
      <div>
        <GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary" title="Add/Edit FAQs" />
              <CardBody>
                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      name="Question"
                      id="faq"
                      fullWidth="true"
                      inputProps={{
                        value: data.question,
                        onChange: this.handleChange('question'),
                      }}
                    />
                  </GridItem>
                </GridItem>

                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      name="Answer"
                      id="faq-answer"
                      fullWidth="true"
                      inputProps={{
                        value: data.title,
                        onChange: this.handleChange('title'),
                      }}
                    />
                  </GridItem>
                </GridItem>

                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="category">Category</InputLabel>
                      <Select
                        value={category_id}
                        onChange={this.handleCategoryChange}
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
                  </GridItem>
                </GridItem>
                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      name="Added At"
                      id="added_at"
                      fullWidth="true"
                      inputProps={{
                        value: data.added_at,
                        onChange: this.handleChange('added_at'),
                      }}
                    />
                  </GridItem>
                </GridItem>
                <GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      name="Updated At"
                      id="updated_at"
                      fullWidth="true"
                      inputProps={{
                        value: data.updated_at,
                        onChange: this.handleChange('updated_at'),
                      }}
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

const withReducer = injectReducer({ key: 'FAQManagePage', reducer });
const withSaga = injectSaga({ key: 'FAQManagePageAddEdit', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
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
