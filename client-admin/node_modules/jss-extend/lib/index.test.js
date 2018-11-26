'use strict';

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssExpand = require('jss-expand');

var _jssExpand2 = _interopRequireDefault(_jssExpand);

var _jss = require('jss');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var settings = {
  createGenerateClassName: function createGenerateClassName() {
    return function (rule) {
      return rule.key + '-id';
    };
  }
}; /* eslint-disable no-underscore-dangle */

describe('jss-extend', function () {
  var jss = void 0;
  var warning = void 0;

  beforeEach(function () {
    _index2['default'].__Rewire__('warning', function (condition, message) {
      warning = message;
    });
    jss = (0, _jss.create)(settings).use((0, _index2['default'])(), (0, _jssNested2['default'])(), (0, _jssExpand2['default'])());
  });

  afterEach(function () {
    _index2['default'].__ResetDependency__('warning');
    warning = undefined;
  });

  describe('simple extend', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = { float: 'left' };
      sheet = jss.createStyleSheet({
        a: a,
        b: {
          extend: a,
          width: '1px'
        }
      });
    });

    it('should extend', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('ensure override order', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = {
        float: 'left',
        color: 'red'
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: a,
          float: 'right'
        }
      });
    });

    it('should have correct order', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  float: right;\n' + '  color: red;\n' + '}');
    });
  });

  describe('multi extend', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = { float: 'left' };
      var b = { position: 'absolute' };
      sheet = jss.createStyleSheet({
        c: {
          extend: [a, b],
          width: '1px'
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('c')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.c-id {\n' + '  float: left;\n' + '  position: absolute;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('nested extend 1', function () {
    var sheet = void 0;

    beforeEach(function () {
      var c = { float: 'left' };
      var b = { extend: c, display: 'none' };
      sheet = jss.createStyleSheet({
        a: {
          extend: b,
          width: '1px'
        }
      });
    });

    it('should should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '  display: none;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('nested extend 2', function () {
    var sheet = void 0;

    beforeEach(function () {
      var b = {
        '&:hover': {
          float: 'left',
          width: '3px'
        }
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: b,
          width: '1px',
          '&:hover': {
            width: '2px',
            height: '2px'
          }
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  width: 1px;\n' + '}\n' + '.a-id:hover {\n' + '  float: left;\n' + '  width: 2px;\n' + '  height: 2px;\n' + '}');
    });
  });

  describe('deep nested extend', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = {
        '&:hover': { width: '5px', height: '5px' },
        border: { width: '3px' }
      };
      var b = {
        extend: a,
        '&:hover': { width: '4px' },
        border: { color: 'blue' }
      };
      var c = {
        extend: b,
        '&:hover': { height: '2px' }
      };
      var d = {
        extend: c,
        '&:hover': { width: '2px' }
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: d,
          width: '2px',
          border: {
            width: '1px',
            color: 'red',
            style: 'solid'
          },
          '&:hover': {
            color: 'red'
          }
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  border: 1px solid red;\n' + '  width: 2px;\n' + '}\n' + '.a-id:hover {\n' + '  width: 2px;\n' + '  height: 2px;\n' + '  color: red;\n' + '}');
    });
  });

  describe('multi child extend with css state', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        base: {
          '&:hover': { width: '1px' }
        },
        child1: {
          extend: 'base',
          '&:hover': { width: '5px' }
        },
        child2: {
          extend: 'base'
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('base')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.getRule('child1')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.getRule('child2')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.base-id:hover {\n' + '  width: 1px;\n' + '}\n' + '.child1-id:hover {\n' + '  width: 5px;\n' + '}\n' + '.child2-id:hover {\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('extend using rule name', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: { float: 'left' },
        b: {
          extend: 'a',
          width: '1px'
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('extend using rule name with cyclic warning', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          extend: 'a',
          width: '1px'
        }
      });
    });

    it('error if extend using same rule name', function () {
      (0, _expect2['default'])(warning).to.be('[JSS] A rule tries to extend itself \r\n%s');
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('extend inside of a function rule', function () {
    var sheet = void 0;

    beforeEach(function () {
      var styles = {
        a: function a(data) {
          return {
            height: '200px',
            extend: data.redContainer
          };
        }
      };

      sheet = jss.createStyleSheet(styles, { link: true }).attach();

      sheet.update({
        redContainer: {
          background: 'red'
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  height: 200px;\n' + '  background: red;\n' + '}');
    });
  });

  describe('extend function', function () {
    var sheet = void 0;

    beforeEach(function () {
      var b = { display: 'block' };
      sheet = jss.createStyleSheet({
        a: {
          extend: function extend(data) {
            return data.block && b;
          },
          color: 'red',
          '& span': {
            extend: function extend(data) {
              return data.block && b;
            },
            color: 'blue'
          }
        }
      });
    });

    it('should have correct output', function () {
      (0, _expect2['default'])(sheet.getRule('a')).to.not.be(undefined);
      sheet.update({ block: true });
      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  color: red;\n' + '  display: block;\n' + '}\n' + '.a-id span {\n' + '  color: blue;\n' + '  display: block;\n' + '}');

      sheet.update({ block: false });

      (0, _expect2['default'])(sheet.toString()).to.be('.a-id {\n' + '  color: red;\n' + '}\n' + '.a-id span {\n' + '  color: blue;\n' + '}');
    });
  });
});