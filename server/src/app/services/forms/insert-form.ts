import { postgresql } from '../../dal';
import { EntryModeForm } from '../../models/entry-mode-form';


export async function insertForm(form: EntryModeForm) {
    const query = `
        INSERT INTO entry_mode_forms (fields) VALUES ('${JSON.stringify(form.fields)}')
        RETURNING id,fields,created_on;`;
    const { rows } = await postgresql.query(query);

    return rows[0];
}