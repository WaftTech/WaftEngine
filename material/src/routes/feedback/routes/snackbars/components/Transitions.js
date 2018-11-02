import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import OutlinedButton from 'components/OutlinedButton';
import Portal from '@material-ui/core/Portal';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class DirectionSnackbar extends React.Component {
  state = {
    open: false,
    Transition: null,
  };

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <OutlinedButton className="m-2" onClick={this.handleClick(TransitionLeft)}>Right</OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick(TransitionUp)}>Up</OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick(TransitionRight)}>Left</OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick(TransitionDown)}>Down</OutlinedButton>
        <Portal>
          <Snackbar
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">I love snacks</span>}
          />
        </Portal>
      </div>
    );
  }
}

const Box = () => (
  <div className="box box-default">
    <div className="box-header">Transitions</div>
    <div className="box-body py-5">
      <DirectionSnackbar />
    </div>
  </div>
)

export default Box;
