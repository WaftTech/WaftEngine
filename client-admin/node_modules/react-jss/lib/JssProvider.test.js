'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n          .a {\n            color: red;\n          }\n        '], ['\n          .a {\n            color: red;\n          }\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n          .b {\n            color: red;\n          }\n        '], ['\n          .b {\n            color: red;\n          }\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n          .A-NoRenderer-a {\n            color: red;\n          }\n        '], ['\n          .A-NoRenderer-a {\n            color: red;\n          }\n        ']),
    _templateObject4 = _taggedTemplateLiteral(['\n          .B-NoRenderer-a {\n            color: red;\n          }\n        '], ['\n          .B-NoRenderer-a {\n            color: red;\n          }\n        ']),
    _templateObject5 = _taggedTemplateLiteral(['\n        .a-0 {\n          color: green;\n        }\n      '], ['\n        .a-0 {\n          color: green;\n        }\n      ']),
    _templateObject6 = _taggedTemplateLiteral(['\n        .a-1 {\n          color: red;\n        }\n      '], ['\n        .a-1 {\n          color: red;\n        }\n      ']),
    _templateObject7 = _taggedTemplateLiteral(['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: green;\n        }\n      '], ['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: green;\n        }\n      ']),
    _templateObject8 = _taggedTemplateLiteral(['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: blue;\n        }\n      '], ['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: blue;\n        }\n      ']),
    _templateObject9 = _taggedTemplateLiteral(['\n        .a-0 {\n          color: red;\n        }\n        .a-1 {\n          color: red;\n        }\n      '], ['\n        .a-0 {\n          color: red;\n        }\n        .a-1 {\n          color: red;\n        }\n      ']),
    _templateObject10 = _taggedTemplateLiteral(['\n        .MyApp-MyRenderComponent-a-0 {\n          color: red;\n        }\n      '], ['\n        .MyApp-MyRenderComponent-a-0 {\n          color: red;\n        }\n      ']);

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _commonTags = require('common-tags');

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

var _server = require('react-dom/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* eslint-disable global-require, react/prop-types */

describe('JssProvider', function () {
  describe('nested child JssProvider', function () {
    describe('generateClassName prop', function () {
      it('should forward from context', function () {
        var generateClassName = function generateClassName() {
          return 'a';
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { generateClassName: generateClassName },
          _react2['default'].createElement(
            JssProvider,
            { registry: registry },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject));
      });

      it('should overwrite over child props', function () {
        var generateClassNameParent = function generateClassNameParent() {
          return 'a';
        };
        var generateClassNameChild = function generateClassNameChild() {
          return 'b';
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { generateClassName: generateClassNameParent },
          _react2['default'].createElement(
            JssProvider,
            { generateClassName: generateClassNameChild, registry: registry },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2));
      });
    });

    describe('classNamePrefix prop', function () {
      it('should forward from context', function () {
        var generateClassName = function generateClassName(rule, sheet) {
          return sheet.options.classNamePrefix + rule.key;
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { classNamePrefix: 'A-' },
          _react2['default'].createElement(
            JssProvider,
            { registry: registry, generateClassName: generateClassName },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3));
      });

      it('should overwrite over child props', function () {
        var generateClassName = function generateClassName(rule, sheet) {
          return sheet.options.classNamePrefix + rule.key;
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { classNamePrefix: 'A-' },
          _react2['default'].createElement(
            JssProvider,
            { classNamePrefix: 'B-', registry: registry, generateClassName: generateClassName },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4));
      });
    });

    describe('jss prop', function () {
      it('should forward from context', function () {
        var processed = true;
        var localJss = createJss().use({
          onProcessRule: function onProcessRule() {
            processed = true;
          }
        });
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { jss: localJss },
          _react2['default'].createElement(
            JssProvider,
            null,
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(processed).to.be(true);
      });

      it('should overwrite over child props', function () {
        var processed = void 0;

        var localJss1 = createJss().use({
          onProcessRule: function onProcessRule() {
            processed = localJss1;
          }
        });

        var localJss2 = createJss().use({
          onProcessRule: function onProcessRule() {
            processed = localJss2;
          }
        });

        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { jss: localJss1 },
          _react2['default'].createElement(
            JssProvider,
            { jss: localJss2 },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(processed).to.be(localJss2);
      });
    });

    describe('registry prop', function () {
      it('should forward from context', function () {
        var generateClassName = function generateClassName() {
          return 'a';
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { registry: registry },
          _react2['default'].createElement(
            JssProvider,
            { generateClassName: generateClassName },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject));
      });

      it('should overwrite over child props', function () {
        var generateClassName = function generateClassName() {
          return 'a';
        };
        var registryA = new SheetsRegistry();
        var registryB = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { registry: registryA },
          _react2['default'].createElement(
            JssProvider,
            { registry: registryB, generateClassName: generateClassName },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registryA.toString()).to.be('');

        (0, _expect2['default'])(registryB.toString()).to.be((0, _commonTags.stripIndent)(_templateObject));
      });
    });

    describe('disableStylesGeneration prop', function () {
      it('should forward from context', function () {
        var generateClassName = function generateClassName() {
          return 'a';
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { registry: registry, disableStylesGeneration: true },
          _react2['default'].createElement(
            JssProvider,
            { generateClassName: generateClassName },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be('');
      });

      it('should overwrite over child props', function () {
        var generateClassName = function generateClassName() {
          return 'a';
        };
        var registry = new SheetsRegistry();
        var MyComponent = injectSheet({ a: { color: 'red' } })();

        render(_react2['default'].createElement(
          JssProvider,
          { registry: registry, disableStylesGeneration: true },
          _react2['default'].createElement(
            JssProvider,
            { generateClassName: generateClassName, disableStylesGeneration: false },
            _react2['default'].createElement(MyComponent, null)
          )
        ), node);

        (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject));
      });
    });
  });

  describe('JssProvider in a stateful component', function () {
    it('should not reset the class name generator', function () {
      var registry = new SheetsRegistry();
      var A = injectSheet({ a: { color: 'red' } })();
      var B = injectSheet({ a: { color: 'green' } })();
      var localJss = createJss({
        createGenerateClassName: function createGenerateClassName() {
          var counter = 0;
          return function (rule) {
            return rule.key + '-' + counter++;
          };
        }
      });

      var MyComponent = function (_Component) {
        _inherits(MyComponent, _Component);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).apply(this, arguments));
        }

        _createClass(MyComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.value = true;
          }
        }, {
          key: 'render',
          value: function render() {
            this.value = !this.value;
            var Inner = this.value ? A : B;

            return _react2['default'].createElement(
              JssProvider,
              { registry: registry, jss: localJss },
              _react2['default'].createElement(Inner, null)
            );
          }
        }]);

        return MyComponent;
      }(_react.Component);

      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5));
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6));
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5));
      render(_react2['default'].createElement(MyComponent, null), node);
      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6));
    });
  });

  describe('with JssProvider for SSR', function () {
    var localJss = void 0;

    beforeEach(function () {
      localJss = createJss(_extends({}, (0, _jssPresetDefault2['default'])(), {
        virtual: true,
        createGenerateClassName: function createGenerateClassName() {
          var counter = 0;
          return function (rule) {
            return rule.key + '-' + counter++;
          };
        }
      }));
    });

    it('should add style sheets to the registry from context', function () {
      var customSheets = new SheetsRegistry();
      var ComponentA = injectSheet({
        button: { color: 'red' }
      })();
      var ComponentB = injectSheet({
        button: { color: 'blue' }
      })();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: customSheets, jss: localJss },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(ComponentA, null),
          _react2['default'].createElement(ComponentB, null)
        )
      ));

      (0, _expect2['default'])(customSheets.registry.length).to.equal(2);
    });

    it('should use Jss istance from the context', function () {
      var receivedSheet = void 0;

      var MyComponent = injectSheet({}, { inject: ['sheet'] })(function (_ref) {
        var sheet = _ref.sheet;

        receivedSheet = sheet;
        return null;
      });

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss },
        _react2['default'].createElement(MyComponent, null)
      ));

      (0, _expect2['default'])(receivedSheet.options.jss).to.be(localJss);
    });

    it('should add dynamic sheets', function () {
      var customSheets = new SheetsRegistry();
      var MyComponent = injectSheet({
        button: {
          width: function width() {
            return 10;
          }
        }
      })();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: customSheets, jss: localJss },
        _react2['default'].createElement(MyComponent, null)
      ));

      (0, _expect2['default'])(customSheets.registry.length).to.be(2);
    });

    it('should reset the class generator counter', function () {
      var styles = {
        button: {
          color: 'red',
          border: function border(_ref2) {
            var _border = _ref2.border;
            return _border;
          }
        }
      };
      var MyComponent = injectSheet(styles)();

      var registry = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: registry, jss: localJss },
        _react2['default'].createElement(MyComponent, { border: 'green' })
      ));

      (0, _expect2['default'])(registry.toString()).to.equal((0, _commonTags.stripIndent)(_templateObject7));

      registry = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: registry, jss: localJss },
        _react2['default'].createElement(MyComponent, { border: 'blue' })
      ));

      (0, _expect2['default'])(registry.toString()).to.equal((0, _commonTags.stripIndent)(_templateObject8));
    });

    it('should be idempotent', function () {
      var MyComponent = injectSheet({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();

      var customSheets1 = new SheetsRegistry();
      var customSheets2 = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets1 },
        _react2['default'].createElement(MyComponent, { color: '#000' })
      ));

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets2 },
        _react2['default'].createElement(MyComponent, { color: '#000' })
      ));

      var result1 = customSheets1.toString();
      var result2 = customSheets2.toString();

      (0, _expect2['default'])(result1).to.equal(result2);
    });

    it('should render deterministically on server and client', function () {
      var ComponentA = injectSheet({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();

      var ComponentB = injectSheet({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();

      var customSheets1 = new SheetsRegistry();
      var customSheets2 = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets1 },
        _react2['default'].createElement(ComponentA, { color: '#000' })
      ));

      render(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets2 },
        _react2['default'].createElement(ComponentB, { color: '#000' })
      ), node);

      (0, _expect2['default'])(customSheets1.toString()).to.equal(customSheets2.toString());
    });

    it('should use generateClassName', function () {
      var Component1 = injectSheet({ a: { color: 'red' } })();
      var Component2 = injectSheet({ a: { color: 'red' } })();
      var registry = new SheetsRegistry();
      var generateClassName = localJss.options.createGenerateClassName();

      (0, _server.renderToString)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          JssProvider,
          { registry: registry, generateClassName: generateClassName, jss: localJss },
          _react2['default'].createElement(Component1, null)
        ),
        _react2['default'].createElement(
          JssProvider,
          { registry: registry, generateClassName: generateClassName, jss: localJss },
          _react2['default'].createElement(Component2, null)
        )
      ));

      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject9));
    });

    it('should use classNamePrefix', function () {
      var MyRenderComponent = function MyRenderComponent() {
        return null;
      };
      var MyComponent = injectSheet({ a: { color: 'red' } })(MyRenderComponent);
      var registry = new SheetsRegistry();
      var localJss2 = createJss(_extends({}, (0, _jssPresetDefault2['default'])(), {
        virtual: true,
        createGenerateClassName: function createGenerateClassName() {
          var counter = 0;
          return function (rule, sheet) {
            return '' + sheet.options.classNamePrefix + rule.key + '-' + counter++;
          };
        }
      }));

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: registry, jss: localJss2, classNamePrefix: 'MyApp-' },
        _react2['default'].createElement(MyComponent, null)
      ));

      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject10));
    });
  });
});