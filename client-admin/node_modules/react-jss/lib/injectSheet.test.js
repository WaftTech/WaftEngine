'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n        .a-id {\n          right: 2px;\n        }\n      '], ['\n        .a-id {\n          right: 2px;\n        }\n      ']);

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jss = require('jss');

var _commonTags = require('common-tags');

var _sinon = require('sinon');

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _createHoc = require('./createHoc');

var _createHoc2 = _interopRequireDefault(_createHoc);

var _helper = require('../tests/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable global-require, react/prop-types, no-underscore-dangle */

describe('injectSheet', function () {
  var jss = void 0;

  beforeEach(function () {
    jss = (0, _jss.create)({ createGenerateClassName: _helper.createGenerateClassName });
  });

  describe('.injectSheet()', function () {
    var MyComponent = void 0;

    beforeEach(function () {
      MyComponent = injectSheet({
        button: { color: 'red' }
      })();
    });

    it('should attach and detach a sheet', function () {
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      unmountComponentAtNode(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should reuse one sheet for many elements and detach sheet', function () {
      render(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(MyComponent, null),
        _react2['default'].createElement(MyComponent, null),
        _react2['default'].createElement(MyComponent, null)
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      unmountComponentAtNode(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should reuse one sheet for many elements wrapped into a JssProvider', function () {
      render(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          JssProvider,
          null,
          _react2['default'].createElement(MyComponent, null)
        ),
        _react2['default'].createElement(
          JssProvider,
          null,
          _react2['default'].createElement(MyComponent, null)
        )
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      unmountComponentAtNode(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should have correct meta attribute', function () {
      render(_react2['default'].createElement(MyComponent, null), node);
      var meta = document.querySelector('style').getAttribute('data-meta');
      (0, _expect2['default'])(meta).to.be('NoRenderer, Unthemed, Static');
    });
  });

  describe('injectSheet() option "inject"', function () {
    var getInjected = function getInjected(options) {
      var injectedProps = void 0;
      var Renderer = function Renderer(props) {
        injectedProps = props;
        return null;
      };
      var MyComponent = injectSheet(function () {
        return {
          button: { color: 'red' }
        };
      }, options)(Renderer);
      render(_react2['default'].createElement(
        ThemeProvider,
        { theme: {} },
        _react2['default'].createElement(MyComponent, null)
      ), node);
      return Object.keys(injectedProps);
    };

    it('should inject all by default', function () {
      (0, _expect2['default'])(getInjected()).to.eql(['theme', 'classes']);
    });

    it('should inject sheet only', function () {
      (0, _expect2['default'])(getInjected({ inject: ['sheet'] })).to.eql(['sheet']);
    });

    it('should inject classes only', function () {
      (0, _expect2['default'])(getInjected({ inject: ['classes'] })).to.eql(['classes']);
    });

    it('should inject theme only', function () {
      (0, _expect2['default'])(getInjected({ inject: ['theme'] })).to.eql(['theme']);
    });

    it('should inject classes and theme', function () {
      (0, _expect2['default'])(getInjected({ inject: ['classes', 'theme'] })).to.eql(['theme', 'classes']);
    });
  });

  describe('.injectSheet() preserving source order', function () {
    var ComponentA = void 0;
    var ComponentB = void 0;
    var ComponentC = void 0;

    beforeEach(function () {
      ComponentA = injectSheet({
        button: { color: 'red' }
      })();
      ComponentB = injectSheet({
        button: { color: 'blue' }
      })();
      ComponentC = injectSheet({
        button: { color: 'green' }
      }, { index: 1234 })();
    });

    it('should provide a default index in ascending order', function () {
      render(_react2['default'].createElement(ComponentA, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexA = sheets.registry[0].options.index;
      sheets.reset();
      render(_react2['default'].createElement(ComponentB, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexB = sheets.registry[0].options.index;

      (0, _expect2['default'])(indexA).to.be.lessThan(0);
      (0, _expect2['default'])(indexB).to.be.lessThan(0);
      (0, _expect2['default'])(indexA).to.be.lessThan(indexB);
    });

    it('should not be affected by rendering order', function () {
      render(_react2['default'].createElement(ComponentB, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexB = sheets.registry[0].options.index;
      sheets.reset();
      render(_react2['default'].createElement(ComponentA, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexA = sheets.registry[0].options.index;

      (0, _expect2['default'])(indexA).to.be.lessThan(0);
      (0, _expect2['default'])(indexB).to.be.lessThan(0);
      (0, _expect2['default'])(indexA).to.be.lessThan(indexB);
    });

    it('should keep custom index', function () {
      render(_react2['default'].createElement(ComponentC, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexC = sheets.registry[0].options.index;
      (0, _expect2['default'])(indexC).to.equal(1234);
    });
  });

  describe('.injectSheet() without a component for global styles', function () {
    var MyComponent = void 0;

    beforeEach(function () {
      MyComponent = injectSheet({
        button: { color: 'red' }
      })();
    });

    it('should attach and detach a sheet', function () {
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      unmountComponentAtNode(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should render children', function () {
      var isRendered = true;
      var ChildComponent = function ChildComponent() {
        isRendered = true;
        return null;
      };
      render(_react2['default'].createElement(
        MyComponent,
        null,
        _react2['default'].createElement(ChildComponent, null)
      ), node);
      unmountComponentAtNode(node);
      (0, _expect2['default'])(isRendered).to.be(true);
    });
  });

  describe('access inner component', function () {
    it('should be exposed using "InnerComponent" property', function () {
      var ComponentOuter = injectSheet({
        button: { color: 'red' }
      })();
      (0, _expect2['default'])(ComponentOuter.InnerComponent).to.be.a(Function);
    });
  });

  describe('access inner element', function () {
    it('should provide a ref to the inner element', function () {
      var innerRef = (0, _sinon.spy)();

      /* eslint-disable react/no-multi-comp, react/prefer-stateless-function */

      var InnerComponent = function (_React$PureComponent) {
        _inherits(InnerComponent, _React$PureComponent);

        function InnerComponent() {
          _classCallCheck(this, InnerComponent);

          return _possibleConstructorReturn(this, (InnerComponent.__proto__ || Object.getPrototypeOf(InnerComponent)).apply(this, arguments));
        }

        _createClass(InnerComponent, [{
          key: 'render',
          value: function render() {
            return _react2['default'].createElement('div', null);
          }
        }]);

        return InnerComponent;
      }(_react2['default'].PureComponent);
      /* eslint-enable */

      var StyledComponent = injectSheet({})(InnerComponent);
      render(_react2['default'].createElement(StyledComponent, { innerRef: innerRef }), node);

      (0, _expect2['default'])(innerRef.callCount).to.be(1);
    });
  });

  describe('override sheet prop', function () {
    var MyComponent = void 0;
    var receivedSheet = void 0;
    var mock = {};

    beforeEach(function () {
      var InnerComponent = function InnerComponent(props) {
        receivedSheet = props.sheet;
        return null;
      };
      MyComponent = injectSheet()(InnerComponent);
    });

    it('should be able to override the sheet prop', function () {
      var Parent = function Parent() {
        return _react2['default'].createElement(MyComponent, { sheet: mock });
      };
      render(_react2['default'].createElement(Parent, null), node);
      (0, _expect2['default'])(receivedSheet).to.be(mock);
    });
  });

  describe('classes prop', function () {
    it('should be prefixed by the parent component name', function () {
      var passedClasses = void 0;
      var InnerComponent = function InnerComponent(_ref) {
        var classes = _ref.classes;

        passedClasses = classes;
        return null;
      };
      var MyComponent = injectSheet({
        button: { color: 'red' }
      })(InnerComponent);
      render(_react2['default'].createElement(MyComponent, null), node);
      Object.keys(passedClasses).forEach(function (ruleName) {
        (0, _expect2['default'])(passedClasses[ruleName]).to.match(new RegExp('^' + (0, _getDisplayName2['default'])(InnerComponent) + '-' + ruleName + '[\\s\\S]*$'));
      });
    });

    it('should use defaultProps.classes from InnerComponent', function () {
      var classes = void 0;
      var InnerComponent = function InnerComponent(props) {
        classes = props.classes;
        return null;
      };
      InnerComponent.defaultProps = {
        classes: { 'default': 'default' }
      };
      var MyComponent = injectSheet({}, { jss: jss })(InnerComponent);
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(classes).to.eql({ 'default': 'default' });
    });

    it('should merge the defaultProps.classes from InnerComponent', function () {
      var classes = void 0;
      var InnerComponent = function InnerComponent(props) {
        classes = props.classes;
        return null;
      };
      InnerComponent.defaultProps = {
        classes: { 'default': 'default' }
      };
      var MyComponent = injectSheet({
        a: { color: 'red' }
      }, { jss: jss })(InnerComponent);
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(classes).to.eql({ 'default': 'default', a: 'a-id' });
    });

    it('should merge users classes', function () {
      var classes = void 0;
      var InnerComponent = function InnerComponent(props) {
        classes = props.classes;
        return null;
      };
      InnerComponent.defaultProps = {
        classes: { 'default': 'default' }
      };
      var MyComponent = injectSheet({
        a: { color: 'red' }
      }, { jss: jss })(InnerComponent);
      render(_react2['default'].createElement(MyComponent, { classes: { user: 'user' } }), node);
      (0, _expect2['default'])(classes).to.eql({ 'default': 'default', a: 'a-id', user: 'user' });
    });
  });

  describe('classNamePrefix', function () {
    var classNamePrefix = void 0;

    var renderTest = function renderTest() {
      var localJss = (0, _jss.create)({
        createGenerateClassName: function createGenerateClassName() {
          return function (rule, sheet) {
            classNamePrefix = sheet.options.classNamePrefix;
            return rule.key + '-id';
          };
        }
      });
      function DisplayNameTest() {
        return null;
      }
      var MyComponent = injectSheet({
        a: { color: 'red' }
      }, { jss: localJss })(DisplayNameTest);
      render(_react2['default'].createElement(MyComponent, null), node);
    };

    it('should pass displayName as prefix', function () {
      renderTest();
      (0, _expect2['default'])(classNamePrefix).to.be('DisplayNameTest-');
    });

    it.skip('should pass no prefix in production', function () {
      // Rewrire currently doesn't work, most probably because of how we reset
      // the tests #118
      _createHoc2['default'].__Rewire__('env', 'production');
      renderTest();
      (0, _expect2['default'])(classNamePrefix).to.be(undefined);
      _createHoc2['default'].__ResetDependency__('env');
    });
  });

  describe('rerender with a new JSS instance when using a ThemeProvider', function () {
    it('should correctly render with a new JSS instance', function () {
      var ComponentA = injectSheet(function () {
        return { a: { left: '2px' } };
      })();
      var ComponentB = function ComponentB(_ref2) {
        var localJss = _ref2.localJss;
        return _react2['default'].createElement(
          JssProvider,
          { jss: localJss },
          _react2['default'].createElement(
            ThemeProvider,
            { theme: {} },
            _react2['default'].createElement(ComponentA, null)
          )
        );
      };
      render(_react2['default'].createElement(ComponentB, { localJss: jss }), node);

      var newJss = createJss({
        createGenerateClassName: _helper.createGenerateClassName,
        plugins: [{
          onProcessStyle: function onProcessStyle() {
            return { right: '2px' };
          }
        }]
      });

      render(_react2['default'].createElement(ComponentB, { localJss: newJss }), node);

      var style = document.querySelectorAll('style')[0];
      (0, _expect2['default'])(style.innerText.trim()).to.be((0, _commonTags.stripIndent)(_templateObject));
    });
  });
});