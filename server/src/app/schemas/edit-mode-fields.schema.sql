CREATE TABLE IF NOT EXISTS edit_mode_fields(
    field_id serial PRIMARY KEY,
    label VARCHAR (50) UNIQUE NOT NULL,
    field_type VARCHAR (50) NOT NULL,
    options VARCHAR (50) [],
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    edit_mode_fields (label, field_type, options)
VALUES
    ('asdf', 'qwer', ARRAY ['1','2', '3']);


DELETE FROM
    edit_mode_fields
WHERE
    field_id = 1;