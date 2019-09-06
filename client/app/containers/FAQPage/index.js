/** *********
 *
 * FAQPage
 *
 *********** */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFAQ, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../components/Loading';

const styles = {
  // FAQParent: {
  //   marginBottom: '15px',
  //   boxShadow: 'none',
  //   background: '#f7f8f9',
  //   borderRadius: '4px',
  //   border: 'none',

  //   '&:before': {
  //     background: 'none',
  //   },
  // },

  // FAQchild: {
  //   fontSize: '1.5em',
  //   textTransform: 'uppercase',
  //   fontWeight: '700',
  //   color: '#444444',
  // },

  // FAQPanel: {
  //   marginBottom: '15px',
  //   boxShadow: 'none',
  //   borderRadius: '4px',
  //   border: 'none',
  // },
};

class FAQPage extends React.Component {
  static propTypes = {
    loadFAQRequest: PropTypes.func.isRequired,
    faq: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  state = {
    expanded: 'panel1',
    qExpanded: '',
  };

  componentDidMount() {
    this.props.loadFAQRequest();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleQChange = panel => (event, expanded) => {
    this.setState({
      qExpanded: expanded ? panel : false,
    });
  };

  render() {
    const { faq, classes, loading } = this.props;

    const { expanded, qExpanded } = this.state;

    return loading && loading == true ? (
      <Loading />
    ) : (
        <div>
          <Helmet>
            <title> FAQs </title>
          </Helmet>
          <div className="bg-star h-48 relative text-center py-12">
            <h1 className="mb-4 text-gray-700">
              Frequently Asked Questions
          </h1>
            <p className="text-gray-700">
              feel free to visit answers you looking for.
</p>
          </div>
          <div className="my-10 max-w-md mx-auto">
            {faq.cat &&
              faq.cat.map(
                x =>
                  faq.faq &&
                  faq.faq.filter(z => z.category == x._id).length !== 0 && (
                    <ExpansionPanel
                      className="rounded mb-2"
                      key={`cat-${x._id}`}
                      square
                      expanded={expanded === x._id}
                      onChange={this.handleChange(x._id)}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <p className="text-lg font-bold">
                          {x.title}
                        </p>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ display: 'block' }}>
                        {faq.faq &&
                          faq.faq
                            .filter(z => z.category == x._id)
                            .map(y => (
                              <ExpansionPanel
                                className={classes.FAQPanel}
                                key={`faq-${y._id}`}
                                expanded={qExpanded === y._id}
                                onChange={this.handleQChange(y._id)}
                              >
                                <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <p className="text-base">
                                    {y.question}
                                  </p>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                  <p className="text-base">{y.title}</p>
                                </ExpansionPanelDetails>
                              </ExpansionPanel>
                            ))}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ),
              )}
          </div>
        </div>
      );
  }
}

const withReducer = injectReducer({ key: 'faq', reducer });

const withSaga = injectSaga({ key: 'faq', saga });

const mapStateToProps = createStructuredSelector({
  faq: makeSelectFAQ(),
  loading: makeSelectLoading(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withStyle = withStyles(styles);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(FAQPage);
