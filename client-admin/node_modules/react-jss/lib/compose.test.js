'use strict';

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

describe('compose', function () {
  it('should compose two class objects', function () {
    var staticClasses = {
      a: 'a',
      b: 'b'
    };
    var dynamicClasses = {
      b: 'b2',
      c: 'c'
    };
    var composed = (0, _compose2['default'])(staticClasses, dynamicClasses);
    (0, _expect2['default'])(composed).to.eql({
      a: 'a',
      b: 'b b2',
      c: 'c'
    });
  });
});