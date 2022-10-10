import { Request, Response } from 'express';
import { updateSingleForm } from '../../services';
import { logger } from '../../../config';


export async function updateForm(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'updateForm' request", label: 'updateForm' });
        const output = await updateSingleForm(req.body);
        res.send(output);
    } catch (error: any) {
        logger.error({ message: error.message, label: 'updateForm' });
        res.status(500).send({ success: false, message: error.message });
    }
}