import { Request, Response } from 'express';
import { queryMultipleForms } from '../../services';
import { logger } from '../../../config';


export async function getForms(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'getForms' request", label: 'getForms' });
        const ids = req.params.id ? [req.params.id] : [];
        const output = await queryMultipleForms(ids);
        res.send(output);
    } catch (error: any) {
        logger.error({ message: error.message, label: 'getForms' });
        res.status(500).send({ success: false, message: error.message });
    }
}