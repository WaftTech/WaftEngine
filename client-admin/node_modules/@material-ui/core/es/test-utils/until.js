import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function shallowRecursively(wrapper, selector, _ref) {
  let {
    context
  } = _ref,
      other = _objectWithoutProperties(_ref, ["context"]);

  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    return wrapper;
  }

  let newContext = context;
  const instance = wrapper.root().instance(); // The instance can be null with a stateless functional component and react >= 16.

  if (instance && instance.getChildContext) {
    newContext = _objectSpread({}, context, instance.getChildContext());
  }

  const nextWrapper = wrapper.shallow(_objectSpread({
    context: newContext
  }, other));

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, {
    context: newContext
  });
}

export default function until(selector, options = {}) {
  return this.single('until', () => shallowRecursively(this, selector, options));
}