/**
 *
 * VideosPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadVideosRequest } from './actions';
import { makeSelectVideos } from './selectors';
import reducer from './reducer';
import saga from './saga';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export class VideosPage extends React.Component {
  state = { expanded: false };
  componentDidMount() {
    this.props.loadVideos(this.props.match.params.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.loadVideos(this.props.match.params.id);
    }
  }
  handleExpandClick = () => this.setState(state => ({ expanded: !state.expanded }));

  render() {
    const { classes, videos } = this.props;
    const videosObj = videos.toJS();

    return (
      <div className="container">
        <Helmet>
          <title>Video Library</title>
        </Helmet>
        <div>
          <Grid container spacing={16}>
            {videosObj.videos &&
              videosObj.videos.map(video => {
                console.log(video.url.split('=')[1]);
                return (
                  <Grid item xs={4} key={video._id}>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="Recipe" className={classes.avatar}>
                            {video.title.slice(0, 1)}
                          </Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={video.title}
                        subheader={videosObj.added_at}
                      />
                      <Link to={`/video/link/${video._id}`}>
                        <CardMedia className={classes.media} image={`http://i3.ytimg.com/vi/${video.url.split('=')[1]}/maxresdefault.jpg`} title={video.title} />
                      </Link>
                      <CardContent>
                        <Typography component="p">{video.url}</Typography>
                      </CardContent>
                      <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                          <ShareIcon />
                        </IconButton>
                        <IconButton
                          className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                          })}
                          onClick={this.handleExpandClick}
                          aria-expanded={this.state.expanded}
                          aria-label="Show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Video Gallary Code:</Typography>
                          <Typography paragraph>{videosObj.code}</Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </div>
    );
  }
}

VideosPage.propTypes = {
  loadVideos: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'videoPage', reducer });
const withSaga = injectSaga({ key: 'videoPage', saga });

const mapStateToProps = createStructuredSelector({
  videos: makeSelectVideos(),
});

const mapDispatchToProps = dispatch => ({
  loadVideos: payload => dispatch(loadVideosRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withMaterialStyle = withStyles(styles);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withMaterialStyle,
)(VideosPage);
