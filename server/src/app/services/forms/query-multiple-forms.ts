import { postgresql } from "../../dal";

export async function queryMultipleForms() {
    const query = 'SELECT * FROM entry_mode_forms;';
    const { rows } = await postgresql.query(query);

    return rows;
}