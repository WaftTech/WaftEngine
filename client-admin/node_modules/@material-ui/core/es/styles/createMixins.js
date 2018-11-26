import _objectSpread from "@babel/runtime/helpers/objectSpread";
export default function createMixins(breakpoints, spacing, mixins) {
  return _objectSpread({
    gutters: (styles = {}) => {
      return _objectSpread({
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2
      }, styles, {
        [breakpoints.up('sm')]: _objectSpread({
          paddingLeft: spacing.unit * 3,
          paddingRight: spacing.unit * 3
        }, styles[breakpoints.up('sm')])
      });
    },
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}