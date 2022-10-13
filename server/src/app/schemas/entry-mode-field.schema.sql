-- CERATE TABLE
CREATE TABLE IF NOT EXISTS entry_mode_fields(
    id serial PRIMARY KEY,
    question VARCHAR (80) NOT NULL,
    answer VARCHAR (50) NOT NULL,
    fk_form INT NOT NULL,
    FOREIGN KEY(fk_form) REFERENCES entry_mode_forms(id),
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE
DROP TABLE entry_mode_fields;

-- INSERT
WITH new_form AS (
    INSERT INTO
        entry_mode_forms (title)
    VALUES
        ('my form 2') RETURNING id,
        title,
        created_on
)
INSERT INTO
    entry_mode_fields (question, answer, fk_form)
VALUES
    (
        'q1',
        'a1',
        (
            SELECT
                id
            FROM
                new_form
        )
    ),
    (
        'q2',
        'a2',
        (
            SELECT
                id
            FROM
                new_form
        )
    ) RETURNING (
        SELECT
            title
        FROM
            new_form
    ),
    fk_form,
    question,
    answer,
    created_on;

-- SELECT
SELECT
    *
FROM
    entry_mode_forms form
    INNER JOIN entry_mode_fields field ON form.id = field.fk_form
WHERE
    form.id = 1;