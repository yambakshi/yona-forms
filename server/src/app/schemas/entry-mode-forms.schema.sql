CREATE TABLE IF NOT EXISTS entry_mode_forms(
    id serial PRIMARY KEY,
    title VARCHAR (50) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);