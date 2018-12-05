// @flow

export type {
  DatabaseConnectionType
} from 'mightyql';

export type UnnormalizedColumnType = {|
  +columnName: string,
  +dataType: string,
  +isNullable: 'YES' | 'NO',
  +tableName: string,
  +udtName: string
|};

export type ColumnType = {|
  +columnName: string,
  +databaseType: string,
  +nullable: boolean,
  +tableName: string,
  +values: string | null,
  +description: string | null
|};

export type TypePropertyType = {|
  +name: string,
  +type: string,
  +typeName: string
|};

export type EnumType = {|
  name: string,
  values: string,
  description: string | null
|}
