import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import Dropzone from 'react-dropzone';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import { Paper, InputBase, Divider } from '@material-ui/core';

// core components
import Table from 'components/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import { IMAGE_BASE } from '../App/constants';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class AdminMediaManagePage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    addMediaRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleAdd = files => {
    this.props.addMediaRequest(files);
    // this.props.push('/admin/media-manage/add');
  };

  // handleDelete = id => {
  //   // this.props.push(`/admin/media-manage/edit/${id}`);
  // };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ encoding, mimetype, path, size: fileSize, added_at, _id }) => [
        _id,
        encoding,
        mimetype,
        <img src={`${IMAGE_BASE}${path}`} height="20" alt="thumbnail" />,
        `${fileSize}`,
        moment(added_at).format('MMM Do YY'),
        <>
          <Tooltip
            id="tooltip-top"
            title="Delete Media"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              onClick={() => this.handleDelete(_id)}
            >
              <Edit
                className={`${classes.tableActionButtonIcon} ${classes.edit}`}
              />
            </IconButton>
          </Tooltip>
        </>,
      ],
    );
    return (
      <>
        <PageHeader>Media Manage</PageHeader>
        <PageContent>
          <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
            <InputBase
              name="find_name"
              id="contents-name"
              placeholder="Search Contents"
              fullWidth
              value={query.find_name}
              onChange={this.handleQueryChange}
            />
            <Divider style={{ width: 1, height: 40, margin: 4 }} />
            <IconButton aria-label="Search" onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <br />
          <Paper
            style={{
              padding: 0,
              overflow: 'auto',
              borderRadius: 4,
              boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
              display: 'flex',
            }}
            elevation={0}
          >
            <Table
              tableHead={[
                'id',
                'encoding',
                'mimetype',
                'path',
                'size',
                'Added at',
              ]}
              tableData={tableData}
              pagination={tablePagination}
              handlePagination={this.handlePagination}
            />
            <Dropzone onDrop={this.handleAdd}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    round="true"
                    elevation={0}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              )}
            </Dropzone>
          </Paper>
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminMediaManagePage', reducer });
const withSaga = injectSaga({ key: 'adminMediaManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminMediaManagePage);
