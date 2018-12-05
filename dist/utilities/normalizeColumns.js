'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (unnormalizedColumns, userDefinedEnums) => {
  const normalizedColumns = unnormalizedColumns.map(column => {
    const valueIsNullable = column.isNullable === 'YES';

    const Enum = userDefinedEnums.find(item => {
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
//# sourceMappingURL=normalizeColumns.js.map