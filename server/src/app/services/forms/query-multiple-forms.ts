import { postgresql } from "../../dal";

export async function queryMultipleForms(ids: string[]) {
    let query = 'SELECT * FROM entry_mode_forms';
    if (ids.length > 0) {
        query += ` WHERE 'id' IN (${ids.join(',')});`;
    }

    const { rows } = await postgresql.query(query);

    return rows;
}