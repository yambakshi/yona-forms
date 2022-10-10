import { Form } from '../../models/form';


export async function insertForm(form: Form) {
    return {
        success: true,
        message: 'Successfully added form',
        data: null
    };
}