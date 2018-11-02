import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

// customized image

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar alt="Remy Sharp" src="assets/images-demo/avatars/1.jpg" className={classes.avatar} />
      <Avatar
        alt="Adelle Charles"
        src="assets/images-demo/avatars/2.jpg"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ImageAvatars1 = withStyles(styles)(ImageAvatars);

const Box = () => (
  <div className="box box-default">
    <div className="box-header">Image avatars</div>
    <div className="box-body">
      <ImageAvatars1 />
    </div>
  </div>
)

export default Box;
