import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from 'actions/settingsActions';
import MaterialIcon from 'components/MaterialIcon';

class ThemeOptions extends React.Component {

  onChange = (e) => {
    const { handleChange } = this.props;
    const newThemeOption = e.target.value;
    handleChange(newThemeOption);
  }

  render() {
    const { theme } = this.props;

    return (
      <section>
        <h4 className="section-header">Theme Options</h4>
        <div className="divider" />

        <div className="row m-0 theme-options clearfix">
          <div className="col-4">
            <label className="theme-option-check">
              <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={this.onChange} />
              <span className="theme-option-item bg-dark text-white">
                <span className="overlay"><MaterialIcon icon="check" /></span>
                <span>Dark</span>
              </span>
            </label>
          </div>
          <div className="col-4">
            <label className="theme-option-check">
              <input type="radio" name="theme" value="gray" checked={theme === 'gray'} onChange={this.onChange} />
              <span className="theme-option-item bg-gray">
                <span className="overlay"><MaterialIcon icon="check" /></span>
                <span>Gray</span>
              </span>
            </label>
          </div>
          <div className="col-4">
            <label className="theme-option-check">
              <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={this.onChange} />
              <span className="theme-option-item bg-page">
                <span className="overlay"><MaterialIcon icon="check" /></span>
                <span>Light</span>
              </span>
            </label>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
});
const mapDispatchToProps = dispatch => ({
  handleChange: (themeOption) => {
    dispatch(changeTheme(themeOption));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeOptions);
