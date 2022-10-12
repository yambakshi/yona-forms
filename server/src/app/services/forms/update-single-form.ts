import { EntryModeForm } from '../../models/form';


export async function updateSingleForm(form: EntryModeForm) {
    return {
        success: true,
        message: 'Successfully edited form',
        data: null
    };
}