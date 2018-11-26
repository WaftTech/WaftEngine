import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: '100%'
  }
};
const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

function CardMedia(props) {
  const {
    classes,
    className,
    component: Component,
    image,
    src,
    style
  } = props,
        other = _objectWithoutProperties(props, ["classes", "className", "component", "image", "src", "style"]);

  process.env.NODE_ENV !== "production" ? warning(Boolean(image || src), 'Material-UI: either `image` or `src` property must be specified.') : void 0;
  const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  const composedStyle = !isMediaComponent && image ? _objectSpread({
    backgroundImage: `url("${image}")`
  }, style) : style;
  return React.createElement(Component, _extends({
    className: classNames(classes.root, {
      [classes.media]: isMediaComponent
    }, className),
    style: composedStyle,
    src: isMediaComponent ? image || src : undefined
  }, other));
}

CardMedia.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Component for rendering image.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),

  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: PropTypes.string,

  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: PropTypes.string,

  /**
   * @ignore
   */
  style: PropTypes.object
} : {};
CardMedia.defaultProps = {
  component: 'div'
};
export default withStyles(styles, {
  name: 'MuiCardMedia'
})(CardMedia);