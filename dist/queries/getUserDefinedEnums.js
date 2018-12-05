'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mightyql = require('mightyql');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (connection) {
    return connection.any(_mightyql.sql`
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
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=getUserDefinedEnums.js.map