// @flow

import test from 'ava';
import mapFlowType from '../../src/utilities/mapFlowType';

const knownTypes = {
  bigint: 'number',
  boolean: 'boolean',
  character: 'string',
  coordinates: 'string',
  integer: 'number',
  json: '{||}',
  jsonb: '{||}',
  numeric: 'number',
  text: 'string',
  timestamp: 'string'
};

test('correctly maps known types', (t) => {
  const databaseTypeNames = Object.keys(knownTypes);

  for (const databaseTypeName of databaseTypeNames) {
    const flowType = knownTypes[databaseTypeName];

    if (typeof flowType !== 'string') {
      throw new TypeError();
    }

    t.true(mapFlowType(databaseTypeName) === flowType, flowType);
  }
});
