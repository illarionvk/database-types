'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _factories = require('../factories');

const debug = (0, _factories.createDebug)('mapFlowType');

exports.default = databaseTypeName => {
  if (databaseTypeName === 'json') {
    return 'Object';
  }

  if (databaseTypeName === 'udt_citext') {
    return 'string';
  }

  if (/^(?:text|character|timestamp|coordinates|uuid)(\s|$)/.test(databaseTypeName)) {
    return 'string';
  }

  if (databaseTypeName === 'boolean') {
    return 'boolean';
  }

  if (databaseTypeName === 'bigint' || databaseTypeName === 'integer') {
    return 'number';
  }

  debug('unknown type', databaseTypeName);

  return 'any';
};
//# sourceMappingURL=mapFlowType.js.map