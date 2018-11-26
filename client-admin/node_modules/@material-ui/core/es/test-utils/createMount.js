import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import ReactDOM from 'react-dom';
import { mount as enzymeMount } from 'enzyme'; // Generate an enhanced mount function.

export default function createMount(options1 = {}) {
  const {
    mount = enzymeMount
  } = options1,
        other1 = _objectWithoutProperties(options1, ["mount"]);

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const mountWithContext = function mountWithContext(node, options2 = {}) {
    return mount(node, _objectSpread({
      attachTo
    }, other1, options2));
  };

  mountWithContext.attachTo = attachTo;

  mountWithContext.cleanUp = () => {
    ReactDOM.unmountComponentAtNode(attachTo);
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
}