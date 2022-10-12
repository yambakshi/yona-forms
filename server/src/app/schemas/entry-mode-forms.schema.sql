CREATE TABLE IF NOT EXISTS entry_mode_forms(
    id serial PRIMARY KEY,
    fields JSONB NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    entry_mode_forms (fields)
VALUES
    (
        '[
            { "questions": "what", "answer": "yes" },
            { "questions": "what", "answer": "no" }
        ]'
    ) RETURNING id;

DELETE FROM
    entry_mode_forms
WHERE
    field_id = 1;

INSERT INTO
    entry_mode_forms (fields)
VALUES
    (
        '[
            { "questions": "what", "answer": "yes" },
            { "questions": "what", "answer": "no" }
        ]'
    )
SELECT
    x as id,
    foo.a,
    bar.b,
    bar.c
FROM
    foo,
    bar RETURNING id,
    fields,
    created_on;