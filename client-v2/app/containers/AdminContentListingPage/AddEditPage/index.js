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
// core components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';

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
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    // classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadOneRequest(this.props.match.params.id);
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

  handleGoBack = () => {
    this.props.push('/admin/content-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { one } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            color="primary"
            title="Content"
            subheader="Content info"
          />
          <CardBody>
            <div>
              <TextField
                name="Content Name"
                id="contents-name"
                fullWidth
                placeholder="name of the content"
                inputProps={{
                  value: one.name,
                  onChange: this.handleChange('name'),
                }}
              />
            </div>
            <div>
              <TextField
                name="key"
                id="contents-key"
                fullWidth
                placeholder="name of the content key"
                inputProps={{
                  value: one.key,
                  onChange: this.handleChange('key'),
                }}
              />
            </div>
            <div>
              <InputLabel style={{ color: '#AAAAAA' }}>
                Content Description
              </InputLabel>
              <CKEditor
                name="description"
                content={one.description}
                events={{
                  change: e => this.handleEditorChange(e, 'description'),
                  value: one.description,
                }}
              />
            </div>
            <div sm={12} md={6}>
              <TextField
                name="Published From"
                id="contents-from-date"
                fullWidth
                placeholder="published from"
                inputProps={{
                  value: one.publish_from,
                  onChange: this.handleChange('publish_from'),
                }}
              />
            </div>
            <div sm={12} md={6}>
              <TextField
                name="Published To"
                id="contents-to-date"
                fullWidth
                placeholder="publish to"
                inputProps={{
                  value: one.publish_to,
                  onChange: this.handleChange('publish_to'),
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
                    checked={one.is_feature || false}
                    onClick={this.handleCheckedChange('is_feature')}
                    value="is_feature"
                    color="primary"
                  />
                }
                label="Is Feature"
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
      </div>
    );
  }
}

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
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
