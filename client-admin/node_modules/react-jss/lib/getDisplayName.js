'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (Component) {
  return Component.displayName || Component.name || 'Component';
};