import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
import { Helmet } from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import { IMAGE_BASE } from '../../App/constants';
import Loading from '../../../components/Loading';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Media extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    addMediaRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number,
      size: PropTypes.number,
      totaldata: PropTypes.number,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleAdd = files => {
    this.props.addMediaRequest(files)
  };

  copyToClipboard = textField => {
    const el = document.createElement('textarea');
    el.value = textField;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  handleDelete = id => {
    this.props.deleteOneRequest(id);
  };

  render() {
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
      classes,
    } = this.props;
    return (
      <>
        <Helmet>
          <title>Media Manage</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Media Manage</PageHeader>
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
        </div>
        <PageContent loading={loading}>
          <div className="flex flex-wrap">
            {data &&
              data.map(each => (
                <div
                  key={each._id}
                  className="w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded"
                >
                  <div>
                    <img
                      className="w-full object-cover h-32"
                      src={`${IMAGE_BASE}${each.path}`}
                      alt="image"
                    />
                  </div>
                  <CardContent>
                    <Typography component="p" style={{ minHeight: '40px' }}>
                      {each.encoding} | {each.mimetype} | {each.size}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          this.copyToClipboard(`${IMAGE_BASE}${each.path}`)
                        }
                      >
                        Copy Path
                      </Button>
                    </div>

                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleDelete(each._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </div>
              ))}
          </div>
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminMediaPage', reducer });
const withSaga = injectSaga({ key: 'adminMediaPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(Media);
