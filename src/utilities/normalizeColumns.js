// @flow

import type {
  ColumnType,
  EnumType,
  UnnormalizedColumnType
} from '../types';

export default (
  unnormalizedColumns: $ReadOnlyArray<UnnormalizedColumnType>,
  userDefinedEnums: $ReadOnlyArray<EnumType>
): $ReadOnlyArray<ColumnType> => {
  const normalizedColumns = unnormalizedColumns.map((column) => {
    const valueIsNullable = column.isNullable === 'YES';

    const Enum = userDefinedEnums.find((item) => {
      return column.dataType === 'USER-DEFINED' && column.udtName === item.name;
    });

    const databaseType = column.dataType === 'USER-DEFINED' ? 'udt_' + column.udtName : column.dataType;

    return {
      columnName: column.columnName,
      databaseType: databaseType,
      description: Enum ? Enum.description || null : null,
      nullable: valueIsNullable,
      tableName: column.tableName,
      values: Enum ? Enum.values || null : null
    };
  });

  return normalizedColumns;
};
