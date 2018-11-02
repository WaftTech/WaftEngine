import React from 'react';
import { connect } from 'react-redux';
import { Radio, Tooltip } from 'antd';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider from '@material-ui/lab/Slider';
import MaterialIcon from 'components/MaterialIcon';
import { 
  changeLayout,
  toggleBoxedLayout,
  toggleFixedSidenav,
  toggleFixedHeader,
  toggleCollapsedNav,
  toggleOffCanvasNav,
  changeSidenavWidth,
  toggleHeaderShadow,
  toggleSidenavShadow,
} from 'actions/settingsActions';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class LayoutOptions extends React.Component {

  onLayoutChange = (e) => {
    const { handleLayoutChange } = this.props;
    const newLayoutOption = e.target.value;
    handleLayoutChange(newLayoutOption);
  }

  onToggleBoxedLayout = (e, isChecked) => {
    const { handleToggleBoxedLayout } = this.props;
    handleToggleBoxedLayout(isChecked);
  }

  onToggleFixedSidenav = (e, isChecked) => {
    const { handleToggleFixedSidenav } = this.props;
    handleToggleFixedSidenav(isChecked);
  }

  onToggleFixedHeader = (e, isChecked) => {
    const { handleToggleFixedHeader } = this.props;
    handleToggleFixedHeader(isChecked);
  }

  onToggleCollapsedNav = (e, isChecked) => {
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(isChecked);
  }

  onToggleOffCanvasNav = (e, isChecked) => {
    const { handleToggleOffCanvasNav } = this.props;
    handleToggleOffCanvasNav(isChecked);
  }

  onSidenavWidthChange = (event, val) => {
    const { handleSidenavWidthChange } = this.props;
    handleSidenavWidthChange(val);
  }

  onToggleHeaderShadow = (e, isChecked) => {
    const { handleHeaderShadowChange } = this.props;
    handleHeaderShadowChange(isChecked);
  }

  onToggleSidenavShadow = (e, isChecked) => {
    const { handleSidenavShadowChange } = this.props;
    handleSidenavShadowChange(isChecked);
  }

  render() {
    const { layout, boxedLayout, fixedSidenav, fixedHeader, collapsedNav, offCanvasNav, sidenavWidth, headerShadow, sidenavShadow } = this.props;

    return (
      <section>
        <h4 className="section-header mb-4">Layout Options</h4>

        <div className="row m-0 layout-options clearfix">
          <RadioGroup onChange={this.onLayoutChange}>
            <RadioButton value="1" checked={layout === '1'}>
              <Tooltip title="Default App layout"><span className="layout-opition">1</span></Tooltip>
            </RadioButton>
            <RadioButton value="2" checked={layout === '2'}>
              <Tooltip title="App v2 layout"><span className="layout-opition">2</span></Tooltip>
            </RadioButton>
            <RadioButton value="3" checked={layout === '3'}>
              <Tooltip title="Header-Content-Footer layout"><span className="layout-opition">3</span></Tooltip>
            </RadioButton>
            <RadioButton value="4" checked={layout === '4'}>
              <Tooltip title="Content Only (Fullscreen page)"><span className="layout-opition">4</span></Tooltip>
            </RadioButton>
            <RadioButton value="custom">
              <Tooltip title="Your Own"><span className="layout-opition">Custom</span></Tooltip>
            </RadioButton>
          </RadioGroup>
        </div>

        <List className="layout-options">
          <ListItem className="layout-option">
            <ListItemText primary="Fixed Sidenav" />
            <ListItemSecondaryAction>
              <Switch
                checked={fixedSidenav}
                onChange={this.onToggleFixedSidenav}
                disabled={['2','3', '4'].indexOf(layout) >= 0}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary={
              <Tooltip overlayClassName="customizer-tooltip" title='In layout "1", Fixed Header can only be activated when Fixed Sidenav is activated'><span className="text-dotted">Fixed Header <MaterialIcon icon="info" /></span></Tooltip>
            } />
            <ListItemSecondaryAction>
              <Switch
                checked={fixedSidenav && fixedHeader}
                onChange={this.onToggleFixedHeader}
                disabled={['2','3', '4'].indexOf(layout) >= 0}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Boxed Layout" />
            <ListItemSecondaryAction>
              <Switch
                checked={boxedLayout}
                onChange={this.onToggleBoxedLayout}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Collapsed Sidenav" />
            <ListItemSecondaryAction>
              <Switch
                checked={collapsedNav}
                onChange={this.onToggleCollapsedNav}
                disabled={['3','4'].indexOf(layout) >= 0}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Off-Canvas Sidenav" />
            <ListItemSecondaryAction>
              <Switch
                checked={offCanvasNav}
                onChange={this.onToggleOffCanvasNav}
                disabled={['3','4'].indexOf(layout) >= 0}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Header Shadow" />
            <ListItemSecondaryAction>
              <Switch
                checked={headerShadow}
                onChange={this.onToggleHeaderShadow}
                disabled={['4'].indexOf(layout) >= 0}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Sidenav Shadow" />
            <ListItemSecondaryAction>
              <Switch
                checked={sidenavShadow}
                onChange={this.onToggleSidenavShadow}
                disabled={['2', '3','4'].indexOf(layout) >= 0}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>


        <div className="row no-gutters layout-setting-item-slider">
          <div className="col-5">Sidenav Width</div>
          <div className="col-7">
            <Slider
              min={180}
              max={300}
              onChange={this.onSidenavWidthChange}
              value={sidenavWidth}
              disabled={['3','4'].indexOf(layout) >= 0}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  layout: state.settings.layout,
  boxedLayout: state.settings.boxedLayout,
  fixedSidenav: state.settings.fixedSidenav,
  fixedHeader: state.settings.fixedHeader,
  collapsedNav: state.settings.collapsedNav,
  offCanvasNav: state.settings.offCanvasNav,
  sidenavWidth: state.settings.sidenavWidth,
  headerShadow: state.settings.headerShadow,
  sidenavShadow: state.settings.sidenavShadow,
});

const mapDispatchToProps = dispatch => ({
  handleLayoutChange: (layoutOption) => {
    dispatch(changeLayout(layoutOption));
  },
  handleToggleBoxedLayout: (isBoxedLayout) => {
    dispatch( toggleBoxedLayout(isBoxedLayout) );
  },
  handleToggleFixedSidenav: (isFixedSidenav) => {
    dispatch( toggleFixedSidenav(isFixedSidenav) );
  },
  handleToggleFixedHeader: (isFixedHeader) => {
    dispatch( toggleFixedHeader(isFixedHeader) );
  },
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch( toggleCollapsedNav(isCollapsedNav) );
  },
  handleToggleOffCanvasNav: (isOffCanvasNav) => {
    dispatch( toggleOffCanvasNav(isOffCanvasNav) );
  },
  handleSidenavWidthChange: (sidenavWidth) => {
    dispatch( changeSidenavWidth(sidenavWidth) );
  },
  handleHeaderShadowChange: (hasHeaderShadow) => {
    dispatch( toggleHeaderShadow(hasHeaderShadow) );
  },
  handleSidenavShadowChange: (hasSidenavShadow) => {
    dispatch( toggleSidenavShadow(hasSidenavShadow) );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutOptions);
