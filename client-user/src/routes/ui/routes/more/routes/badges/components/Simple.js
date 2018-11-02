import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from 'components/MaterialIcon';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

function SimpleBadge(props) {
  const { classes } = props;
  return (
    <div>
      <div className="box box-default mb-4">
        <div className="box-body">
          <Badge className={classes.margin} badgeContent={4} color="primary">
            <MaterialIcon icon="mail" className="font-24" />
          </Badge>
          <Badge className={classes.margin} badgeContent={10} color="secondary">
            <MaterialIcon icon="mail" className="font-24" />
          </Badge>
          <IconButton className={classes.margin}>
            <Badge badgeContent={4} color="primary">
              <MaterialIcon icon="mail" className="font-24" />
            </Badge>
          </IconButton>
        </div>
      </div>

      <div className="box box-default mb-4">
        <div className="box-body">
          <AppBar position="static" className={classes.margin}>
            <Tabs value={0}>
              <Tab
                label={
                  <Badge className={classes.padding} color="secondary" badgeContent={4}>
                    Item One
                  </Badge>
                }
              />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </AppBar>
        </div>
      </div>

      <div className="box box-default mb-4">
        <div className="box-body">
          <Badge color="primary" badgeContent={4} className={classes.margin}>
            <Typography className={classes.padding}>Typography</Typography>
          </Badge>
          <Badge color="primary" badgeContent={4} className={classes.margin}>
            <Button variant="contained">Button</Button>
          </Badge>
        </div>
      </div>
    </div>
  );
}

SimpleBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBadge);
