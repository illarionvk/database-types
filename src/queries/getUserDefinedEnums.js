// @flow

import {
  sql
} from 'mightyql';

import type {
  DatabaseConnectionType,
  EnumType
} from '../types';

export default async (connection: DatabaseConnectionType): Promise<$ReadOnlyArray<EnumType>> => {
  return connection.any(sql`
WITH udt AS (
  SELECT n.nspname                         AS schema,
         format_type(t.oid, NULL)          AS name,
         t.typname                         AS internal_name,
         nullif(array_to_string(
                    ARRAY(SELECT to_json(e.enumlabel)
                          FROM pg_catalog.pg_enum e
                          WHERE e.enumtypid = t.oid
                          ORDER BY e.oid), E' | '
                  ), '')                   AS values,
         obj_description(t.oid, 'pg_type') AS description
  FROM pg_catalog.pg_type t
         LEFT JOIN pg_catalog.pg_namespace n
                   ON n.oid = t.typnamespace
  WHERE (t.typrelid = 0
    OR (SELECT c.relkind = 'c'
        FROM pg_catalog.pg_class c
        WHERE c.oid = t.typrelid
         )
    )
    AND NOT EXISTS
    (SELECT 1
     FROM pg_catalog.pg_type el
     WHERE el.oid = t.typelem
       AND el.typarray = t.oid
    )
    AND n.nspname <> 'pg_catalog'
    AND n.nspname <> 'information_schema'
    AND pg_catalog.pg_type_is_visible(t.oid)
  ORDER BY 1, 2
)
SELECT name, values, description
FROM udt
WHERE values IS NOT NULL;
  `);
};
