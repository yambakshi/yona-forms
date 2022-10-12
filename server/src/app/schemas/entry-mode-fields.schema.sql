CREATE TABLE IF NOT EXISTS entry_mode_forms(
    id serial PRIMARY KEY,
    fields JSONB NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    entry_mode_forms (q_a)
VALUES
    (
        '[
            { "questions": "what", "answer": "yes" },
            { "questions": "what", "answer": "no" }
        ]'
    );