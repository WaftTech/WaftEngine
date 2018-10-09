import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadAllRequest } from './actions';
import { makeSelectAll } from './selectors';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
export class CategoryManagePage extends React.Component {
  componentDidMount() {
    this.props.loadAll();
  }
  handleAdd = () => {
    this.props.history.push('/wt/category-manage/add');
  };
  handleEdit = id => {
    this.props.history.push(`/wt/category-manage/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/ads-manage/edit/${id}`);
  };
  render() {
    const { classes, allLinks } = this.props;
    const allLinksObj = allLinks.toJS();
    const tableData = allLinksObj.map(
      ({
        Category,
        Organization,
        PhoneNo,
        OrganizationEmail,
        IsActive,
        IsFeature,
        slug,
      }) => [
        Category,
        Organization,
        PhoneNo,
        OrganizationEmail,
        '' + IsActive,
        '' + IsFeature,
        <React.Fragment>
          <Tooltip
            id="tooltip-top"
            title="Edit Task"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(slug)}
            >
              <Edit
                className={classes.tableActionButtonIcon + ' ' + classes.edit}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleDelete(_id)}
            >
              <Close
                className={classes.tableActionButtonIcon + ' ' + classes.close}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>,
      ],
    );
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    id="ads-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
              >
                Search
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Ads Listing</h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of Ads
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Title',
                  'Description',
                  'Published from',
                  'Published to',
                  'Image',
                  'IsFeatured',
                  'Operations',
                ]}
                tableData={tableData}
              />
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
                round={true}
                onClick={this.handleAdd}
              >
                <AddIcon />
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

CategoryManagePage.propTypes = {
  loadAll: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll(),
});

const mapDispatchToProps = dispatch => ({
  loadAll: () => dispatch(loadAllRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'categoryManagePage', reducer });
const withSaga = injectSaga({ key: 'categoryManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(CategoryManagePage);
