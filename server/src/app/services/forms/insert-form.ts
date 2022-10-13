import { postgresql } from '../../dal';
import { EntryModeForm } from '../../models/entry-mode-form';


export async function insertForm(form: EntryModeForm) {
    const values = form.fields.reduce((acc, field, i) => {
        acc += `('${field.question}', '${field.answer}', (SELECT id FROM new_form))`;
        if (i < form.fields.length - 1) {
            acc += ',';
        }

        return acc;
    }, '');

    const query = `
        WITH new_form AS (
            INSERT INTO
                entry_mode_forms (title)
            VALUES
                ('form title') RETURNING id, title
        )
        INSERT INTO
            entry_mode_fields (question, answer, fk_form)
        VALUES ${values}
        RETURNING (
            SELECT
                title
            FROM
                new_form
        ), fk_form, question, answer, created_on;`;

    const { rows } = await postgresql.query(query);
    const { fk_form, title, created_on } = rows[0];
    const fields = rows.map(({ question, answer }) => ({ question, answer }));
    const newForm: EntryModeForm = { id: fk_form, title, fields, created_on };

    return newForm;
}