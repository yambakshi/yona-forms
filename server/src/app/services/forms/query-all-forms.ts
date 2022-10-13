import { postgresql } from "../../dal";

export async function queryAllForms() {
    const query = `
        SELECT * FROM entry_mode_forms form
        INNER JOIN entry_mode_fields field ON form.id = field.fk_form`;
    const { rows } = await postgresql.query(query);

    const forms = rows.reduce((acc, { fk_form, question, answer, created_on }) => {
        if (!acc[fk_form]) {
            acc[fk_form] = { id: fk_form, created_on };
            acc[fk_form].fields = [];
        }

        acc[fk_form].fields.push({ question, answer });
        return acc;
    }, {});

    return Object.values(forms);
}