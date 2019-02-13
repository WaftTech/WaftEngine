import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
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
    chipData: [{ key: 0, label: 'Angular' }, { key: 1, label: 'jQuery' }, { key: 2, label: 'Polymer' }, { key: 3, label: 'React' }, { key: 4, label: 'Vue.js' }],

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
    this.props.history.push('/wt/faq-manage');
  };
  handleSave = () => {
    this.props.addEdit({ ...this.state.data, category: this.state.data.category.slug_url });
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
      const category_id = (oneObj.category && oneObj.category._id) || '';

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
      data: { ...state.data, category: { slug_url: e.target.value, title: e.target.name } },
      category_id: e.target.value,
    }));
  };
  render() {
    const { data, category_id } = this.state;
    const { classes, category } = this.props;
    const categoryObj = category.toJS();
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit FAQs</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Question"
                      id="faq"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{ value: data.question, onChange: this.handleChange('question') }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Answer"
                      id="faq-answer"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{ value: data.title, onChange: this.handleChange('title') }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="company">Category</InputLabel>
                      <Select
                        value={category_id}
                        onChange={this.handleCategoryChange}
                        inputProps={{
                          name: 'category',
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
                    <CustomInput
                      labelText="Added At"
                      id="added_at"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.added_at,
                        onChange: this.handleChange('added_at'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Updated At"
                      id="updated_at"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.updated_at,
                        onChange: this.handleChange('updated_at'),
                      }}
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

const withReducer = injectReducer({ key: 'FAQManagePage', reducer });
const withSaga = injectSaga({ key: 'FAQManagePageAddEdit', saga });

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
