import { postgresql } from '../../dal';
import { EntryModeForm } from '../../models/form';


export async function insertForm(form: EntryModeForm) {
    const query = `INSERT INTO entry_mode_forms (fields) VALUES ('${JSON.stringify(form.fields)}');`;
    const res = await postgresql.query(query);

    return {
        success: true,
        message: 'Successfully added form',
        data: res
    };
}