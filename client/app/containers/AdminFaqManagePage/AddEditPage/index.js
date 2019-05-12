import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ArrowBack from '@material-ui/icons/ArrowBack';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectCategory } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

const styles = theme => ({});

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    category: PropTypes.array.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleGoBack = () => {
    this.props.push('/admin/faq-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, category, one } = this.props;
    // const { data, category_id } = this.state;
    return (
      <div>
        <PageHeader>
          <ArrowBack className="cursor-pointer" onClick={this.handleGoBack} />
        </PageHeader>
        <PageContent>
        <div class="w-full md:w-1/2 px-3 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Question
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                name="Question"
                id="faq"
                value={one.question}
                onChange={this.handleChange('question')}
              />
              <TextField
                multiline
                rows="5"
                name="Answer"
                id="faq-answer"
                label="Answer"
                value={one.title}
                onChange={this.handleChange('title')}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: 'true',
                }}
              />

              <TextField
                select
                label="Select Category"
                value={one.category}
                onChange={this.handleChange('category')}
                onChange={this.handleChange('currency')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: 'true',
                }}
              >
                {category.map(each => (
                  <MenuItem key={each._id} value={each._id}>
                    {each.title}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                className="mt-4"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={this.handleSave}
              >
                Save
              </Button>
           </div>
        </PageContent>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'faqManagePage', reducer });
const withSaga = injectSaga({ key: 'faqManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
