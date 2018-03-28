// @flow

import type {
  ColumnType,
  UnnormalizedColumnType
} from '../types';

export default (unnormalizedColumns: $ReadOnlyArray<UnnormalizedColumnType>): $ReadOnlyArray<ColumnType> => {
  const normalizedColumns = unnormalizedColumns.map((column) => {
    const valueIsNullable = column.isNullable === 'YES';

    const databaseType = column.dataType === 'USER-DEFINED' ? 'udt_' + column.udtName : column.dataType

    return {
      databaseType,
      columnName: column.columnName,
      nullable: valueIsNullable,
      tableName: column.tableName
    };
  });

  return normalizedColumns;
};
