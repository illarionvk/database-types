// @flow

import {
  sql
} from 'mightyql';
import type {
  DatabaseConnectionType,
  UnnormalizedColumnType
} from '../types';

export default async (connection: DatabaseConnectionType): Promise<$ReadOnlyArray<UnnormalizedColumnType>> => {
  return connection.any(sql`
    SELECT
      table_name "tableName",
      column_name "columnName",
      is_nullable "isNullable",
      data_type "dataType",
      udt_name "udtName"
    FROM information_schema.columns
    WHERE table_schema = 'public'
  `);
};
