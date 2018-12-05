'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _factories = require('../factories');

const debug = (0, _factories.createDebug)('mapFlowType');

exports.default = (databaseTypeName, values) => {

  if (values != null) {
    return values.toString();
  }

  if (databaseTypeName === 'json' || databaseTypeName === 'jsonb') {
    return '{||}';
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

  if (databaseTypeName === 'numeric') {
    return 'number';
  }

  debug('unknown type', databaseTypeName);

  return '*';
};
//# sourceMappingURL=mapFlowType.js.map