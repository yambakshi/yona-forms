import { postgresql } from "../../dal";

export async function queryAllForms() {
    const query = `
        SELECT * FROM entry_mode_forms form
        INNER JOIN entry_mode_fields field ON form.id = field.fk_form`;
    const { rows } = await postgresql.query(query);

    const forms = rows.reduce((forms, { fk_form, question, answer, created_on }) => {
        if (!forms[fk_form]) {
            forms[fk_form] = { id: fk_form, fields: [], created_on };
        }

        forms[fk_form].fields.push({ question, answer });
        return forms;
    }, {});

    return Object.values(forms);
}