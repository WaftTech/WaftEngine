'use strict';

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

describe('exports', function () {
  it('should export injectSheet', function () {
    (0, _expect2['default'])(_index2['default']).to.be.a(Function);
  });

  it('should export jss', function () {
    (0, _expect2['default'])(_index.jss).to.be.an(_index.jss.constructor);
  });

  it('should export createGenerateClassName', function () {
    (0, _expect2['default'])(_index.createGenerateClassName).to.be.a(Function);
  });

  it('should export ThemeProvider', function () {
    (0, _expect2['default'])(_index.ThemeProvider).to.be.a(Function);
  });

  it('should export JssProvider', function () {
    (0, _expect2['default'])(_index.JssProvider).to.be.a(Function);
  });

  it('should export SheetsRegistry', function () {
    (0, _expect2['default'])(_index.SheetsRegistry).to.be.a(Function);
  });

  it('should export withTheme', function () {
    (0, _expect2['default'])(_index.withTheme).to.be.a(Function);
  });

  it('should export createTheming', function () {
    (0, _expect2['default'])(_index.createTheming).to.be.a(Function);
  });
});