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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Close from '@material-ui/icons/Close';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import CustomButton from '../../components/CustomButtons/Button';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadErrorRequest } from './actions';
import { makeSelectError, makeSelectPage } from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
export class ErrorPage extends React.Component {
  state = {
    open: false,
    errorStack: '',
  };
  componentDidMount() {
    this.props.loadError({ payload: {} });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    // this.props.deleteOne(id);
  };
  handleChangePage = (event, page) => {
    this.setState({ page: page + 1 }, () => {
      this.props.loadError({
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage,
      });
    });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.props.loadError({
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage,
      });
    });
  };
  errorClicked = error => {
    this.setState({ open: true, errorStack: error });
  };
  render() {
    const { classes, errors, pageItem } = this.props;
    const errorsObj = errors.toJS();
    const pageObj = pageItem.toJS();
    const { page = 1, size = 10, totaldata = 20 } = pageObj;
    const tableData = errorsObj.map(({ _id, error_message, error_stack, error_type, AddedAt }) => [
      <div onClick={() => this.errorClicked(error_stack)}>{error_message}</div>,
      error_type,
      AddedAt,
      <React.Fragment>
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
            <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
          </IconButton>
        </Tooltip>
      </React.Fragment>,
    ]);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> Error Management</h4>
              <p className={classes.cardCategoryWhite}>Here are the list of errors</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.error_message} />,
                  <FormattedMessage {...messages.error_type} />,
                  <FormattedMessage {...messages.AddedAt} />,
                ]}
                tableData={tableData}
                page={page}
                size={size}
                totaldata={totaldata}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
              <div>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{'Error Stack'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {this.state.errorStack}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/* <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
                round={true}
                onClick={this.handleAdd}
              >
                <AddIcon /> */}
              {/* </Button> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ErrorPage.propTypes = {
  loadError: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectError(),
  pageItem: makeSelectPage(),
});

const mapDispatchToProps = dispatch => ({
  loadError: payload => dispatch(loadErrorRequest(payload)),
  // deleteOne: id => dispatch(deleteOneRequest(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'errorPage', reducer });
const withSaga = injectSaga({ key: 'errorPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ErrorPage);
