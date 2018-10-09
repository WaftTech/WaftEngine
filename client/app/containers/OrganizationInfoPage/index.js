/**
 *
 * OrganizationInfoPage
 *
 */

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
import makeSelectOrganizationInfoPage from './selectors';
import reducer from './reducer';
import saga from './saga';

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
export class OrganizationInfoPage extends React.Component {
  handleAdd = () => {
    this.props.history.push('/wt/organization-info/add');
  };
  handleEdit = id => {
    this.props.history.push(`/wt/organization-info/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/organization-info/edit/${id}`);
  };
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Organization name"
                    id="organizationname"
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
              <h4 className={classes.cardTitleWhite}>Organization Listing</h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of organizations
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Category',
                  'Name',
                  'Phone',
                  'Email',
                  'Is Active',
                  'IsFeatured',
                  'Operations',
                ]}
                tableData={[
                  [
                    'rice brand',
                    'Shrestha Rice',
                    '9841231298',
                    'devkota@gmail.com',
                    '1',
                    '1',
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
                          onClick={() => this.handleEdit(1)}
                        >
                          <Edit
                            className={
                              classes.tableActionButtonIcon + ' ' + classes.edit
                            }
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
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon +
                              ' ' +
                              classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>,
                  ],
                  [
                    'rice brand',
                    'Devkota Rice',
                    '9841231299',
                    'devkot@gmail.com',
                    '1',
                    '0',
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
                          onClick={() => this.handleEdit(1)}
                        >
                          <Edit
                            className={
                              classes.tableActionButtonIcon + ' ' + classes.edit
                            }
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
                          onClick={() => this.handleDelete(1)}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon +
                              ' ' +
                              classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>,
                  ],
                ]}
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

OrganizationInfoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organizationinfopage: makeSelectOrganizationInfoPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizationInfoPage', reducer });
const withSaga = injectSaga({ key: 'organizationInfoPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(OrganizationInfoPage);
