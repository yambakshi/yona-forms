# Build
```
npm run build
```

Login to default user 'postgres'
psql -U postgres

Login to 'yona-forms' DB as user yona-forms-admin
psql -U yona-forms-admin yona-forms

Show tables
\dt

CREATE TABLE IF NOT EXISTS form_schemas();

DROP TABLE form_schemas;

describe table:
\d edit_mode;