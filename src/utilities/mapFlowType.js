// @flow

import {
  createDebug
} from '../factories';

const debug = createDebug('mapFlowType');

export default (databaseTypeName: string): string => {
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

  return 'any';
};
