import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import OutlinedButton from 'components/OutlinedButton';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <Button size="small" className={classes.button}>
          Small
        </Button>
        <Button size="medium" className={classes.button}>
          Medium
        </Button>
        <Button size="large" className={classes.button}>
          Large
        </Button>
      </div>
      <div>
        <OutlinedButton size="small" color="primary" className={classes.button}>
          Small
        </OutlinedButton>
        <OutlinedButton size="medium" color="primary" className={classes.button}>
          Medium
        </OutlinedButton>
        <OutlinedButton size="large" color="primary" className={classes.button}>
          Large
        </OutlinedButton>
      </div>
      <div>
        <Button variant="contained" size="small" color="primary" className={classes.button}>
          Small
        </Button>
        <Button variant="contained" size="medium" color="primary" className={classes.button}>
          Medium
        </Button>
        <Button variant="contained" size="large" color="primary" className={classes.button}>
          Large
        </Button>
      </div>
      <div>
        <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
        <Button variant="fab" color="secondary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ButtonSizes1 = withStyles(styles)(ButtonSizes);

const Box = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Sizes</div>
    <div className="box-body py-5 text-center">
      <ButtonSizes1 />
    </div>
  </div>
)

export default Box;
