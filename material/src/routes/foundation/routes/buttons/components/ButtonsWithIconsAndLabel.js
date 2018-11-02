import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="secondary">
        Delete
        <DeleteIcon className={classes.rightIcon} />
      </Button><div className="divider" />
      <Button variant="contained" color="primary">
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button><div className="divider" />
      <Button variant="contained" color="default">
        Upload
        <CloudUploadIcon className={classes.rightIcon} />
      </Button><div className="divider" />
      <Button variant="contained" disabled color="secondary">
        <KeyboardVoiceICon className={classes.leftIcon} />
        Talk
      </Button><div className="divider" />
      <Button variant="contained" size="small">
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

const IconLabelButtons1 = withStyles(styles)(IconLabelButtons);

const Box = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Buttons with icons and label </div>
    <div className="box-body py-5 text-center">
      <IconLabelButtons1 />
    </div>
  </div>
)

export default Box;
