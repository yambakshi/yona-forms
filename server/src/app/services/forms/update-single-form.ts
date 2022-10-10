import { Form } from '../../models/form';


export async function updateSingleForm(form: Form) {
    return {
        success: true,
        message: 'Successfully edited form',
        data: null
    };
}