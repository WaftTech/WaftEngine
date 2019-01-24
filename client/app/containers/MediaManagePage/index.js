import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadAllRequest } from './actions';
import { makeSelectAll, makeSelectPage } from './selectors';
import messages from './messages';
import { IMAGE_BASE } from '../App/constants';

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
export class MediaManagePage extends React.Component {
  state = { sortToggle: 0 };
  componentDidMount() {
    this.props.loadAll({ query: {} });
  }
  handleAdd = () => {
    this.props.history.push('/wt/media-manage/add');
  };

  handleChangePage = (event, page) => {
    this.setState({ page: page + 1 }, () => {
      this.props.loadAll({
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage,
      });
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.props.loadAll({
        rowsPerPage: this.state.rowsPerPage,
      });
    });
  };

  render() {
    const { classes, allLinks, pageItem } = this.props;
    const allLinksObj = allLinks.toJS();
    const pageObj = pageItem.toJS();
    const { page = 1, size = 10, totaldata = 20 } = pageObj;

    const tableData = allLinksObj.map(({ filename }) => [
      <img src={`${IMAGE_BASE}public/media/${filename}`} style={{ height: 100 }} />,

      <React.Fragment />,
    ]);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {' '}
                <FormattedMessage {...messages.mediaManagement} />
              </h4>
              <p className={classes.cardCategoryWhite}>
                <FormattedMessage {...messages.listOfMedia} />
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[<FormattedMessage {...messages.MediaImage} />]}
                tableData={tableData}
                page={page}
                size={size}
                totaldata={totaldata}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
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

MediaManagePage.propTypes = {
  loadAll: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll(),
  pageItem: makeSelectPage(),
});

const mapDispatchToProps = dispatch => ({
  loadAll: payload => dispatch(loadAllRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mediaManagePage', reducer });
const withSaga = injectSaga({ key: 'mediaManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(MediaManagePage);
