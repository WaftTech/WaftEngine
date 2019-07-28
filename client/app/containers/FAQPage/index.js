/** *********
 *
 * FAQPage
 *
 *********** */

import React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
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
  FAQParent: {
    marginBottom: '15px',
    boxShadow: 'none',
    background: '#f7f8f9',
    borderRadius: '4px',
    border: 'none',

    '&:before': {
      background: 'none',
    },
  },

  FAQchild: {
    fontSize: '1.5em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#444444',
  },

  FAQPanel: {
    marginBottom: '15px',
    boxShadow: 'none',
    borderRadius: '4px',
    border: 'none',
  },
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
        <div className="banner relative">
          <img src="https://www.waftengine.org/public/media/C97CE0A29A7E4B4-banner.jpg" />
          <h1 className="container mx-auto my-auto absolute inset-x-0 bottom-0 text-waftprimary waft-title">
            FAQs
          </h1>
        </div>
        <div className="mt-10 container mx-auto">
          {faq.cat &&
            faq.cat.map(
              x =>
                faq.faq &&
                faq.faq.filter(z => z.category == x._id).length !== 0 && (
                  <ExpansionPanel
                    className={classes.FAQParent}
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
                      <Typography variant="h4" className={classes.FAQchild}>
                        {x.title}
                      </Typography>
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
                                <Typography
                                  variant="h5"
                                  className={classes.FAQgrandchild}
                                >
                                  {y.question}
                                </Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                <Typography variant="h6">{y.title}</Typography>
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
