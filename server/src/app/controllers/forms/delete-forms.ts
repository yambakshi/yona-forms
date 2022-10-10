import { Request, Response } from 'express';
import { deleteMultipleForms } from '../../services';
import { logger } from '../../../config';


export async function deleteForms(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'deleteForms' request", label: 'deleteForms' });
        const output = await deleteMultipleForms(req.body.ids);
        res.send(output);
    } catch (error: any) {
        logger.error({ message: error.message, label: 'deleteForms' });
        res.status(500).send({ success: false, message: error.message });
    }
}