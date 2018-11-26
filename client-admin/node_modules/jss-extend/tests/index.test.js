'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable no-underscore-dangle */

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
};

describe('jss-extend', function () {
  var jss = void 0;
  var warning = void 0;

  beforeEach(function () {
    _get__('extend').__Rewire__('warning', function (condition, message) {
      warning = message;
    });
    jss = _get__('create')(_get__('settings')).use(_get__('extend')(), _get__('nested')(), _get__('expand')());
  });

  afterEach(function () {
    _get__('extend').__ResetDependency__('warning');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.getRule('b')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  float: right;\n' + '  color: red;\n' + '}');
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
      _get__('expect')(sheet.getRule('c')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.c-id {\n' + '  float: left;\n' + '  position: absolute;\n' + '  width: 1px;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '  display: none;\n' + '  width: 1px;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  width: 1px;\n' + '}\n' + '.a-id:hover {\n' + '  float: left;\n' + '  width: 2px;\n' + '  height: 2px;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  border: 1px solid red;\n' + '  width: 2px;\n' + '}\n' + '.a-id:hover {\n' + '  width: 2px;\n' + '  height: 2px;\n' + '  color: red;\n' + '}');
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
      _get__('expect')(sheet.getRule('base')).to.not.be(undefined);
      _get__('expect')(sheet.getRule('child1')).to.not.be(undefined);
      _get__('expect')(sheet.getRule('child2')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.base-id:hover {\n' + '  width: 1px;\n' + '}\n' + '.child1-id:hover {\n' + '  width: 5px;\n' + '}\n' + '.child2-id:hover {\n' + '  width: 1px;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.getRule('b')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
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
      _get__('expect')(warning).to.be('[JSS] A rule tries to extend itself \r\n%s');
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  width: 1px;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  height: 200px;\n' + '  background: red;\n' + '}');
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
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      sheet.update({ block: true });
      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  color: red;\n' + '  display: block;\n' + '}\n' + '.a-id span {\n' + '  color: blue;\n' + '  display: block;\n' + '}');

      sheet.update({ block: false });

      _get__('expect')(sheet.toString()).to.be('.a-id {\n' + '  color: red;\n' + '}\n' + '.a-id span {\n' + '  color: blue;\n' + '}');
    });
  });
});

function _getGlobalObject() {
  try {
    if (!!global) {
      return global;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case 'extend':
      return _index2['default'];

    case 'create':
      return _jss.create;

    case 'settings':
      return settings;

    case 'nested':
      return _jssNested2['default'];

    case 'expand':
      return _jssExpand2['default'];

    case 'expect':
      return _expect2['default'];
  }

  return undefined;
}

function _assign__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }

  ;
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset)['catch'](reset);
    } else {
      reset();
    }

    return result;
  };
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
exports['default'] = _RewireAPI__;