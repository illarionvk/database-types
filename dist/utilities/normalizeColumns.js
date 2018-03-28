'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = unnormalizedColumns => {
  const normalizedColumns = unnormalizedColumns.map(column => {
    const valueIsNullable = column.isNullable === 'YES';

    const databaseType = column.dataType === 'USER-DEFINED' ? 'udt_' + column.udtName : column.dataType;

    return {
      databaseType,
      columnName: column.columnName,
      nullable: valueIsNullable,
      tableName: column.tableName
    };
  });

  return normalizedColumns;
};
//# sourceMappingURL=normalizeColumns.js.map