import React from 'react';
import OutlinedButton from 'components/OutlinedButton';
import Snackbar from '@material-ui/core/Snackbar';
import Portal from '@material-ui/core/Portal';

class PositionedSnackbar extends React.Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <OutlinedButton className="m-2" onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
          Top-Center
        </OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick({ vertical: 'top', horizontal: 'right' })}>
          Top-Right
        </OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick({ vertical: 'bottom', horizontal: 'right' })}>
          Bottom-Right
        </OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick({ vertical: 'bottom', horizontal: 'center' })}>
          Bottom-Center
        </OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })}>
          Bottom-Left
        </OutlinedButton>
        <OutlinedButton className="m-2" onClick={this.handleClick({ vertical: 'top', horizontal: 'left' })}>
          Top-Left
        </OutlinedButton>
        <Portal>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={this.handleClose}
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
    <div className="box-header">Positioned</div>
    <div className="box-body py-5">
      <PositionedSnackbar />
    </div>
  </div>
)

export default Box;
